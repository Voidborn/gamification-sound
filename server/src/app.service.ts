import { Injectable } from '@nestjs/common';
import { userExport } from './interfaces';
import { imageExport } from './interfaces';
import imgJson from './trafficImg/images.json';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  registerUser(param?: string): userExport {
    return {
      userId: 1,
      prolificId: (param != null) ? param : "",
      progress: 1
    }
  }

  getNextImage(): imageExport {
    console.log(imgJson.images[0]);
    //get current user progress
    //randomize remaining pictures
    //return picture

    return {
      name: imgJson.images[0].name,
      points: imgJson.images[0].points,
    }
  }
}
