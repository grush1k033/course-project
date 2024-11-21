import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {Observable} from 'rxjs';
import { TOKEN } from '../constants';


export interface IUser {
  name: string;
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  checkLogin(name:string):Observable<{isExist: boolean}> {
    return this.http.post<{isExist: boolean}>("http://localhost:3000/user/exists", {email:name});
  }

  get isAuth() {
    return !!this.localStorage.get(TOKEN);
  }
}
