import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { OrderAutopartDto, OrderDto } from 'src/Interfaces/interfaces';
import { OrderService } from './order.service';
import { Public } from 'src/auth/public.decorator';
import { Response } from 'express';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @Post()
    createOrder(@Body() dto: OrderDto) {
        return this.orderService.createOrder(dto);
    }

    @Get('all-orders')
    getOrderALl() {
        return this.orderService.getOrdersAll();
    }


    @Post('autoparts')
    async createOrderAutoparts(@Body() dto: OrderAutopartDto) {
        return await this.orderService.createOrderAutoparts(dto);
    }

    @Public()
    @Get('confirm/:id')
    async updateOrderStatus(@Param('id') id: string, @Res() resp: Response) {
        await this.orderService.updateOrderStatus(id)
        return resp.redirect('http://localhost:4200/order'); 
    }

    @Public()
    @Get('exportInCsv/:id')
    exportInCsv(@Param('id') id: string) {
        return this.orderService.exportInCsv(id);
    }

    @Get('autoparts/:id')
    async getOrdersAutoparts(@Param('id') id: string) {
        return this.orderService.getOrdersAutoparts(id);
    }

    @Get(':id')
     getOrdersById(@Param('id') id: string) {
        return this.orderService.getOrders(id);
    }

    @Delete(':id')
    deleteOrder(@Param('id') id: string) {
       return this.orderService.deleteOrder(id);
   }

   
}

