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
import { AuthGuard } from '../core/guards/auth.guards';
import { FavoriteComponent } from '../core/components/favorite/favorite.component';

export const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auto-part/:id',
    component: AutoPartItemsComponent
  },
  {
    path: 'order',
    component: OrderItemsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/:id',
    component: OrderItemDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
      },
      {
        path: 'orders-history',
        component: OrderItemsComponent
      },
      {
        path: 'favorite',
        component: FavoriteComponent
      },
      

    ]
  }
];
