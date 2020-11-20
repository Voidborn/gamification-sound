import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository } from 'typeorm';

import { QuestionnairesEntity } from './questionnaires.entity';

@Injectable()
export class QuestionnairesService {
    constructor(
        @InjectRepository(QuestionnairesEntity)
        private questionnairesRepository: Repository<QuestionnairesEntity>
    ) { }

    async create(args: {
        userId: string,
        testgroup: number,
        gender: string,
        age: string,
        nationality: string,
        musicEnjoyment: number,
        musicTheory: number,
        instrument: number,
        musician: number,
        genres: string[],
        turnoff: string,
        valence: number,
        arousal: number,
        imi: number[],
        pei: number[]
    }
    ) {
        if (args.imi.length !== 22 || args.pei.length !== 6) {
            console.log(args.imi, args.pei);
            throw new HttpException('Questionnaire lenght mismatch!', HttpStatus.BAD_REQUEST)
        }

        let entry = {
            userId: args.userId,
            testgroup: args.testgroup,
            gender: args.gender,
            age: args.age,
            nationality: args.nationality,
            musicEnjoyment: args.musicEnjoyment,
            musicTheory: args.musicTheory,
            instrument: args.instrument,
            musician: args.musician,
            genres: JSON.stringify(args.genres),
            turnoff: args.turnoff,
            valence: args.valence,
            arousal: args.arousal,
            imi01: args.imi[0],
            imi02: args.imi[1],
            imi03: args.imi[2],
            imi04: args.imi[3],
            imi05: args.imi[4],
            imi06: args.imi[5],
            imi07: args.imi[6],
            imi08: args.imi[7],
            imi09: args.imi[8],
            imi10: args.imi[9],
            imi11: args.imi[10],
            imi12: args.imi[11],
            imi13: args.imi[12],
            imi14: args.imi[13],
            imi15: args.imi[14],
            imi16: args.imi[15],
            imi17: args.imi[16],
            imi18: args.imi[17],
            imi19: args.imi[18],
            imi20: args.imi[19],
            imi21: args.imi[21],
            imi22: args.imi[21],
            peiImmersion01: args.pei[0],
            peiImmersion02: args.pei[1],
            peiImmersion03: args.pei[2],
            peiChallenge01: args.pei[3],
            peiChallenge02: args.pei[4],
            peiChallenge03: args.pei[5]
        }
        const response = await this.questionnairesRepository.create(entry);
        await this.questionnairesRepository.save(response);

    }
}