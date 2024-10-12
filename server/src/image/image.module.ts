import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import {DatabaseService} from "../services/database.service";

@Module({
  controllers: [ImageController],
  providers: [ImageService, DatabaseService],
})
export class ImageModule {}
