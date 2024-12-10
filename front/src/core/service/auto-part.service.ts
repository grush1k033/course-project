import {Injectable} from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {LOCAL_STORAGE_KEY_CAR_MODEL} from '../constants';
import { LOADING_TOKEN } from '../interceptors/loading.interceptor';

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

  getAutoPartByCategory(categoryId: string, loading = false): Observable<IAutoPart[]> {
    const id = this.localStorage.get(LOCAL_STORAGE_KEY_CAR_MODEL);
    return this.httpClient.get<IAutoPart[]>(`auto-part?categoryId=${categoryId}${id ? `&carsId=${id}` : ''}`, {
      context: new HttpContext().set(LOADING_TOKEN, loading)
    })
  }

  addAutoPart(dto: Omit<IAutoPart, 'id'>) {
    return this.httpClient.post<typeof dto>("auto-part", dto);
  }

  getAutoPartById(id: string) {
    return this.httpClient.get<IAutoPart>(`auto-part/${id}`)
  }
  getAllAutoPart(loading = false):Observable<IAutoPart[]> {
    return this.httpClient.get<IAutoPart[]>(`auto-part`, {
      context: new HttpContext().set(LOADING_TOKEN, loading)
    });
  }

  updateAutoPart(dto: {favourite: boolean}, id: number) {
    return this.httpClient.patch<IAutoPart>(`auto-part/${id}`,dto)
  }

  updateAutoPartAll(dto: Omit<IAutoPart, 'id'>, id: number) {
    return this.httpClient.put<IAutoPart>(`auto-part/${id}`,dto)
  }

  deleteAutoPart(id: string) {
    return this.httpClient.delete<void>(`auto-part/${id}`);
  }
}
