import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMark, IModel} from '../components/main/main.component';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) {}

  getModels(id: string): Observable<IModel[]> {
    return this.http.get<IModel[]>(`http://localhost:3000/models/${id}`);
  }

  getAllMarks(): Observable<IMark[]> {
    return this.http.get<IMark[]>('http://localhost:3000/marks')
  }
}
