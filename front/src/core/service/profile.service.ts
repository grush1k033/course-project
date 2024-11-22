import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { USER_ID } from '../constants';
import { IUser } from './auth.service';

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
  }

  updateImage(image: string, id: string) {
    return this.http.patch<IUser>('http://localhost:3000/user/' + id, {image});
  }
}
