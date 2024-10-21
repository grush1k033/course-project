import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService, ICategory} from '../../service/category.service';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import {SearchPipe} from '../../pipes/search.pipe';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {CarService, IMark, IModel} from '../../service/car.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../service/local-storage.service';
import {LOCAL_STORAGE_KEY_CAR_MARK, LOCAL_STORAGE_KEY_CAR_MODEL} from '../../constants';
import {HttpClient} from '@angular/common/http';
import {GarageComponent} from '../garage/garage.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AsyncPipe,
    SkeletonModule,
    SearchPipe,
    DropdownModule,
    FormsModule,
    GarageComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent{
  categories$: Observable<ICategory[]> | null;
  constructor(
    public categoryService: CategoryService,
    private router: Router,
  ) {
    this.categories$ = this.categoryService.getAllCategory();
  }

  navigateToAutoPart(id: number) {
    this.router.navigate(["auto-part", id]).then()
  }
}
