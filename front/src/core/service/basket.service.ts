import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private _basket = new BehaviorSubject<IBasket[]>([]);
  basket$ = this._basket.asObservable();
  set basket(value: IBasket[]) {
    this._basket.next(value);
  }

  userId = 1;
  constructor(private http: HttpClient) {}

  getBasket() {
    return this.http.get<IBasket[]>(`http://localhost:3000/basket/${this.userId}`)
      .pipe(
        tap(res => {this.basket = res})
      );
  }

  addBasket(id: number, count: number = 1) {
    const dto:IBasketDto = {
      countAutoparts: count,
      AutopartId: id,
      UserId: this.userId,
    }
    return this.http.post<IBasket>('http://localhost:3000/basket', dto);
  }
  
  getBasketItems(){
    return this.http.get<IBasketItems[]>(`http://localhost:3000/basket/items/${this.userId}`)
  }

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:3000/basket/${id}`);
  }

  updateBasketItem(id: number, count: number) {
    const dto:{countAutoparts: number} = {
      countAutoparts: count
    }
    return this.http.patch<typeof dto>(`http://localhost:3000/basket/${id}?UserId=${this.userId}`, dto);
  }

}
