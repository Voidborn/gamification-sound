import { Injectable } from '@nestjs/common';
import { userExport } from './interfaces';
import { imageExport } from './interfaces';

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
    return {
      path: "img/traffic-signs/road610.png",
      points: [0, 0, 0, 10, 0, 0, 10, 0, 0, 0, 0, 0],
      marked: [false, false, false, false, false, false, false, false, false, false, false, false]
    }
  }
}
