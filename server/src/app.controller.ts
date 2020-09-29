import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('register')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  register() {
    const data = this.appService.registerUser();
    console.log(data)
    return { data }
  }

  @Get(':prolificId')
  registerWithProlific(@Param() param) {
    const data = this.appService.registerUser(param.prolificId);
    return { data }
  }
}