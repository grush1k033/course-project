import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService, ICategory} from '../../service/category.service';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import {SearchCategoryPipe} from '../../pipes/search-category.pipe';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AsyncPipe,
    SkeletonModule,
    SearchCategoryPipe
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  categories$: Observable<ICategory[]> | null
  constructor(public categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAllCategory();
  }
}
