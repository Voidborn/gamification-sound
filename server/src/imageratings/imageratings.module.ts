import { Module } from '@nestjs/common';
import { ImageratingsController } from './imageratings.controller';
import { ImageratingsService } from './imageratings.service';

@Module({
  controllers: [ImageratingsController],
  providers: [ImageratingsService]
})
export class ImageratingsModule {}
