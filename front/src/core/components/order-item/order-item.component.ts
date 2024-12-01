import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { IOrder, OrderService } from '../../service/order.service';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    TooltipModule,
    ButtonModule,
    CommonModule,
    ChipModule
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent implements OnChanges {

  @Input() item: IOrder | null = null;
  @Input() history: boolean = false;

  countProducts: string  = ''

  constructor(public router: Router, private orderService: OrderService) {
    
  }

  ngOnChanges(): void {
    this.countProducts = this.orderService.declensionOfGoods(this.item?.countAutoparts as number)
  }

  navigateToDetail() {
    if(!this.history) {
      this.router.navigate(['order', this.item?.id], {
        queryParams: {isConfirmed: this.item?.isConfirmed}
      })
    }
   
  }

}
