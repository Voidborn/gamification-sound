import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDTO } from './responses.dto';
import { ResponseEntity } from './responses.entity';

@Injectable()
export class ResponsesService {
    constructor(
        @InjectRepository(ResponseEntity)
        private responseRepository: Repository<ResponseEntity>
    ) { }

    async create(data: ResponseDTO) {
        console.log(data);
        //TODO: Validate userID
        const response = await this.responseRepository.create(data);
        await this.responseRepository.save(response);
        return response;
    }
}
