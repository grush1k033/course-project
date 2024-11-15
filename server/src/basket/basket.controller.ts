import {Body, Controller, Get, Param, Post} from '@nestjs/common';
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
}


