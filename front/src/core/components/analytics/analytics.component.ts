import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { finalize } from 'rxjs';
import { IOrder, IOrderWithAutoPart, OrderService } from '../../service/order.service';

export interface ITransformOrderAutoPart {
  [key: string]: ITransformOrderAutoPartValue[]
}

export interface ITransformOrderAutoPartValue {
  name: string,
  count: number
}
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
  data: any;
  basicOptions: any;

  monthNames = [
    "январь", "февраль", "март", "апрель", "май", "июнь",
    "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
  ];
  constructor(private orderService: OrderService) {
    this.getOrdersWithAutoPart()
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


  getColor(name: string) {
    switch(name) {
      case 'Масло моторное': return 'red';
        break;
        default:
          return 'green'
    }
    
  }

  getOrdersWithAutoPart() {
    this.orderService.getOrderWithAutoPart().subscribe(res => {
      const items = Object.entries(this.transformOrdersWithAutoPart(res));
      const months = items.map(item => item[0]);
      const datasets: any[] = items.map(item => item[1]).map((item, i) => ({
        type: 'bar',
        label: item[0].name,
        backgroundColor: this.getColor(item[0].name),
        data: item.map(item => item.count)
      }))

      this.data = {
        labels: months,
        datasets
      }
      console.log(this.data);
    })

  }

  transformOrdersWithAutoPart(data: IOrderWithAutoPart[]): ITransformOrderAutoPart {
    return data.reduce((acc, { name, timeOfDelivery, total_count }) => {
      // Получаем номер месяца из даты
      const monthIndex = new Date(timeOfDelivery).getMonth(); // 0 - Январь, 11 - Декабрь
      const monthName = this.monthNames[monthIndex]; // Получаем название месяца

      // Проверяем, существует ли уже массив для этого месяца
      if (!acc[monthName]) {
        acc[monthName] = []; // Если нет, создаем новый массив
      }

      // Добавляем новый объект в соответствующий массив
      acc[monthName].push({ name, count: total_count });

      return acc;
    }, <ITransformOrderAutoPart>{});
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

    const months = Object.entries(monthlyCount).map(([key, count]) => ({
      month: key,
      orderCount: count,
    }));

    const monthIndex = this.monthNames.reduce((acc, month, index) => {
      acc[month as keyof typeof acc] = index;
      return acc;
    }, <{ [p: string]: number }>{});

// Сортируем массив месяцев по индексу
    months.sort((a, b) => monthIndex[a.month] - monthIndex[b.month]);

    // Преобразуем объект в массив
    return months;
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


