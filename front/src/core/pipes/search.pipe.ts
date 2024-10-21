import { Pipe, PipeTransform } from '@angular/core';
import {IAutoPart} from '../service/auto-part.service';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(autoParts: IAutoPart[], search: string | null): IAutoPart[] {
    if(!(search && search.trim())) {
      return autoParts;
    }
    return autoParts.filter(item => {
      return item.name.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
        item.description.toLowerCase().trim().includes(search.toLowerCase().trim());
    });
  }
}

