import { Module } from '@nestjs/common';
import { RegistrationController, DataController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';



@Module({
  imports: [
    TypeOrmModule.forRoot()],
  controllers: [RegistrationController, DataController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
