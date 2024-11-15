import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, RouterLink, BadgeModule, AvatarModule, RegistrationModalComponent, RegistrationModalComponent, LoginModalComponent, Button],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  value: string = '';
  visibleRegistration: boolean = false;
  visibleLogin: boolean = false;
  isCartPage: boolean = false;

  constructor(
    private autoPartService: AutoPartService,
    public basketService: BasketService,
    public router: Router,
    private location: Location,
  ) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.isCartPage = val.url.includes('cart');
      }
  });
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


