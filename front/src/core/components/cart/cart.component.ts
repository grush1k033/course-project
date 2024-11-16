import { CommonModule, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { BasketService, IBasket, IBasketItems } from "../../service/basket.service";
import { AutoPartService, IAutoPart } from "../../service/auto-part.service";
import { SkeletonModule } from "primeng/skeleton";
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        CommonModule,
        CartItemComponent,
        SkeletonModule,
        FormsModule,
        ButtonModule
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent { 

    basketItems: IBasketItems[] = [];


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
        })
    }

    deleteBasketItem(id: number) {
        const indexToRemove = this.basketItems.findIndex(item => item.basket_id === id);
        if (indexToRemove !== -1) {
            this.basketItems.splice(indexToRemove, 1);
            this.basketService.getBasket().subscribe();
        }
    }

    back() {
        this.location.back();
    }
}
