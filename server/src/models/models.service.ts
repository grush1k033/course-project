import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";
import {IModel} from "../Interfaces/interfaces";

@Injectable()
export class ModelsService {
    constructor(
        private databaseService: DatabaseService,
        private commonService: CommonService,
    ) {}

    async getAll(): Promise<IModel[]> {
        return (await this.databaseService.pool.query(this.commonService.getAll()))[0] as IModel[];
    }

    async getModels(id: string) {
        return (await this.databaseService.pool.query(`SELECT * FROM cars_models WHERE cars_marks_id = ${id}`))[0] as IModel[]
    }
}
