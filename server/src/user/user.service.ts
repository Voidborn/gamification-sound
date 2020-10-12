import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

import { UserEntity } from './user.entity';
import { imageExport } from '../interfaces';

import imgJson from '../jsonFiles/images.json';
import progressStates from '../jsonFiles/progressStates.json'
import { promises } from 'fs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async showAll() {
        return await this.userRepository.find();
    }

    async create(data: { prolificId: string }) {
        console.log(data);
        //set the amount of test groups
        var test_groups = 4;
        var testgroup = Math.floor(Math.random() * Math.floor(test_groups));

        //create image order array
        var myArray: number[] = [];

        for (var i = 0; i < imgJson.images.length; i++) {
            myArray.push(i);
        }

        for (var i = myArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = myArray[i];
            myArray[i] = myArray[j];
            myArray[j] = temp;
        }

        var imageOrder = JSON.stringify({ 'array': myArray })

        //set new user Data
        var userData: UserDTO = {
            prolificId: data.prolificId,
            testgroup: testgroup,
            studyProgress: progressStates.registered,
            imageOrder: imageOrder,
            currentImage: 0
        }
        const user = await this.userRepository.create(userData);
        await this.userRepository.save(user);
        return user;
    }

    async read(userId: string) {
        return await this.userRepository.findOne({ where: { userId } });
    }

    async update(userId: string, data: Partial<UserDTO>) {
        await this.userRepository.update({ userId }, data);
        return await this.userRepository.findOne({ userId })
    }

    async destroy(userId: string) {
        await this.userRepository.delete({ userId });
        return { deleted: true };
    }

    async getNextImage(userId: string): Promise<imageExport> {
        try {
            let user = await this.userRepository.findOne({ where: { userId } });
            let img = {
                name: "",
                points: []
            }
            if (user.studyProgress == progressStates.imageRating) {
                var imageArray = JSON.parse(user.imageOrder);
                var imageIndex = imageArray.array[user.currentImage];
                img = {
                    name: imgJson.images[imageIndex].name,
                    points: imgJson.images[imageIndex].points
                }
            }
            return img
        } catch (err) { console.log(err) }
    }
}
