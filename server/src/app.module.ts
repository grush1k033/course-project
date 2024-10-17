import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseService } from './services/database.service';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';
import { ModelsModule } from './models/models.module';
import { MarksModule } from './marks/marks.module';
import { AutoPartModule } from './auto-part/auto-part.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [ShopModule, CategoryModule, ModelsModule, MarksModule, AutoPartModule, CarModule],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
