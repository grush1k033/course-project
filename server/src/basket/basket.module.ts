import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Module({
  providers: [BasketService, DatabaseService, {provide: CommonService, useValue: new CommonService('baskets')}],
  controllers: [BasketController]
})
export class BasketModule {}

