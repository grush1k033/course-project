import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../services/database.service';
import { CommonService } from '../services/common.service';
@Injectable()
export class CategoryService {
  constructor(
    private databaseService: DatabaseService,
    private commonService: CommonService,
  ) {}

  async getAll() {
    return (
      await this.databaseService.pool.query(this.commonService.getAll())
    )[0];
  }
}
