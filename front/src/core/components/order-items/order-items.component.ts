import { Component, OnInit } from '@angular/core';
import {OrderItemComponent} from '../order-item/order-item.component';
import { ProfileService } from '../../service/profile.service';
import { ICsvJsonData, IOrder, OrderService } from '../../service/order.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { OrderItemDetailComponent } from "../order-item-detail/order-item-detail.component";
import { Button } from 'primeng/button';
import { ngxCsv } from 'ngx-csv';
import * as XLSX from 'xlsx';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    OrderItemComponent,
    CommonModule,
    AccordionModule,
    OrderItemDetailComponent,
    Button,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss'
})
export class OrderItemsComponent implements OnInit {
  orders: IOrder[] = [];
  loading = true;
  total: number = 0;
  countProduct: string = '';
  page: 'order' | 'orders-history' = 'order';

  constructor(
    private profileService: ProfileService,
    private orderService: OrderService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.profileService.getUser().subscribe();
    this.page = this.router.url.split('/').pop() as typeof this.page;
  }
  ngOnInit(): void {
    this.getOrders();
  }


  exportToCSV(): void {
    this.orderService.exportInCsv().subscribe(jsonData => {
      if(jsonData.length) {
        const csvData = this.jsonToCSV(jsonData);
        this.downloadFile(csvData);
      } else {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Экспортировать нечего. У вас нет подтвержденных заказов!' });
      }

    })

  }

  downloadFile(csvData: string) {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'orders.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private jsonToCSV(jsonData: ICsvJsonData[]): string {
    if (!jsonData || jsonData.length === 0) {
      return '';
    }

    const keys = Object.keys(jsonData[0])
    const csvRows = [];

    // Добавляем заголовки
    csvRows.push(keys.map((item) => {
      if (item === 'OrdersId') {
        return '№';
      } else if (item === 'count') {
        return 'Количество';
      } else if (item === 'name') {
        return 'Наименование продукта';
      } else if (item === 'description') {
        return 'Описание продукта';
      } else if (item === 'price') {
        return 'Цена';
      } else if (item === 'discount') {
        return 'Скидка';
      } else if (item === 'timeOfDelivery') {
        return 'Время доставки';
      } else {
        return 'Общая сумма';
      }
    }).join(';'));

    // Добавляем данные
    for (const row of jsonData) {
      const values = keys.map(key => {
        const escaped = ('' + row[key as keyof typeof row]).replace(/"/g, '\\"'); // Экранирование кавычек
        return `"${escaped}"`; // Оборачиваем в кавычки
      });
      csvRows.push(values.join(';'));
    }

    return csvRows.join('\n');
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
