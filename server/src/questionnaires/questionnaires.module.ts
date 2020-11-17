import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnairesController } from './questionnaires.controller';
import { QuestionnairesEntity } from './questionnaires.entity';
import { QuestionnairesService } from './questionnaires.service';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionnairesEntity])],
    controllers: [QuestionnairesController],
    providers: [QuestionnairesService],
    exports: [QuestionnairesService]
})
export class QuestionnairesModule { }
