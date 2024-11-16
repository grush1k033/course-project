import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { BasketService, IBasket, IBasketItems } from "../../service/basket.service";
import { AutoPartService, IAutoPart } from "../../service/auto-part.service";
import { SkeletonModule } from "primeng/skeleton";

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        CommonModule,
        CartItemComponent,
        SkeletonModule,
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent { 

    basketItems: IBasketItems[] = [];


    constructor(
        private basketService: BasketService,
        private autoPartService: AutoPartService,
    ) {
        this.getBasketItems();
    }

    getBasketItems() {
        this.basketService.getBasketItems().subscribe((res) => {
            console.log(res);
        })
    }


}
