import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageratingsController } from './imageratings.controller';
import { ImageratingEntity } from './imageratings.entity';
import { ImageratingsService } from './imageratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageratingEntity])],
  controllers: [ImageratingsController],
  providers: [ImageratingsService],
  exports: [ImageratingsService]
})
export class ImageratingsModule { }
