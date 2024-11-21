import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.token;



    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
   if(authToken) {
     const authReq = req.clone({
       headers: req.headers.set('Authorization', authToken)
     })
     return next.handle(authReq);
   }
    // send cloned request with header to the next handler.
    return next.handle(req);
  }
}
