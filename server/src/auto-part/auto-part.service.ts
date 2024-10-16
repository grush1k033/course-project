import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Injectable()
export class AutoPartService {
    constructor(
        private databaseService: DatabaseService,
        private commonService: CommonService
    ) {}

    async getAll(categoryId?: string, carsId?: string) {
        if(categoryId && carsId) {
            return (await this.databaseService.pool.query(`SELECT * FROM autoparts WHERE category_id = ${categoryId} AND cars_id = ${carsId}`))[0];
        } else if(categoryId) {
            return (await this.databaseService.pool.query(`SELECT * FROM autoparts WHERE category_id = ${categoryId}`))[0];
        } else if(carsId) {
            return (await this.databaseService.pool.query(`SELECT * FROM autoparts WHERE cars_id = ${carsId}`))[0];
        } else {
            return (await this.databaseService.pool.query(this.commonService.getAll()))[0];
        }
    }
}
