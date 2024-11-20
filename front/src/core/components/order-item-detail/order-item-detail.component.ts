import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderItemComponent} from '../order-item/order-item.component';
import {OrderAutopartItemComponent} from '../order-autopart-item/order-autopart-item.component';

@Component({
  selector: 'app-order-item-detail',
  standalone: true,
  imports: [
    OrderItemComponent,
    OrderAutopartItemComponent
  ],
  templateUrl: './order-item-detail.component.html',
  styleUrl: './order-item-detail.component.scss'
})
export class OrderItemDetailComponent {
  id: string;
  constructor(public activatedRoute: ActivatedRoute) {
    this.id = (this.activatedRoute.snapshot.params as {id: string}).id;
  }
}
