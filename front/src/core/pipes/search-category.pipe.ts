import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryService, ICategory} from '../service/category.service';

@Pipe({
  name: 'searchCategory',
  standalone: true
})
export class SearchCategoryPipe implements PipeTransform {
  transform(categories: ICategory[], name: string): ICategory[] {
    if(!name.trim()) {
      return categories;
    }
    return categories.filter(item => item.name.toLowerCase().trim().includes(name.toLowerCase().trim()));
  }
}

