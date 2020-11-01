import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ResponseDTO } from './responses.dto';
import { ResponseEntity } from './responses.entity';

import progressStates from '../jsonFiles/progressStates.json'

@Injectable()
export class ResponsesService {
    constructor(
        @InjectRepository(ResponseEntity)
        private responseRepository: Repository<ResponseEntity>,

        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) { }

    async create(userId: string, data: ResponseDTO) {
        //TODO: validate data
        let user = await this.userService.read(userId);
        let progress = user.studyProgress;
        let accepted = false;
        let entry = {
            userId: userId,
            questionId: data.questionId,
            studyProgress: data.studyProgress,
            answer: JSON.stringify(data.answer)
        }

        if (progress === data.studyProgress) {
            //inserts new data into database
            const response = await this.responseRepository.create(entry);
            await this.responseRepository.save(response);
            //updates user progress
            progress = (await this.userService.progressStudy(userId)).studyProgress;
            accepted = true;
        }
        //returns whether the entry was accepted
        return { accepted: accepted };
    }

    async getHistory(userId: string) {
        let history: number[] = [];
        const response = await this.responseRepository.find({ where: { userId: userId, studyProgress: progressStates.imageRating } })
        let result = response.map(element => {
            return { "points": JSON.parse(element.answer).pointSum, "timestamp": new Date(element.responseTime).getTime() };
        })
        return result;
    }
}
