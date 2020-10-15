import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ResponsesController } from './responses.controller';
import { ResponseEntity } from './responses.entity';
import { ResponsesService } from './responses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseEntity]), UserModule],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule { }
