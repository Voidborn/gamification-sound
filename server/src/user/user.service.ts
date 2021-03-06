import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

import { UserEntity } from './user.entity';
import { imageExport, userExport } from '../interfaces';

import imgJson from '../jsonFiles/images.json';
import progressStates from '../jsonFiles/progressStates.json'
import soundJson from '../jsonFiles/sounds.json';
import { promises } from 'fs';
import { group } from 'console';
import { ignoreElements } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async showAll() {
        return await this.userRepository.find();
    }

    async register(prolificId: string) {
        //set the amount of test groups
        var test_groups = soundJson.sounds.length + 1;

        let groupDistribution: number[] = [];
        for (var i = 0; i < test_groups; i++) {
            groupDistribution.push(0);
        }

        //find lowest participant test group
        let allUsers = await this.userRepository.find({ where: { studyProgress: progressStates.finished } });
        for (var i = 0; i < allUsers.length; i++) {
            groupDistribution[allUsers[i].testgroup] = groupDistribution[allUsers[i].testgroup] + 1;
        }

        let lowestParticipantThreshold = Number.MAX_SAFE_INTEGER;
        for (var i = 0; i < test_groups; i++) {
            if (groupDistribution[i] < lowestParticipantThreshold) {
                lowestParticipantThreshold = groupDistribution[i];
            }
        }
        let lowestGroups: number[] = [];
        for (var i = 0; i < test_groups; i++) {
            if (groupDistribution[i] === lowestParticipantThreshold) {
                lowestGroups.push(i);
            }
        }
        let testgroup = lowestGroups[Math.floor(Math.random() * lowestGroups.length)];
        console.log("group algorithm:", groupDistribution, lowestParticipantThreshold, lowestGroups, testgroup);


        //create array with a number for each present image
        var myArray: number[] = [];
        for (var i = 0; i < imgJson.images.length; i++) {
            myArray.push(i);
        }

        //random sort array
        for (var i = myArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = myArray[i];
            myArray[i] = myArray[j];
            myArray[j] = temp;
        }

        //feed new random array into database
        var imageOrder = JSON.stringify({ 'array': myArray })

        //set new user Data
        var userData: UserDTO = {
            prolificId: prolificId,
            testgroup: testgroup,
            studyProgress: progressStates.demographics,
            imageOrder: imageOrder,
            currentImage: 0
        }
        const user = await this.userRepository.create(userData);
        await this.userRepository.save(user);
        return user.toResponseObject();
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

    async getSoundName(userId: string): Promise<{ audiofile: string }> {
        let user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if (user.testgroup === 0) {
            return { audiofile: "" }
        }
        else {
            let file = soundJson.sounds[user.testgroup - 1];
            return { audiofile: file.name }
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
