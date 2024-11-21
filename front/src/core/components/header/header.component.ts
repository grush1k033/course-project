import { Component, OnDestroy, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {AutoPartService} from '../../service/auto-part.service';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {BasketService} from '../../service/basket.service';
import {BadgeModule} from 'primeng/badge';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { RegistrationModalComponent } from "../registration-modal/registration-modal.component";
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { Button } from 'primeng/button';
import { AuthGuard } from '../../guards/auth.guards';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, RouterLink, BadgeModule, AvatarModule, RegistrationModalComponent, RegistrationModalComponent, LoginModalComponent, Button],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  value: string = '';
  visibleRegistration: boolean = false;
  visibleLogin: boolean = false;
  isCartPage: boolean = false;
  guardWorkSub: Subscription;


  constructor(
    private autoPartService: AutoPartService,
    public basketService: BasketService,
    public router: Router,
    private location: Location,
    private authGuards: AuthGuard,
    public authService: AuthService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isCartPage = val.url.includes('cart');
      }
    });
    this.guardWorkSub = this.authGuards.guardWork$.subscribe((res) => {
      this.visibleLogin = res;
    });
  }

  ngOnDestroy(): void {
    this.guardWorkSub.unsubscribe();
  }

  ngOnInit(): void {
    this.getBasket()
  }

  changeSearch() {
    this.autoPartService.search = this.value;
  }

  getBasket() {
    this.basketService.getBasket().subscribe();
  }

  back() {
    this.location.back();
  }
}


