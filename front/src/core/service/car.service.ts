import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LOCAL_STORAGE_KEY_CAR_MODEL} from '../constants';
import {LocalStorageService} from './local-storage.service';

export interface IModel {
  id: number,
  name: string,
  cars_marks_id: number
}

export interface IMark {
  id: number,
  name: string
}
export interface ICar {
  image: string,
}
@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getModels(id: string): Observable<IModel[]> {
    return this.http.get<IModel[]>(`http://localhost:3000/models/${id}`);
  }

  getAllMarks(): Observable<IMark[]> {
    return this.http.get<IMark[]>('http://localhost:3000/marks')
  }

  getCar():Observable<ICar> {
    const id = this.localStorage.get(LOCAL_STORAGE_KEY_CAR_MODEL);
    return this.http.get<ICar>(`http://localhost:3000/car/${id}`);
  }
}
