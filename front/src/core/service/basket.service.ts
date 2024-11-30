import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { USER_ID } from '../constants';

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
    return this.http.get<IBasket[]>(`http://localhost:3000/basket/${this.localStorage.get(USER_ID)}`)
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
    return this.http.post<IBasket>('http://localhost:3000/basket', dto);
  }

  getBasketItems(){
    return this.http.get<IBasketItems[]>(`http://localhost:3000/basket/items/${this.localStorage.get(USER_ID)}`)
  }

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:3000/basket/${id}`);
  }

  updateBasketItem(id: number, count: number) {
    const dto:{countAutoparts: number} = {
      countAutoparts: count
    }
    return this.http.patch<typeof dto>(`http://localhost:3000/basket/${id}?UserId=${this.localStorage.get(USER_ID)}`, dto);
  }

  getPrice(price: string, discount: number) {
    return (+price * (1 - ((discount as number) / 100))).toFixed(2);
  }

  sendMail(dto: MailDto): Observable<{message: string}> {
    return this.http.post<{message: string}>("http://localhost:3000/mail", dto)
  }
}
