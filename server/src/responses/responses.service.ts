import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ResponseDTO } from './responses.dto';
import { ResponseEntity } from './responses.entity';

@Injectable()
export class ResponsesService {
    constructor(
        @InjectRepository(ResponseEntity)
        private responseRepository: Repository<ResponseEntity>,

        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) { }

    async create(data: ResponseDTO) {
        //TODO: validate data
        let user = await this.userService.read(data.userId);
        let progress = user.studyProgress;
        let accepted = false;
        if (progress === data.studyProgress) {
            //inserts new data into database
            const response = await this.responseRepository.create(data);
            await this.responseRepository.save(response);

            //updates user progress
            progress = (await this.userService.progressStudy(data.userId)).studyProgress;
            accepted = true;
        }

        //returns userProgress
        return { studyProgress: progress, accepted: accepted };
    }
}
