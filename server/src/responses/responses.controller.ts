import { Controller, Get, Body, Post, UsePipes, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ResponseDTO } from './responses.dto';
import { ResponsesService } from './responses.service';


@Controller('responses')
export class ResponsesController {
    constructor(private resService: ResponsesService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard())
    createResponse(@Body() data: ResponseDTO): Promise<{ studyProgress: number, accepted: boolean }> {
        return this.resService.create(data);
    }
}
