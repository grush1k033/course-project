import {Body, Controller, Get, Param, Patch, Query} from '@nestjs/common';
import {AutoPartService} from "./auto-part.service";
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Controller('auto-part')
export class AutoPartController {

    constructor(private autoPartService: AutoPartService, private db: DatabaseService, private cm: CommonService) {}
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

    @Patch(':id')
    async updateAutoParts(@Body() dto: {favourite: boolean}, @Param('id') id: string) {
         return await this.autoPartService.updateFavourite(dto, id);
    }
    get randomInteger() {
        const min = 5;
        const max = 15;
        return Math.floor(Math.random()*(max-min+1))+min;
    }

}
