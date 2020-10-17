import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

import { UserEntity } from './user.entity';
import { imageExport, userExport } from '../interfaces';

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

    async register(data: { prolificId: string }) {
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
        return user.toResponseObject();
    }

    async login(data) {

    }

    async read(userId: string) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async update(userId: string, data: Partial<UserDTO>) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        await this.userRepository.update({ userId }, data);
        return await this.userRepository.findOne({ userId })
    }

    async destroy(userId: string) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        await this.userRepository.delete({ userId });
        return { deleted: true };
    }

    //returns name and points for new user picture
    async getNextImage(userId: string): Promise<imageExport> {
        let user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if (user.studyProgress != progressStates.imageRating) {
            throw new HttpException('User progress is not at image rating', HttpStatus.BAD_REQUEST)
        }
        var imageArray = JSON.parse(user.imageOrder);
        var imageIndex = imageArray.array[user.currentImage];
        return {
            name: imgJson.images[imageIndex].name,
            points: imgJson.images[imageIndex].points
        }

    }

    //only called on response submission!
    async progressStudy(userId: string): Promise<UserDTO> {
        let user = await this.read(userId);

        //if user is currently not in the image rating process
        let condition1 = user.studyProgress !== progressStates.imageRating;

        // and not rating his last image
        let total_images_for_user = JSON.parse(user.imageOrder).array.length - 1;
        let condition2 = user.currentImage >= total_images_for_user;

        if (condition1 || condition2) {
            let newProgress = user.studyProgress + 1;
            await this.userRepository.update(userId, { studyProgress: newProgress });

            return {
                ...user,
                studyProgress: newProgress
            }
        } else {
            // set next image for user to rate!
            let newImage = user.currentImage + 1;
            await this.userRepository.update(userId, { currentImage: newImage });

            return {
                ...user
            }
        }
    }
}
