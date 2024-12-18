import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AutoPartService, IAutoPart} from '../../service/auto-part.service';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {AutoPartComponent} from '../auto-part/auto-part.component';
import {SearchPipe} from '../../pipes/search.pipe';
import {AsyncPipe} from '@angular/common';
import {FiltersComponent} from '../filters/filters.component';
import {PricePipe} from '../../pipes/price.pipe';
import {FavouritePipe} from '../../pipes/favourite.pipe';
import {GarageComponent} from '../garage/garage.component';
import { ProfileService } from '../../service/profile.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-auto-part-items',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    AutoPartComponent,
    SearchPipe,
    AsyncPipe,
    FiltersComponent,
    PricePipe,
    FavouritePipe,
    GarageComponent
  ],
  templateUrl: './auto-part-items.component.html',
  styleUrl: './auto-part-items.component.scss'
})
export class AutoPartItemsComponent {
  status = true;
  autoParts: IAutoPart[] = [];
  id: string | null = null;
  rangeValues: number[] = [0, 3000];
  favourite: string = '2';
  isAdmin = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    public autoPartService: AutoPartService,
    public userService: ProfileService,
  ) {
    this.id = (this.activatedRoute.snapshot.params as {id: string}).id;
    this.userService.getUser().subscribe(user => {
      this.isAdmin = !!user.isAdmin;
    })
  }

  getAutoPart(id: string) {
    this.status = true;
    this.autoPartService.getAutoPartByCategory(id, true)
      .pipe(
        finalize(() => { this.status = false})
      )
      .subscribe(res => {
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



