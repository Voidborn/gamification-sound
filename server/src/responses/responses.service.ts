import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDTO } from './responses.dto';
import { ResponseEntity } from './responses.entity';

import { UserService } from '../user/user.service';
import { ImageratingsService } from '../imageratings/imageratings.service';

import progressStates from '../jsonFiles/progressStates.json'


@Injectable()
export class ResponsesService {
    constructor(
        @InjectRepository(ResponseEntity)
        private responseRepository: Repository<ResponseEntity>,

        @Inject(forwardRef(() => UserService))
        private userService: UserService,

        @Inject(forwardRef(() => ImageratingsService))
        private imageRatingService: ImageratingsService,
    ) { }

    async create(userId: string, data: ResponseDTO) {
        let user = await this.userService.read(userId);
        let progress = user.studyProgress;
        let accepted = false;
        if (progress === data.studyProgress) {
            //inserts new data into database
            if (progress === progressStates.imageRating) {
                const response = await this.imageRatingService.create(
                    userId,
                    data.questionId,
                    data.answer.marked,
                    data.answer.points,
                    data.answer.pointSum);
            } else {
                let entry = {
                    userId: userId,
                    questionId: data.questionId,
                    studyProgress: data.studyProgress,
                    answer: JSON.stringify(data.answer)
                }
                const response = await this.responseRepository.create(entry);
                await this.responseRepository.save(response);
                //updates user progress

            }
            progress = (await this.userService.progressStudy(userId)).studyProgress;
            accepted = true;
        }
        //returns whether the entry was accepted
        return { accepted: accepted };
    }

    async getHistory(userId: string) {
        let history: number[] = [];
        const response = await this.imageRatingService.find(userId)
        let result = response.map(element => {
            return { "points": element.receivedPoints, "timestamp": new Date(element.responseTime).getTime() };
        })
        return result;
    }
}
