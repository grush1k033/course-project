import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {LOCAL_STORAGE_KEY_CAR_MARK, LOCAL_STORAGE_KEY_CAR_MODEL} from '../../constants';
import {CarService, IMark, IModel} from '../../service/car.service';
import {LocalStorageService} from '../../service/local-storage.service';
import {Subscription} from 'rxjs';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [DropdownModule,
    FormsModule, NgClass],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit, OnDestroy {
  @Input() isFilter = false;
  subModels: Subscription | null = null;
  models:IModel[] = [];
  selectedModel: string | null = null;
  subMarks: Subscription | null = null;
  marks:IMark[] = [];
  selectedMark: string | null = null;
  loading = false;
  carImage: string | null = null;
  @Output() onChangeGarage = new EventEmitter<boolean>();
  constructor(
    private carService: CarService,
    private localStorage: LocalStorageService,
  ) {
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
      this.onChangeGarage.next(true);
    })
  }

  getModels(id: string) {
    this.loading = true;
    this.subModels = this.carService.getModels(id).subscribe((res) => {
      this.models = res;
      this.loading = false;
      this.onChangeGarage.next(true);
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
}
