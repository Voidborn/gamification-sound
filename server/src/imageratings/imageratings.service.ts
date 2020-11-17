import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository } from 'typeorm';
import { ImageratingEntity } from './imageratings.entity';
import { ImageratingsModule } from './imageratings.module';

@Injectable()
export class ImageratingsService {
    constructor(
        @InjectRepository(ImageratingEntity)
        private imageratingRepository: Repository<ImageratingEntity>,
    ) { }

    async create(userId: string, imageId: string, testgroup: number, markedArray: boolean[], pointsArray: number[], receivedPoints: number) {

        let entry = {
            userId: userId,
            imageId: imageId,
            testgroup: testgroup,
            markedArray: JSON.stringify(markedArray),
            pointsArray: JSON.stringify(pointsArray),
            receivedPoints: receivedPoints
        }

        const response = await this.imageratingRepository.create(entry);
        await this.imageratingRepository.save(response);
    }

    async find(userId: string, imageId?: string): Promise<ImageratingEntity[]> {
        let response: ImageratingEntity[];
        if (imageId) {
            response = await this.imageratingRepository.find({ where: { userId: userId, imageId: imageId } })
        } else {
            response = await this.imageratingRepository.find({ where: { userId: userId } })
        }

        return response;
    }
}
