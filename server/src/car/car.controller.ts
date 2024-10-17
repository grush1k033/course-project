import {Controller, Get, Param, Post} from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import * as mysql from "mysql2/promise";
import {CommonService} from "../services/common.service";
import {CarService} from "./car.service";

@Controller('car')
export class CarController {
    constructor(private carService: CarService) {
    }

    @Get(':id')
    async getCar(@Param('id') id: string) {
        return this.carService.getCar(id);
    }


}