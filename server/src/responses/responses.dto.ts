import { IsNumber, IsString } from 'class-validator'

export class ResponseDTO {
    @IsNumber()
    studyProgress: number;
    @IsString()
    questionId: string;

    answer: any;
}