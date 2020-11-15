import { Controller } from '@nestjs/common';
import { ImageratingsService } from './imageratings.service';

@Controller('imageratings')
export class ImageratingsController {
    constructor(private ImageratingsService: ImageratingsService) { }

}
