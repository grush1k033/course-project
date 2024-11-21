import {Controller, Get} from '@nestjs/common';
import {MarksService} from "./marks.service";
import { Public } from '../auth/public.decorator';

@Public()
@Controller('marks')
export class MarksController {

    constructor(private marksService: MarksService) {
    }
    @Get()
    async getAllMarks(){
        return await this.marksService.getAllMarks();
    }
}
