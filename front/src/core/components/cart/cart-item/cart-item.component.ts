import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
export class CartItemComponent implements AfterViewInit {
    @Input() baketItem: IBasketItems = <IBasketItems>{}
    @Output() onDelete = new EventEmitter<number>()
    @Output() onUpdate = new EventEmitter()
    likeSrc = "assets/icons/like-empty.svg";
    trashSrc = "assets/icons/trash.svg"
    newPrice = '';
    amountValue = 0;


    constructor(private basketService: BasketService) {

    }

    ngAfterViewInit(): void {
        this.newPrice = this.baketItem.price;
        this.amountValue = this.baketItem.countAutoparts || 0;
        this.newPrice = this.basketService.getPrice(this.baketItem.price, this.baketItem.discount);
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
            this.basketService.updateBasketItem(this.baketItem.basket_id, event.value).subscribe(() =>{
                this.onUpdate.emit();
            });
        }
    }
}

