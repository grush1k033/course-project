import { Component, OnInit } from '@angular/core';
import {OrderItemComponent} from '../order-item/order-item.component';
import { ProfileService } from '../../service/profile.service';
import { IOrder, OrderService } from '../../service/order.service';
import { finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { OrderItemDetailComponent } from "../order-item-detail/order-item-detail.component";

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    OrderItemComponent,
    CommonModule,
    AccordionModule,
    OrderItemDetailComponent
],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss'
})
export class OrderItemsComponent implements OnInit {
  orders: IOrder[] = [];
  loading = true;
  total: number = 0;
  countProduct: string = '';
  page: 'order' | 'orders-history' = 'order';


  constructor(private profileService: ProfileService, private orderService: OrderService, private router: Router) {
    this.profileService.getUser().subscribe();
    this.page = this.router.url.split('/').pop() as typeof this.page;
  }
  ngOnInit(): void {
    this.getOrders();
  }


  getOrders() {
    this.loading = true;
    this.orderService.getOrders(true).pipe(
      finalize(() => this.loading = false)
    ).subscribe(resp => {
      this.orders = resp.filter((item) => {
        if(this.page === 'order') {
          return new Date(item.timeOfDelivery) > new Date()
        }
        return new Date(item.timeOfDelivery) < new Date()
      });

      this.total = +this.orders.reduce((initial, next ) => initial + +next.total, 0).toFixed(2);
      this.countProduct = this.orderService.declensionOfGoods(this.orders.length, true)
    })
  }

}
