import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { IShop, IShopDto } from './shop.interface';
import { QueryResult } from 'mysql2';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  async getAllShops() {
    return await this.shopService.getAllShops();
  }

  @Get(':id')
  async getShopById(@Param('id') id: string) {
    return await this.shopService.getShopByID(id);
  }

  @Post()
  async createShop(@Body() dto: IShopDto) {
    return await this.shopService.createShop(dto);
  }

  @Put(':id')
  async updateShop(@Body() dto: IShopDto, @Param('id') id: string) {
    return await this.shopService.updateShop(dto, id);
  }

  @Delete(':id')
  async deleteShop(@Param('id') id: string) {
    return await this.shopService.deleteShop(id);
  }
}
