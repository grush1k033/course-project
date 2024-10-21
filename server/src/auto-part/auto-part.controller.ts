import {Controller, Get, Query} from '@nestjs/common';
import {AutoPartService} from "./auto-part.service";
import {DatabaseService} from "../services/database.service";

@Controller('auto-part')
export class AutoPartController {

    constructor(private autoPartService: AutoPartService, private db: DatabaseService) {}
    @Get()
    async getAllAutoParts(
        @Query('categoryId') categoryId: string,
        @Query('carsId') carsId: string,
    ) {
        return await this.autoPartService.getAll(categoryId, carsId);
    }

    @Get('write')
    insert(){
        for(let i=19; i<=74; i++) {
            this.db.pool.query(`UPDATE autoparts SET discount = ${this.randomInteger} where id = ${i}`)
        }
       return {
            good: 'ok'
       }
    }



    get randomInteger() {
        const min = 5;
        const max = 15;
        return Math.floor(Math.random()*(max-min+1))+min;
    }
}
