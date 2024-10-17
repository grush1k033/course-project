import {Injectable, NotFoundException} from '@nestjs/common';
import {DatabaseService} from "../services/database.service";
import {CommonService} from "../services/common.service";

@Injectable()
export class CarService {
    constructor(
        private db: DatabaseService,
        private cm: CommonService
    ) {}

    async getCar(id: string) {
        const res = await this.db.pool.query(this.cm.getByID(id))
        return res[0][0];
    }
}
