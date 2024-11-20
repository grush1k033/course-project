import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-order-autopart-item',
  standalone: true,
  imports: [],
  templateUrl: './order-autopart-item.component.html',
  styleUrl: './order-autopart-item.component.scss'
})
export class OrderAutopartItemComponent {
  @Input() orderAutoPart: any | null = null;
}
