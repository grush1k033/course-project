import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderAutopartItemComponent} from '../order-autopart-item/order-autopart-item.component';
import { ProfileService } from '../../service/profile.service';
import { IOrderAutopart, OrderService } from '../../service/order.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteConfirmModalComponent } from '../modals/delete-confirm-modal/delete-confirm-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-item-detail',
  standalone: true,
  imports: [
    OrderAutopartItemComponent, CommonModule
  ],
  templateUrl: './order-item-detail.component.html',
  styleUrl: './order-item-detail.component.scss',
  providers: [DialogService]
})
export class OrderItemDetailComponent implements OnChanges {
  id: string;
  ordersAutoparts: IOrderAutopart[] = [];
  total: number = 0;
  @Input() history: boolean = false;
  @Input() set idOrder(id: string) {
    if(id) this.id = id;
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private orderService: OrderService,
    public dialogService: DialogService,
    private router: Router,
  ) {
    this.id = (this.activatedRoute.snapshot.params as {id: string}).id;
    this.profileService.getUser().subscribe();
    if(!this.history && this.id) {
      this.getOrdersAutoparts(this.id);
    }
  }

  ngOnChanges(): void {
    if(history && this.id) {
      this.getOrdersAutoparts(this.id);
    }
  }

  getOrdersAutoparts(id: string) {
    this.orderService.getOrdersAutoparts(id).subscribe(resp => {
      this.ordersAutoparts = resp;
      this.total = +resp.reduce((init, next) => init + (+next.price * +next.count), 0).toFixed(2);
    })
  }
  ref: DynamicDialogRef | undefined;
  show() {
    this.ref = this.dialogService.open(DeleteConfirmModalComponent, {
      header: 'Вы действительно ходите отменить заказ?',
      data: {
        order: true
      },
      width: '30vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },

    });

    this.ref?.onClose.subscribe((data?: {delete: boolean}) => {
      if(data?.delete) {
        this.deleteOrder(this.id);
      }
    })
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.router.navigate(['order']);
    });
  }
}
