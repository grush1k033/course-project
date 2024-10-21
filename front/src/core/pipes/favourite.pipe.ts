import { Pipe, PipeTransform } from '@angular/core';
import {IAutoPart} from '../service/auto-part.service';

@Pipe({
  name: 'favourite',
  standalone: true
})
export class FavouritePipe implements PipeTransform {

  transform(autoParts: IAutoPart[], key: string): IAutoPart[] {
    switch (key) {
      case '0': return autoParts.filter((item) => !item.favourites);
      case '1': return autoParts.filter((item) => !!item.favourites);
      case '2': return autoParts;
      default: return autoParts;
    }
  }
}
