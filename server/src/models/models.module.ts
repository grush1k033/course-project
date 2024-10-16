import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import {CategoryService} from "../category/category.service";
import {CommonService} from "../services/common.service";
import {DatabaseService} from "../services/database.service";

@Module({
  providers: [ModelsService,DatabaseService,{provide:CommonService, useValue:new CommonService('cars_models')}],
  controllers: [ModelsController]
})
export class ModelsModule {}
