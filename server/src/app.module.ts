import { Module } from '@nestjs/common';
import { RegistrationController, DataController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [RegistrationController, DataController],
  providers: [AppService],
})
export class AppModule { }
