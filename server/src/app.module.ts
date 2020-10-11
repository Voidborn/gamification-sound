import { Module } from '@nestjs/common';
import { RegistrationController, DataController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { ResponsesModule } from './responses/responses.module';
import { ImageratingsModule } from './imageratings/imageratings.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ResponsesModule,
    ImageratingsModule],
  controllers: [RegistrationController, DataController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
