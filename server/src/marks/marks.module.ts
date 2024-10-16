import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Module({
  providers: [MarksService,DatabaseService, {provide:CommonService,useValue:new CommonService('cars_marks')}],
  controllers: [MarksController]
})
export class MarksModule {}
