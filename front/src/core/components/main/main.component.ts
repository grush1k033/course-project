import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService, ICategory} from '../../service/category.service';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import {SearchCategoryPipe} from '../../pipes/search-category.pipe';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {CarService} from '../../service/car.service';

export interface IModel {
  id: number,
  name: string,
  cars_marks_id: number
}

export interface IMark {
  id: number,
  name: string
}
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
  selectedModel: IModel = this.models[0];
  subMarks: Subscription | null = null;
  marks:IMark[] = [];
  selectedMark: IMark = this.marks[0];
  loading = true;
  loadingObj = {name: 'Loading...'}
  constructor(
    public categoryService: CategoryService,
    private carService: CarService
  ) {
    this.categories$ = this.categoryService.getAllCategory();
  }

  ngOnInit(): void {
    this.getMarks();
  }



  getModels(id: string) {
    this.loading = true;
    this.subModels = this.carService.getModels(id).subscribe((res) => {
      this.models = res;
      this.selectedModel = res[0];
      this.loading = false;
    })
  }

  getMarks() {
    this.subMarks = this.carService.getAllMarks().subscribe((res)=> {
      this.marks = res;
      this.selectedMark = res[0];
      const id = res[0].id.toString();
      this.getModels(id);
    })
  }

  ngOnDestroy(): void {
    this.subModels?.unsubscribe();
    this.subMarks?.unsubscribe();
  }

  onChangeMark(event: DropdownChangeEvent) {
    const id: string = event.value.id.toString();
    this.getModels(id);
  }
}
