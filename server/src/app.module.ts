import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseService } from './services/database.service';
import { ShopModule } from './shop/shop.module';
import { ImageModule } from './image/image.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ShopModule, ImageModule, CategoryModule],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
