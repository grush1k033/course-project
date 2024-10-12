import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/services/database.service';
import { IShopDto } from './shop.interface';
import { CommonService } from 'src/services/common.service';

@Injectable()
export class ShopService {
  constructor(
    private database: DatabaseService,
    private commonService: CommonService,
  ) {}

  async getAllShops() {
    return (await this.database.pool.query(this.commonService.getAll()))[0];
  }

  async getShopByID(id: string) {
    return (
      await this.database.pool.query(this.commonService.getShopByID(id))
    )[0][0];
  }

  async createShop(dto: IShopDto) {
    return await this.database.pool.query(
      this.commonService.create<IShopDto>(dto),
    );
  }

  async updateShop(dto: IShopDto, id: string) {
    return await this.database.pool.query(this.commonService.update(dto, id));
  }

  async deleteShop(id: string) {
    // const isDeleteAutopart = await this.database.pool.query(this.commonService.delete(id));

    // if(isDeleteAutopart)

    return await this.database.pool.query(this.commonService.delete(id));
  }
}
