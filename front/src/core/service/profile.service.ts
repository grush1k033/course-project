import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { USER_ID } from '../constants';
import { IUser } from './auth.service';
import { IBasket } from './basket.service';

export interface IUploadFileResponse {
  status: number,
  message: string,
  data: IUploadFileData
}

export interface IUploadFileData {
  originalname: string,
  filename:  string
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _user = new BehaviorSubject<IUser>(<IUser>{});
  user$ = this._user.asObservable();
  set user(value: IUser) {
    this._user.next(value);
  }

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }


  addFile(data: FormData) {
    return this.http.post<IUploadFileResponse>("http://localhost:3000/files", data, {
      reportProgress: true,
      observe: 'events' // Позволяет отслеживать прогресс загрузки
    });
  }

  getUser() {
    return this.http.get<IUser>('http://localhost:3000/user/' + this.localStorage.get(USER_ID))
      .pipe(
        tap((user) => this.user = user)
      )
  }

  updateImage(image: string, id: string) {
    return this.http.patch<IUser>('http://localhost:3000/user/' + id, {image});
  }
}
