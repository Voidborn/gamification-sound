import { Injectable } from '@nestjs/common';
import { userExport } from './interfaces';

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
}
