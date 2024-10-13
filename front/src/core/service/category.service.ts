import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ICategory {
  id: number,
  name: string,
  image: string
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategory(name?: string): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`http://localhost:3000/category?name=${name ? name : '' }`, {
      withCredentials: true,
    });
  }
}
