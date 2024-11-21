import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.token;



    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
   if(this.auth.isAuth) {
     const authReq = req.clone({
       headers: req.headers.set('Authorization', authToken)
     })
     return next.handle(authReq).pipe(
       catchError(({ error }) => {
         console.log(error);
         if(error.statusCode === 401) {

            this.auth.logout();
            this.router.navigate(['/']).then()
         }
         return throwError(error)
       })
     );
   }
    // send cloned request with header to the next handler.
    return next.handle(req)
  }
}
