import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import {BasketService} from "./basket.service";
import {IBasketDto} from "../Interfaces/interfaces";


@Controller('basket')
export class BasketController {
    constructor(private basketService: BasketService, private db: DatabaseService, private cm: CommonService) {
    }

    @Post()
    async createShop(@Body() dto: IBasketDto) {
        return await this.basketService.addAutoPartsInBasket(dto);
    }

    @Get(':id')
    async getBasket(@Param('id') id: string) {
        return await this.basketService.getBasket(id);
    }

    @Delete(':id')
    async deleteBasket(@Param('id') id: string) {
      return await this.basketService.deleteBasket(id);
    }

    @Get('/items/:id') 
    async getBasketItems(@Param('id') id: string) {
        return await this.basketService.getBasketItems(id);
    }

    @Patch(':id')
    async updateAmount(@Param('id') id: number, @Body() dto:{countAutoparts: number}, @Query('UserId') UserId: number,) {
        return await this.basketService.updateAmount(dto, id, UserId);
    }
    
}


