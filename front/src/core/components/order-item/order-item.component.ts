import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    TooltipModule,
    ButtonModule
    
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
  @Input() item: any | null = null;

  constructor(public router: Router) {
  }

}
