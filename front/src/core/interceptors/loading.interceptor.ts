import { Injectable } from '@angular/core';
import {
  HttpContextToken, HttpEvent,
  HttpHandler, HttpInterceptor,
  HttpRequest, HttpResponse,
} from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteConfirmModalComponent } from '../components/modals/delete-confirm-modal/delete-confirm-modal.component';
import { LoadingModalComponent } from '../components/modals/loading-modal/loading-modal.component';
import { catchError, delay, finalize, map, Observable } from 'rxjs';

export const LOADING_TOKEN = new HttpContextToken<boolean>(() => false);
@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
  ref: DynamicDialogRef[] = [];
  constructor(
    private dialogService: DialogService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.context.get(LOADING_TOKEN)) {
      this.show();
      console.log('show');
    }

    return next.handle(req).pipe(
      delay(req.context.get(LOADING_TOKEN) ? 1000 : 0),
      finalize(() => {
        if(req.context.get(LOADING_TOKEN)) {
          console.log('close');
          this.hide();
        }
    }));
  }

  show() {
    const ref = this.dialogService.open(LoadingModalComponent, {
      closable: false,
      width: '30vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });
    this.ref.push(ref);
  }

  hide() {
    this.ref.forEach(item => {
      item?.close();
    });
  }
}
