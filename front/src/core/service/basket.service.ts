import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { USER_ID } from '../constants';
import { LOADING_TOKEN } from '../interceptors/loading.interceptor';

export interface IBasket {
  id: string;
  AutopartId: number;
  UserId: number;
}

export interface IBasketDto {
  countAutoparts: number;
  AutopartId: number;
  UserId: number;
}

export interface IBasketItems {
  basket_id: number,
  countAutoparts: number,
  id: number,
  name: string,
  description: string,
  price: string,
  image: string,
  amount: number;
  discount:number;
  favourites: number
}

export interface MailDto {
  link: string,
  orderNumber: string,
  mail: string
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private _basket = new BehaviorSubject<IBasket[]>([]);
  basket$ = this._basket.asObservable();
  set basket(value: IBasket[]) {
    this._basket.next(value);
  }
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {

  }

  getBasket() {
    return this.http.get<IBasket[]>(`basket/${this.localStorage.get(USER_ID)}`)
      .pipe(
        tap(res => {
          this.basket = res
        })
      );
  }

  addBasket(id: number, count: number = 1) {
    const dto:IBasketDto = {
      countAutoparts: count,
      AutopartId: id,
      UserId: +this.localStorage.get(USER_ID),
    }
    return this.http.post<IBasket>('basket', dto);
  }

  getBasketItems(loading = false){
    return this.http.get<IBasketItems[]>(`basket/items/${this.localStorage.get(USER_ID)}`, {
      context: new HttpContext().set(LOADING_TOKEN, loading),
    })
  }

  deleteItem(id: number) {
    return this.http.delete(`basket/${id}`);
  }

  updateBasketItem(id: number, count: number) {
    const dto:{countAutoparts: number} = {
      countAutoparts: count
    }
    return this.http.patch<typeof dto>(`basket/${id}?UserId=${this.localStorage.get(USER_ID)}`, dto);
  }

  getPrice(price: string, discount: number) {
    return (+price * (1 - ((discount as number) / 100))).toFixed(2);
  }

  sendMail(dto: MailDto): Observable<{message: string}> {
    return this.http.post<{message: string}>("mail", dto)
  }
}
