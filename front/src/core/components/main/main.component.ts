import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService, ICategory} from '../../service/category.service';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import {SearchCategoryPipe} from '../../pipes/search-category.pipe';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {CarService, IMark, IModel} from '../../service/car.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../service/local-storage.service';
import {LOCAL_STORAGE_KEY_CAR_MARK, LOCAL_STORAGE_KEY_CAR_MODEL} from '../../constants';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AsyncPipe,
    SkeletonModule,
    SearchCategoryPipe,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy{
  categories$: Observable<ICategory[]> | null;
  subModels: Subscription | null = null;
  models:IModel[] = [];
  selectedModel: string | null = null;
  subMarks: Subscription | null = null;
  marks:IMark[] = [];
  selectedMark: string | null = null;
  loading = false;
  carImage: string | null = null;
  constructor(
    public categoryService: CategoryService,
    private carService: CarService,
    private router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {
    this.categories$ = this.categoryService.getAllCategory();
    this.selectedModel = this.localStorage.get(LOCAL_STORAGE_KEY_CAR_MODEL) || null;
    this.selectedMark = this.localStorage.get(LOCAL_STORAGE_KEY_CAR_MARK) || null;
  }

  ngOnInit(): void {
    this.getMarks();
    if(this.selectedMark) this.getCar();
  }

  getCar() {
    this.carService.getCar().subscribe((res) => {
      this.carImage = res?.image;
    })
  }

  getModels(id: string) {
    this.loading = true;
    this.subModels = this.carService.getModels(id).subscribe((res) => {
      this.models = res;
      this.loading = false;
    })
  }

  getMarks() {
    this.subMarks = this.carService.getAllMarks().subscribe((res)=> {
      this.marks = res;
      const id = this.selectedMark;
      if(id) {
        this.getModels(id);
      }
    })
  }

  ngOnDestroy(): void {
    this.subModels?.unsubscribe();
    this.subMarks?.unsubscribe();
  }

  onChangeMark(event: DropdownChangeEvent) {
    this.selectedModel = null;
    this.localStorage.set(LOCAL_STORAGE_KEY_CAR_MODEL, null);
    this.carImage = null;
    this.localStorage.set(LOCAL_STORAGE_KEY_CAR_MARK, event.value);
    const id: string = event.value.toString();
    this.getModels(id);
  }
  onChangeModel(event: DropdownChangeEvent) {
    this.localStorage.set(LOCAL_STORAGE_KEY_CAR_MODEL, event.value);
    this.getCar();
  }

  navigateToAutoPart(id: number) {
    this.router.navigate(["auto-part", id]).then()
  }
}
