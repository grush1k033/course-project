import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import {IModel} from "../Interfaces/interfaces";

@Injectable()
export class MarksService {
    constructor(
        private databaseService: DatabaseService,
        private commonService: CommonService
    ) {}
    async getAllMarks() {
        return (await this.databaseService.pool.query(this.commonService.getAll()))[0] as IModel[];
    }

}
