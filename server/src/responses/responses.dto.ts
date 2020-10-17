import { IsNumber, IsString } from 'class-validator'

export class ResponseDTO {
    @IsString()
    userId: string;
    @IsNumber()
    studyProgress: number;
    @IsString()
    questionId: string;
    @IsString()
    answer: string;
}