import { Routes } from '@angular/router';
import {MainComponent} from '../core/components/main/main.component';
import {AutoPartItemsComponent} from '../core/components/auto-part-items/auto-part-items.component';
import { CartComponent } from '../core/components/cart/cart.component';
import { ProfileComponent } from '../core/components/profile/profile.component';
import { ProfileEditComponent } from '../core/components/profile/profile-edit/profile-edit.component';
import { AddComponent } from '../core/components/profile/add/add.component';

export const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'main'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'auto-part/:id',
    component: AutoPartItemsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'edit',
        pathMatch: 'full'
      },
      {
        path: 'edit',
        component: ProfileEditComponent
      },
      {
        path: 'add',
        component: AddComponent
      }
    ]
  }
];
