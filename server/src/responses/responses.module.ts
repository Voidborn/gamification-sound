import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponsesController } from './responses.controller';
import { ResponseEntity } from './responses.entity';
import { ResponsesService } from './responses.service';

import { UserModule } from '../user/user.module';
import { ImageratingsModule } from '../imageratings/imageratings.module';
import { QuestionnairesModule } from '../questionnaires/questionnaires.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ResponseEntity]),
    UserModule,
    ImageratingsModule,
    QuestionnairesModule
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule { }
