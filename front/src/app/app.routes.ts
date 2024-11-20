import { Routes } from '@angular/router';
import {MainComponent} from '../core/components/main/main.component';
import {AutoPartItemsComponent} from '../core/components/auto-part-items/auto-part-items.component';
import { CartComponent } from '../core/components/cart/cart.component';
import { ProfileComponent } from '../core/components/profile/profile.component';
import { ProfileEditComponent } from '../core/components/profile/profile-edit/profile-edit.component';
import { AddComponent } from '../core/components/profile/add/add.component';
import {OrderItemComponent} from '../core/components/order-item/order-item.component';
import {OrderItemsComponent} from '../core/components/order-items/order-items.component';
import {OrderItemDetailComponent} from '../core/components/order-item-detail/order-item-detail.component';

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
    path: 'order',
    component: OrderItemsComponent
  },
  {
    path: 'order/:id',
    component: OrderItemDetailComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'edit-profile',
        pathMatch: 'full'
      },
      {
        path: 'edit-profile',
        component: ProfileEditComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'edit',
        component: AddComponent
      }
    ]
  }
];
