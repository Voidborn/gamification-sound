import { Controller, Get, Body, Post } from '@nestjs/common';
import { ResponseDTO } from './responses.dto';
import { ResponsesService } from './responses.service';


@Controller('responses')
export class ResponsesController {
    constructor(private resService: ResponsesService) { }

    @Post()
    createResponse(@Body() data: ResponseDTO) {
        return this.resService.create(data);
    }
}
