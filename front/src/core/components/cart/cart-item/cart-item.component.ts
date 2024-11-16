import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService, IBasketItems } from "../../../service/basket.service";
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
    @Output() onDelete = new EventEmitter<number>()
    likeSrc = "assets/icons/like-empty.svg";
    trashSrc = "assets/icons/trash.svg"
    newPrice = '';
    amountValue = 0;


    constructor(private basketService: BasketService) {

    }

    ngOnInit(): void {
        this.newPrice = this.getPrice(this.baketItem.price, this.baketItem.discount);
    }

    ngAfterViewInit(): void {
        this.newPrice = this.baketItem.price;
        this.amountValue = this.baketItem.countAutoparts || 0;
    }

    getPrice(price: string, discount: number) {
        return this.newPrice = (+price * (1 - ((discount as number) / 100))).toFixed(2);
    }

    deleteItem (id: number) {
        this.basketService.deleteItem(id).subscribe(() => {
            this.onDelete.emit(id);
        });
    }

    changeAmount(event: any) {
        if(event.value === 0) {
            this.deleteItem(this.baketItem.basket_id);
        }

        if(event.value > 0) {
            this.basketService.updateBasketItem(this.baketItem.basket_id, event.value).subscribe();
        }
    }
}

