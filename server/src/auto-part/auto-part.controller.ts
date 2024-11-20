import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {AutoPartService} from "./auto-part.service";
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import {IAddAutoPartDto} from "../Interfaces/interfaces";

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

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.autoPartService.getById(id);
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

    @Post()
    async addAutoPart(@Body() dto: IAddAutoPartDto) {
        return await this.autoPartService.addAutoPart(dto)
    }

    @Patch(':id')
    async updateAutoParts(@Body() dto: {favourite: boolean}, @Param('id') id: string) {
         return await this.autoPartService.updateFavourite(dto, id);
    }

    @Put(':id')
    async updateAutoPartsAll(@Body() dto: IAddAutoPartDto, @Param('id') id: string) {
        return await this.autoPartService.updateAutoPart(dto, id);
    }
    get randomInteger() {
        const min = 5;
        const max = 15;
        return Math.floor(Math.random()*(max-min+1))+min;
    }

    @Delete(':id')
    async deleteAutoPart(@Param('id') id: string) {
        return await this.autoPartService.deleteAutoPart(id);
    }

}
