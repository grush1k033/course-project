import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { OrderDto } from 'src/Interfaces/interfaces';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @Post()
    createOrder(@Body() dto: OrderDto) {
        return this.orderService.createOrder(dto);
    }

    @Get(':id')
    getOrdersById(@Param('id') id: string) {
        return this.orderService.getOrders(id);
    }

    @Patch(':id')
    updateOrderStatus(@Body() dto: {isConfirmed: boolean, UserId: string}, @Param('id') id: string) {
        return this.orderService.updateOrderStatus(id, dto)
    }
}
