import { Body, Controller, Post } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  async uploadImage(@Body() body: { image: string }) {
    const imageBuffer = Buffer.from(body.image, 'base64'); // Предполагаем, что изображение передается в формате base64
    await this.imageService.uploadImage(imageBuffer);
  }
}
