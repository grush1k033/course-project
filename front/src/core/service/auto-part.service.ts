import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {LOCAL_STORAGE_KEY_CAR_MODEL} from '../constants';

export interface IAutoPart {
  id: number
  name: string,
  description: string,
  price: string,
  image: string,
  category_id: number,
  cars_id: number
  amount: number;
  discount:number;
  favourites: number
}

@Injectable({
  providedIn: 'root'
})
export class AutoPartService {
  _search = new BehaviorSubject<string>('');
  search$ = this._search.asObservable();

  set search(value: string) {
    this._search.next(value);
  }

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getAutoPartByCategory(categoryId: string): Observable<IAutoPart[]> {
    const id = this.localStorage.get(LOCAL_STORAGE_KEY_CAR_MODEL);
    return this.httpClient.get<IAutoPart[]>(`http://localhost:3000/auto-part?categoryId=${categoryId}${id ? `&carsId=${id}` : ''}`)
  }

  getAllAutoPart():Observable<IAutoPart[]> {
    return this.httpClient.get<IAutoPart[]>(`http://localhost:3000/auto-part`);
  }

  updateAutoPart(dto: {favourite: boolean}, id: number) {
    return this.httpClient.patch<IAutoPart>(`http://localhost:3000/auto-part/${id}`,dto)
  }
}
