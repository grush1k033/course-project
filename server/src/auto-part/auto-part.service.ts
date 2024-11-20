import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import {IAddAutoPartDto} from "../Interfaces/interfaces";

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

    async getById(id: string) {
        return (await this.databaseService.pool.query(this.commonService.getByID(id)))[0][0];
    }

    async addAutoPart(body: IAddAutoPartDto) {
        console.log(`
            INSERT INTO autoparts (name, description, price, image, category_id, cars_id, amount, discount, favourites) VALUES
            (${body.name}, ${body.description}, ${body.price}, ${body.image}, ${body.category_id}, ${body.cars_id}, ${body.amount}, ${body.discount}, ${body.favourites})
        `)
        await this.databaseService.pool.query(`
            INSERT INTO autoparts (name, description, price, image, category_id, cars_id, amount, discount, favourites) VALUES
            ('${body.name}', '${body.description}', '${body.price}', '${body.image}', '${body.category_id}', '${body.cars_id}', '${body.amount}', '${body.discount}', '${body.favourites}')
        `)
        return body;
    }

    async getAutoPartById(id: string) {
        return (await this.databaseService.pool.query(this.commonService.getByID(id)));
    }

    async updateFavourite(dto: {favourite: boolean}, id: string) {
        await this.databaseService.pool.query(`UPDATE autoparts SET favourites = ${dto.favourite} WHERE id = ${id}`);
        return (await this.databaseService.pool.query(this.commonService.getByID(id)))[0][0];
    }

    async updateAutoPart(dto: IAddAutoPartDto, id: string) {
        await this.databaseService.pool.query(this.commonService.update(dto, id))
        return dto;
    }

    async deleteAutoPart(id: string) {
        return this.databaseService.pool.query(this.commonService.delete(id))
    }


}
