import {Controller, Get, Param} from '@nestjs/common';
import {ModelsService} from "./models.service";

@Controller('models')
export class ModelsController {

    constructor(private modelsService: ModelsService) {}
    @Get()
    async getAllModels() {
        return await this.modelsService.getAll();
    }

    @Get(':id')
    async getModelByID(@Param('id') id: string) {
        return await this.modelsService.getModels(id);
    }
}


