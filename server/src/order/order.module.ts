import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CommonService } from 'src/services/common.service';
import { DatabaseService } from 'src/services/database.service';

@Module({
  providers: [OrderService, DatabaseService, {provide: CommonService, useValue: new CommonService('orders')}],
  controllers: [OrderController],
})
export class OrderModule {}
