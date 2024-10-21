import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SliderChangeEvent, SliderModule} from 'primeng/slider';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from 'primeng/paginator';
import {Subscription} from 'rxjs';
import {RadioButtonClickEvent, RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberInputEvent} from 'primeng/inputnumber';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    SliderModule, FormsModule, PaginatorModule, ReactiveFormsModule, RadioButtonModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit{
  rangeValues: number[] = [0, 100];
  values: number[] = [this.rangeValues[0], this.rangeValues[1] * 30];
  @Output() onRangeValueChange = new EventEmitter<number[]>();
  @Output() onFavouriteChange = new EventEmitter<string>()

  selectedFavorite: {name: string, key: string} = <{name: string, key: string}>{}
  favorites: {name: string, key: string}[] = [
    { name: 'Все', key: '2' },
    { name: 'В избранном', key: '1' },
    { name: 'Не в избранном', key: '0' },
  ]
  constructor() {}

  ngOnInit() {
    this.selectedFavorite = this.favorites[0];
  }

  changePrice(event: SliderChangeEvent) {
    const [min, max] = event.values as number[];
    this.values = [min* 30, max* 30];
    this.onRangeValueChange.next(this.values);
  }

  changeFavourite() {
    this.onFavouriteChange.next(this.selectedFavorite.key);
  }

  changeMin(event: InputNumberInputEvent) {
    const value = event.value as number;
    if(value >= 0 && value <=3000) {
      this.values = [value, this.values[1]];
      this.rangeValues = [this.values[0] / 30, this.rangeValues[1]];
      this.onRangeValueChange.next(this.values);
    }
  }

  changeMax(event: InputNumberInputEvent) {
    const value = event.value as number;
    if(value >= 0 && value <=3000) {
      this.values = [this.values[0], value];
      this.rangeValues = [this.rangeValues[0], this.values[1]/30];
      this.onRangeValueChange.next(this.values);
    }
  }
}
