import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AutoPartService, IAutoPart} from '../../service/auto-part.service';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {AutoPartComponent} from '../auto-part/auto-part.component';
import {SearchPipe} from '../../pipes/search.pipe';
import {AsyncPipe, NgIf} from '@angular/common';
import {FiltersComponent} from '../filters/filters.component';
import {PricePipe} from '../../pipes/price.pipe';
import {FavouritePipe} from '../../pipes/favourite.pipe';
import {GarageComponent} from '../garage/garage.component';

@Component({
  selector: 'app-auto-part-items',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    AutoPartComponent,
    SearchPipe,
    AsyncPipe,
    NgIf,
    FiltersComponent,
    PricePipe,
    FavouritePipe,
    GarageComponent
  ],
  templateUrl: './auto-part-items.component.html',
  styleUrl: './auto-part-items.component.scss'
})
export class AutoPartItemsComponent implements OnInit{
  autoParts: IAutoPart[] = [];
  id: string | null = null;
  rangeValues: number[] = [0, 3000];
  favourite: string = '2';
  constructor(
    private activatedRoute: ActivatedRoute,
    public autoPartService: AutoPartService
  ) {
    this.id = (this.activatedRoute.snapshot.params as {id: string}).id;
  }


  ngOnInit(): void {
    this.getAutoPart(this.id as string);
  }

  getAutoPart(id: string) {
    this.autoPartService.getAutoPartByCategory(id).subscribe(res => {
      this.autoParts = res;
    })
  }

  changeRangeValue(rangeValues: number[]) {
    this.rangeValues = rangeValues;
  }

  changeFavourite(key: string) {
    this.favourite = key;
  }

  changeGarage(event: boolean) {
    if(event) {
      this.getAutoPart(this.id as string)
    }
  }

  updateFavourite(event: boolean) {
    if(event) {
      this.getAutoPart(this.id as string);
    }
  }
}



