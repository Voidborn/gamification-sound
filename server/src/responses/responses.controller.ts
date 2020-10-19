import { Controller, Get, Body, Post, UsePipes, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ResponseDTO } from './responses.dto';
import { ResponsesService } from './responses.service';
import { User } from '../user/user.decorator';


@Controller('response')
export class ResponsesController {
    constructor(private resService: ResponsesService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard())
    createResponse(@User('userId') userId: string, @Body() data: ResponseDTO) { //returns<{ studyProgress: number, accepted: boolean }> 
        return this.resService.create(userId, data);
    }
}
