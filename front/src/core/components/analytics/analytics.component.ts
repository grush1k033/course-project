import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { finalize } from 'rxjs';
import { IOrder, OrderService } from '../../service/order.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    ChartModule,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  orders: IOrder[] = [];
  loading = true;
  basicData: any;

  basicOptions: any;

  monthNames = [
    "январь", "февраль", "март", "апрель", "май", "июнь",
    "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
  ];
  constructor(private orderService: OrderService) {
  }

  getOrders() {
    this.loading = true;
    this.orderService.getOrdersAll(true).pipe(
      finalize(() => this.loading = false)
    ).subscribe(resp => {
      this.orders = resp.filter((item) => new Date(item.timeOfDelivery) < new Date());
      const months = this.getMonthlyOrderCount(resp).map(({month}) => month);
      const orderCounts = this.getMonthlyOrderCount(resp).map(({orderCount}) => orderCount);
      this.setData(months, orderCounts);
    })
  }

  getMonthlyOrderCount = (orders: IOrder[]) => {
    const monthlyCount: {[p: string]: number} = {};

    orders.forEach(order => {
      const date = new Date(order.timeOfDelivery).getMonth();
      const yearMonth = this.monthNames[date]; // Формат YYYY-MM

      if (!monthlyCount[yearMonth]) {
        monthlyCount[yearMonth as keyof typeof monthlyCount] = 0;
      }
      monthlyCount[yearMonth] += 1; // Увеличиваем количество заказов за месяц
    });

    // Преобразуем объект в массив
    return Object.entries(monthlyCount).map(([key, count]) => ({
      month: key,
      orderCount: count,
    }));
  };

  ngOnInit() {
    this.getOrders();
    this.setOptions();
  }

  setData(months: string[], orders: number[]) {
    this.basicData = {
      labels: months,
      datasets: [
        {
          label: 'Orders',
          data: orders,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };
  }

  setOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}


