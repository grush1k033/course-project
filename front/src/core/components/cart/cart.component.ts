import { CommonModule, Location } from "@angular/common";
import { Component } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { BasketService, IBasketItems } from "../../service/basket.service";
import { SkeletonModule } from "primeng/skeleton";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {Button} from 'primeng/button';
import { ProfileService } from '../../service/profile.service';

@Component({
    selector: 'app-cart',
    standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    SkeletonModule,
    FormsModule,
    ButtonModule,
    Button,
    ReactiveFormsModule
  ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent {
    basketItems: IBasketItems[] = [];
    value = 0;
    total = 0;
    oldTotal = 0;
    email: FormControl<string | null> = new FormControl("", [Validators.required, Validators.email]);
    constructor(
        private basketService: BasketService,
        private location: Location,
        private profileService: ProfileService
    ) {
        this.profileService.getUser().subscribe();
        this.getBasketItems();
    }

    getBasketItems() {
        this.basketService.getBasketItems().subscribe((res) => {
            this.basketItems = res;
            this.calculateOldTotal();
            this.calculateTotal();
        })
    }

    deleteBasketItem(id: number) {
        const indexToRemove = this.basketItems.findIndex(item => item.basket_id === id);
        if (indexToRemove !== -1) {
            this.basketItems.splice(indexToRemove, 1);
            this.basketService.getBasket().subscribe();
            this.calculateOldTotal();
            this.calculateTotal();
        }
    }

    back() {
        this.location.back();
    }

    calculateTotal() {
        this.total = +(this.basketItems.reduce((start, curr) => start + (+this.basketService.getPrice(curr.price, curr.discount))*curr.countAutoparts,0)).toFixed(2);
    }

    calculateOldTotal() {
        this.oldTotal = +(this.basketItems.reduce((start, curr) => start + (+curr.price)*curr.countAutoparts,0)).toFixed(2);
    }

    updateItem() {
        this.getBasketItems();
    }

}
