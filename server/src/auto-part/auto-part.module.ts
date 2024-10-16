import { Module } from '@nestjs/common';
import { AutoPartService } from './auto-part.service';
import { AutoPartController } from './auto-part.controller';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Module({
  providers: [AutoPartService, DatabaseService, {provide: CommonService, useValue: new CommonService('autoparts')}],
  controllers: [AutoPartController]
})
export class AutoPartModule {}
