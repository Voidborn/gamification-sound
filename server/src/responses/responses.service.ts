import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDTO } from './responses.dto';
import { ResponseEntity } from './responses.entity';

import { UserService } from '../user/user.service';
import { ImageratingsService } from '../imageratings/imageratings.service';

import progressStates from '../jsonFiles/progressStates.json'
import { QuestionnairesService } from 'src/questionnaires/questionnaires.service';


@Injectable()
export class ResponsesService {
    constructor(
        @InjectRepository(ResponseEntity)
        private responseRepository: Repository<ResponseEntity>,

        @Inject(forwardRef(() => UserService))
        private userService: UserService,

        @Inject(forwardRef(() => ImageratingsService))
        private imageRatingService: ImageratingsService,

        @Inject(forwardRef(() => QuestionnairesService))
        private questionnairesService: QuestionnairesService,
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
                    user.testgroup,
                    data.answer.marked,
                    data.answer.points,
                    data.answer.pointSum
                );
            } else {
                let entry = {
                    userId: userId,
                    questionId: data.questionId,
                    studyProgress: data.studyProgress,
                    answer: JSON.stringify(data.answer)
                }
                const response = await this.responseRepository.create(entry);
                await this.responseRepository.save(response);

                //if progress at last stage which is the PEI,
                //create entry in the questionnaires table


                if (progress === progressStates.pei) {
                    this.makeEntryinQuestionnaires(userId);
                }
            }

            progress = (await this.userService.progressStudy(userId)).studyProgress;
            accepted = true;
        }
        //returns whether the entry was accepted
        return { accepted: accepted };
    }

    async find(userId: string) {
        const response = await this.responseRepository.find({ where: { userId: userId } })
        return response;
    }

    async getHistory(userId: string) {
        let history: number[] = [];
        const response = await this.imageRatingService.find(userId)
        let result = response.map(element => {
            return { "points": element.receivedPoints, "timestamp": new Date(element.responseTime).getTime() };
        })
        return result;
    }

    async makeEntryinQuestionnaires(userId: string) {
        const user = await this.userService.read(userId);
        const responses = await this.find(userId);

        let entry = {
            userId: user.userId,
            testgroup: user.testgroup,
            gender: "",
            age: "",
            nationality: "",

            musicEnjoyment: -1,
            musicTheory: -1,
            instrument: -1,
            musician: -1,
            genres: [""],

            turnoff: "",
            valence: -1,
            arousal: -1,

            imi: [0],
            pei: [0]
        };

        for (var i = 0; i < responses.length; i++) {
            switch (responses[i].studyProgress) {
                case progressStates.demographics:
                    var answer = JSON.parse(responses[i].answer);
                    entry.gender = answer.gender;
                    entry.age = answer.age;
                    entry.nationality = answer.nationality;
                    break;
                case progressStates.imi:
                    var answer = JSON.parse(responses[i].answer);
                    entry.imi = [
                        answer.IMI1, answer.IMI2, answer.IMI3, answer.IMI4, answer.IMI5,
                        answer.IMI6, answer.IMI7, answer.IMI8, answer.IMI9, answer.IMI10,
                        answer.IMI11, answer.IMI12, answer.IMI13, answer.IMI14, answer.IMI15,
                        answer.IMI16, answer.IMI17, answer.IMI18, answer.IMI19, answer.IMI20,
                        answer.IMI21, answer.IMI22
                    ]
                    break;
                case progressStates.pei:
                    var answer = JSON.parse(responses[i].answer);
                    entry.pei = [
                        answer.Immersion1, answer.Immersion2, answer.Immersion3,
                        answer.Challenge1, answer.Challenge2, answer.Challenge3
                    ]
                    break;
                case progressStates.sam:
                    var answer = JSON.parse(responses[i].answer);
                    entry.turnoff = answer.turnoff;
                    entry.valence = answer.Valence;
                    entry.arousal = answer.Arousal;
                    break;
                case progressStates.music:
                    var answer = JSON.parse(responses[i].answer);
                    entry.instrument = answer.instrument;
                    entry.musician = answer.musician;
                    entry.musicTheory = answer.musicTheory;
                    entry.musicEnjoyment = answer.musicEnjoyment;
                    break;
                default: break;
            }
        }

        await this.questionnairesService.create(entry);
    }
}
