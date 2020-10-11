import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('register')
export class RegistrationController {
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

@Controller('nextImage')
export class DataController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getNextImage() {
    const data = this.appService.getNextImage();
    return { data }
  }
}