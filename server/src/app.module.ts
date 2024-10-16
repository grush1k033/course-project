import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseService } from './services/database.service';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';
import { ModelsModule } from './models/models.module';
import { MarksModule } from './marks/marks.module';

@Module({
  imports: [ShopModule, CategoryModule, ModelsModule, MarksModule],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
