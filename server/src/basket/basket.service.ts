import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import {IBasket, IBasketDto} from "../Interfaces/interfaces";
import { AutoPartService } from 'src/auto-part/auto-part.service';


@Injectable()
export class BasketService {
    constructor(
        private databaseService: DatabaseService,
        private commonService: CommonService,
        private autoPartService: AutoPartService
    ) {}

    async addAutoPartsInBasket(dto: IBasketDto) {
        await this.databaseService.pool.query(this.commonService.create<IBasketDto>(dto));
        return dto;
    }

    async getBasket(id:string) {
        const res = await this.databaseService.pool.query(`SELECT * FROM baskets WHERE UserID = ${id}`);
        return res[0];
    }

    async getBasketItems(id: string) {
        const res = await this.databaseService.pool.query(`SELECT b.id AS basket_id, 
       b.countAutoparts, 
       b.AutopartId, 
       b.UserId, 
       a.id,
       a.name, 
       a.description, 
       a.price, 
       a.image,
       a.discount,
       a.amount,
       a.favourites
        FROM baskets b 
        JOIN autoparts a ON b.AutopartId = a.id 
        WHERE b.UserId = ${id}`);
        return res[0];
    }

    async deleteBasket(id: string) {
        return this.databaseService.pool.query(this.commonService.delete(id));
    }

    async updateAmount(dto:{countAutoparts: number}, id:number, UserId: number) {
        const res = await this.databaseService.pool.query(`UPDATE baskets SET countAutoparts = ${dto.countAutoparts} WHERE id = ${id} and UserId = ${UserId}`);
        return res;
    }
}