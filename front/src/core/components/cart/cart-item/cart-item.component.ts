import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IBasketItems } from "../../../service/basket.service";
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [
        CommonModule,
        InputNumberModule,
        FormsModule,
    ],
    templateUrl: './cart-item.component.html',
    styleUrl: './cart-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit, AfterViewInit {
    @Input() baketItem: IBasketItems = <IBasketItems>{}
    likeSrc = "assets/icons/like-empty.svg";
    trashSrc = "assets/icons/trash.svg"
    newPrice = '';
    amountValue = 0;

    ngOnInit(): void {
        this.newPrice = this.getPrice(this.baketItem.price, this.baketItem.discount);
    }

    ngAfterViewInit(): void {
        this.newPrice = this.baketItem.price;
        this.amountValue = this.baketItem.amount;
    }

    getPrice(price: string, discount: number) {
        return (+price * (1 - ((discount as number) / 100))).toFixed(2);
    }

    getBasketItem() {
        
    }

    deleteItem (id: number) {
        console.log(id);
    }
}

