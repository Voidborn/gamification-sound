import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesController } from './responses.controller';
import { ResponseEntity } from './responses.entity';
import { ResponsesService } from './responses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseEntity])],
  controllers: [ResponsesController],
  providers: [ResponsesService]
})
export class ResponsesModule { }
