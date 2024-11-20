import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
  @Input() item: any | null = null;

  constructor(public router: Router) {
  }

}
