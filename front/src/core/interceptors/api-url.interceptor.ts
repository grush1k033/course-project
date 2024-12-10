import { Injectable } from '@angular/core';
import {
  HttpHandler, 
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { API_URL } from '../../../enviroments';


@Injectable({
  providedIn: 'root'
})
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiReq = req.clone({url:`${API_URL}/${req.url}`})
    return next.handle(apiReq);
  }
}
