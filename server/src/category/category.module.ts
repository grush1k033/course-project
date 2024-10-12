import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CommonService } from '../services/common.service';
import { DatabaseService } from '../services/database.service';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    { provide: CommonService, useValue: new CommonService('category') },
    DatabaseService,
  ],
})
export class CategoryModule {}
