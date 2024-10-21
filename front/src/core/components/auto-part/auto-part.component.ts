import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {IAutoPart} from '../../service/auto-part.service';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {VisibleImgDirective} from '../../directive/visible-img.directive';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'app-auto-part',
  standalone: true,
  imports: [DropdownModule, FormsModule, Button, VisibleImgDirective, TooltipModule],
  templateUrl: './auto-part.component.html',
  styleUrl: './auto-part.component.scss'
})
export class AutoPartComponent implements OnChanges{
  @Input() item: IAutoPart | null = null;
  selectAmount: number = 1;
  color: 'warning' | 'success' = 'warning'
  label = 'Купить'

  likeSrc = "assets/icons/like-empty.svg";

  ngOnChanges() {
    this.likeSrc = (this.item && this.item?.favourites)
      ? "assets/icons/like.svg"
      : "assets/icons/like-empty.svg";
  }
  getAmount(amount:number) {
    const array: number[] = [];
    for(let i=1; i<=amount; i++) {
      array.push(i);
    }
    return array;
  }

  getPrice(price:string, discount: number) {
    return (+price*(1-((discount as number)/100))).toFixed(2);
  }

  changeColor() {
    if(this.color === 'warning') {
      this.color = "success"
      this.label = 'В корзине'
    } else {
      this.color = 'warning'
      this.label = 'Купить'
    }
  }
}
