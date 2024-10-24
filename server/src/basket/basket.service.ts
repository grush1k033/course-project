import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

import {IBasket, IBasketDto} from "../Interfaces/interfaces";


@Injectable()
export class BasketService {
    constructor(
        private databaseService: DatabaseService,
        private commonService: CommonService
    ) {}

    async addAutoPartsInBasket(dto: IBasketDto) {
        await this.databaseService.pool.query(this.commonService.create<IBasketDto>(dto));
        return dto;
    }

    async getBasket(id:string) {
        const res = await this.databaseService.pool.query(`SELECT * FROM baskets WHERE UserID = ${id}`);
        return res[0];
    }
}