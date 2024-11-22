import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import { Observable, tap } from 'rxjs';
import { TOKEN, USER_ID } from '../constants';
import { BasketService } from './basket.service';
import { ProfileService } from './profile.service';


export interface IUser {
  id?: string
  name: string;
  email:string;
  password:string;
  isAdmin?: number
  image?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private basketService: BasketService,
    private profileService: ProfileService
  ) {}

  checkLogin(name:string):Observable<{isExist: boolean}> {
    return this.http.post<{isExist: boolean}>("http://localhost:3000/user/exists", {email:name});
  }

  login(dto: Omit<IUser, 'name'>) {
    return this.http.post<{id: string,accessToken: string}>("http://localhost:3000/auth/login", dto)
      .pipe(
        tap((token) => {
          this.localStorage.set(TOKEN, token.accessToken);
          this.localStorage.set(USER_ID, token.id);
          this.basketService.getBasket().subscribe()
          this.profileService.getUser().subscribe()
        })
      )
  }

  register(dto: IUser) {
    return this.http.post('http://localhost:3000/auth/register', dto);
  }

  get isAuth() {
    return !!this.localStorage.get(TOKEN);
  }

  get token () {
    return this.localStorage.get(TOKEN) || null;
  }

  logout() {
    this.localStorage.remove(TOKEN);
    this.localStorage.remove(USER_ID);
    this.basketService.getBasket().subscribe()
  }

  get isAdmin() {
    return
  }
}
