import { Pipe, PipeTransform } from '@angular/core';
import {IAutoPart} from '../service/auto-part.service';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {

  transform(autoParts: IAutoPart[], rangeValue: number[]): IAutoPart[] {
    const [min, max] = rangeValue;
    if(min === 0 && max === 0) {
      return autoParts;
    }
    return autoParts.filter(({price}) => (min < +price && max > +price));
  }

}
