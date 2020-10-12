import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('img/:name')
  image(@Param('name') name, @Res() res) {
    var imgPath = "/images/" + name;
    return res.sendFile(imgPath, { root: 'public' });
  }
}