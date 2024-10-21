import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {constructor() { }

  get(id: string) {
    return JSON.parse(localStorage.getItem(id) as string);
  }

  set(id: string, value: any) {
    localStorage.setItem(id, JSON.stringify(value));
  }
}
