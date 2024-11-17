import { CommonModule, Location } from "@angular/common";
import { Component, Input } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { BasketService, IBasketItems } from "../../service/basket.service";
import { AutoPartService} from "../../service/auto-part.service";
import { SkeletonModule } from "primeng/skeleton";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {Button} from 'primeng/button';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        CommonModule,
        CartItemComponent,
        SkeletonModule,
        FormsModule,
        ButtonModule,
        Button
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent { 
    @Input() baketItem: IBasketItems = <IBasketItems>{}
    
    basketItems: IBasketItems[] = [];
    value = 0;
    total = 0;
    oldTotal = 0;
    constructor(
        private basketService: BasketService,
        private autoPartService: AutoPartService,
        private location: Location,
    ) {
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
