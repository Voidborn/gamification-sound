import { Controller } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';

@Controller('questionnaires')
export class QuestionnairesController {
    constructor(private QuestionnairesService: QuestionnairesService) { }

}