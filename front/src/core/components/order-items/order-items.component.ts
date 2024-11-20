import { Component } from '@angular/core';
import {OrderItemComponent} from '../order-item/order-item.component';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    OrderItemComponent
  ],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss'
})
export class OrderItemsComponent {

}
