import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  constructor(private http: HttpClient) { }


  addFile(data: FormData) {
    return this.http.post<IUploadFileResponse>("http://localhost:3000/files", data, {
      reportProgress: true,
      observe: 'events' // Позволяет отслеживать прогресс загрузки
    });
  }
}
