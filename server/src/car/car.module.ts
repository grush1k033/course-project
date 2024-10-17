import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Module({
  providers: [CarService, DatabaseService,{provide: CommonService, useValue: new CommonService('cars')}],
  controllers: [CarController]
})
export class CarModule {}
