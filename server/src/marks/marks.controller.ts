import {Controller, Get} from '@nestjs/common';
import {MarksService} from "./marks.service";

@Controller('marks')
export class MarksController {

    constructor(private marksService: MarksService) {
    }
    @Get()
    async getAllMarks(){
        return await this.marksService.getAllMarks();
    }
}
