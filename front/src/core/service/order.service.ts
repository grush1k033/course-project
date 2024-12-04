import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { USER_ID } from "../constants";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LOADING_TOKEN } from '../interceptors/loading.interceptor';

export interface IOrderWithAutoPart {
  total_count: number,
  name: string,
  timeOfDelivery: string
}

export interface IOrder {
    id: string,
    timeOfDelivery: string,
    countAutoparts: number,
    UserId: number,
    isConfirmed: number,
    total: number
}

export interface IOrderAutopart {
    OrdersId: string,
    AutopartsId: string,
    name: string,
    description: string,
    price: string,
    image: string,
    count: string
}

export interface ICsvJsonData {
  OrdersId: number,
  count: number,
  name: string,
  description: string,
  price: number,
  discount: number,
  timeOfDelivery: string,
  total: string
}

export interface OrderAutopartDto {
    OrdersId: number,
    Autoparts: {id: number, count: number}[],
}


@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private _orders = new BehaviorSubject<IOrder[]>([]);
    orders$ = this._orders.asObservable();
    set orders(value: IOrder[]) {
      this._orders.next(value);
    }

    constructor(private http: HttpClient, private localStorage: LocalStorageService) {

    }

    getOrders(loading = false): Observable<IOrder[]> {
        const id = this.localStorage.get(USER_ID);
        return this.http.get<IOrder[]>(`http://localhost:3000/order/${id}`, {
          context: new HttpContext().set(LOADING_TOKEN, loading)
        })
            .pipe(
                tap((resp) => this.orders = resp.filter((item) => {
                    return new Date(item.timeOfDelivery) > new Date()
                  }))
            )
    }

    createOrder(countAutoparts: number, total: number): Observable<{id: string}> {
        const dto: Omit<IOrder, 'id'> = {
            timeOfDelivery: this.adjustDate(new Date()),
            countAutoparts,
            isConfirmed: 0,
            UserId: this.localStorage.get(USER_ID),
            total
        }
        return this.http.post<{id: string}>("http://localhost:3000/order", dto);
    }

    createOrderAutoparts(dto: OrderAutopartDto) {
        return this.http.post("http://localhost:3000/order/autoparts", dto);
    }

    getOrdersAutoparts(id: string) {
        return this.http.get<IOrderAutopart[]>(`http://localhost:3000/order/autoparts/${id}`);
    }

    deleteOrder(id: string) {
        return this.http.delete('http://localhost:3000/order/' + id);
    }

    exportInCsv(): Observable<ICsvJsonData[]> {
      const userId = this.localStorage.get(USER_ID);
      return this.http.get<ICsvJsonData[]>('http://localhost:3000/order/exportInCsv/' + userId, {
        context: new HttpContext().set(LOADING_TOKEN, true)
      });
    }

    getOrdersAll(loading = false):Observable<IOrder[]> {
      return this.http.get<IOrder[]>('http://localhost:3000/order/all-orders', {
        context: new HttpContext().set(LOADING_TOKEN, loading)
      });
    }

    getOrderWithAutoPart(): Observable<IOrderWithAutoPart[]> {
      return this.http.get<IOrderWithAutoPart[]>('http://localhost:3000/order/all-orders-auto-part');
    }

    adjustDate(currentDate: Date): string {
        // Получаем час из текущей даты
        const hours = currentDate.getHours();

        // Создаем новый объект даты
        const newDate = new Date(currentDate);

        // Проверяем, утро ли это (8-12 часов)
        if (hours >= 8 && hours < 12) {
            // Если утро, добавляем 1 день
            newDate.setDate(newDate.getDate() + 1);
        } else {
            // Если не утро, добавляем 2 дня
            newDate.setDate(newDate.getDate() + 2);
        }

        // Генерируем случайное число от 8 до 12 для часов
        const randomHour = Math.floor(Math.random() * 5) + 8; // 8, 9, 10, 11, 12
        newDate.setHours(randomHour, 0, 0, 0); // Устанавливаем случайный час, минуты, секунды и миллисекунды в 0

        return newDate.toString();
    }

    declensionOfGoods(count: number, order: boolean = false) {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return count + (!order ? ' товаров' : ' заказов');
        }

        switch (lastDigit) {
            case 1:
                return count + (!order ? ' товар' : ' заказ');
            case 2:
            case 3:
            case 4:
                return count + (!order ? ' товара' : ' заказа');
            default:
                return count + (!order ? ' товаров' : ' заказов');
        }
      }
}
