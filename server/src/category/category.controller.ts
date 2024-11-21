import {Controller, Get, Query} from '@nestjs/common';
import {CategoryService} from "./category.service";
import { Public } from '../auth/public.decorator';

@Public()
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async getAllCategory(@Query('name') name: string) {
    return await this.categoryService.getAll(name);
  }

}
