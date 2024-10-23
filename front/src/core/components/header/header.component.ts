import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {AutoPartService} from '../../service/auto-part.service';
import {RouterLink} from '@angular/router';
import {BasketService} from '../../service/basket.service';
import {BadgeModule} from 'primeng/badge';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { RegistrationModalComponent } from "../registration-modal/registration-modal.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, RouterLink, BadgeModule, AvatarModule, RegistrationModalComponent, RegistrationModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  value: string = '';
  visible: boolean = false;

  constructor(
    private autoPartService: AutoPartService,
    public basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.getBasket()
  }

  changeSearch() {
    this.autoPartService.search = this.value;
  }

  getBasket() {
    this.basketService.getBasket().subscribe();
  }
}


