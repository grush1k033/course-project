import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../services/database.service';
import { CommonService } from '../services/common.service';
import {ICategory} from "../Interfaces/interfaces";
@Injectable()
export class CategoryService {
  constructor(
    private databaseService: DatabaseService,
    private commonService: CommonService,
  ) {}

  async getAll(name?: string) {
    const res: ICategory[] = (
        await this.databaseService.pool.query(this.commonService.getAll())
    )[0] as ICategory[];
    if(name.trim()) {
      return res.filter(item => item.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
    }

    return res;
  }
}
