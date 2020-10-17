import { Controller, Get, Body, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ResponseDTO } from './responses.dto';
import { ResponsesService } from './responses.service';


@Controller('responses')
export class ResponsesController {
    constructor(private resService: ResponsesService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createResponse(@Body() data: ResponseDTO): Promise<{ studyProgress: number, accepted: boolean }> {
        return this.resService.create(data);
    }
}
