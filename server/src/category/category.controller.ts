import {Controller, Get, Query, Req} from '@nestjs/common';
import { CategoryService } from './category.service';
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async getAllCategory(@Query('name') name: string) {
    return await this.categoryService.getAll(name);
  }

}
