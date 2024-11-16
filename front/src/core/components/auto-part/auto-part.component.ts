import {
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy, OnInit,
  Output,
} from '@angular/core';
import {AutoPartService, IAutoPart} from '../../service/auto-part.service';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {VisibleImgDirective} from '../../directive/visible-img.directive';
import {TooltipModule} from 'primeng/tooltip';
import {BasketService, IBasket} from '../../service/basket.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auto-part',
  standalone: true,
  imports: [DropdownModule, FormsModule, Button, VisibleImgDirective, TooltipModule],
  templateUrl: './auto-part.component.html',
  styleUrl: './auto-part.component.scss'
})
export class AutoPartComponent implements OnInit, OnDestroy, OnChanges {
  @Input() item: IAutoPart | null = null;
  @Output() onUpdateFavourite = new EventEmitter<boolean>();
  selectAmount: number = 1;
  likeSrc = "assets/icons/like-empty.svg";
  basket: IBasket[] | null = null;
  basketSub: Subscription | null = null;


  constructor(
    private autoPartService: AutoPartService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.basketSubscription();
  }

  ngOnDestroy(): void {
    this.basketSub?.unsubscribe();
  }

  ngOnChanges() {
    this.likeSrc = (this.item && this.item?.favourites)
      ? "assets/icons/like.svg"
      : "assets/icons/like-empty.svg";
  }

  basketSubscription() {
    this.basketSub = this.basketService.basket$.subscribe(res => {
      if (res.length) {
        this.basket = res
        this.selectAmount = this.countOfAutoPart;
      }
    })
  }


  get isInBasket() {
    const autoPart = this.basket?.find(({AutopartId}) => AutopartId === this.item?.id);
    return !!autoPart;
  }

  get countOfAutoPart() {
    const autoParts = this.basket?.filter(({AutopartId}) => AutopartId === this.item?.id);
    return autoParts?.length || 1;
  }


  getAmount(amount: number) {
    const array: number[] = [];
    for (let i = 1; i <= amount; i++) {
      array.push(i);
    }
    return array;
  }

  getPrice(price: string, discount: number) {
    return (+price * (1 - ((discount as number) / 100))).toFixed(2);
  }

  updateFavourite(autoPart: IAutoPart) {
    const {id, favourites} = autoPart;
    this.autoPartService.updateAutoPart({favourite: !favourites}, id)
      .subscribe(() => {
        this.onUpdateFavourite.next(true);
      });
  }

  addToBasket(id: number) {
    let amount = this.selectAmount;
    this.basketService.addBasket(id, amount).subscribe(() => {
      this.basketService.getBasket().subscribe();
    })
  }
}
