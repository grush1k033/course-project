import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { DatabaseService } from 'src/services/database.service';
import { CommonService } from 'src/services/common.service';

@Module({
  controllers: [ShopController],
  providers: [
    ShopService,
    DatabaseService,
    { provide: CommonService, useValue: new CommonService('Shop') },
  ],
})
export class ShopModule {}
