import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { IOrderAutopart } from '../../service/order.service';

@Component({
  selector: 'app-order-autopart-item',
  standalone: true,
  imports: [ButtonModule, ChipModule],
  templateUrl: './order-autopart-item.component.html',
  styleUrl: './order-autopart-item.component.scss'
})
export class OrderAutopartItemComponent implements OnChanges {
  @Input() orderAutoPart: IOrderAutopart | null = null;
  isConfirmed;
  history;
  imageSrc = 'assets/icons/zaglushka.svg';
  totalPrice: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {
    this.isConfirmed = !!+this.activatedRoute.snapshot.queryParams["isConfirmed"]; 
    this.history = this.activatedRoute.snapshot.queryParams["history"] === 'true'; 
  }
 
  ngOnChanges(): void {
    this.setImageSrc();
    if(this.orderAutoPart) {
      this.totalPrice = +(+this.orderAutoPart.price* +this.orderAutoPart.count).toFixed(2);
    }
    
  }


  setImageSrc() {
    if(this.orderAutoPart?.image.includes('http')) {
      this.imageSrc = this.orderAutoPart.image;
    } else {
      this.imageSrc = 'assets/images/'+ this.orderAutoPart?.image + '.webp'
    }
  }
}
