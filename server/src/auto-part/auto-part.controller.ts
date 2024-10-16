import {Controller, Get, Query} from '@nestjs/common';
import {AutoPartService} from "./auto-part.service";

@Controller('auto-part')
export class AutoPartController {

    constructor(private autoPartService: AutoPartService) {}
    @Get()
    async getAllAutoParts(
        @Query('categoryId') categoryId: string,
        @Query('carsId') carsId: string,
    ) {
        return await this.autoPartService.getAll(categoryId, carsId);
    }
}
