import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {FileUploadModule} from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { GarageComponent } from '../../garage/garage.component';
import {CategoryService, ICategory} from '../../../service/category.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {BadgeModule} from 'primeng/badge';
import {ProfileService} from '../../../service/profile.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../service/local-storage.service';
import {LOCAL_STORAGE_KEY_CAR_MARK, LOCAL_STORAGE_KEY_CAR_MODEL} from '../../../constants';
import {AutoPartService, IAutoPart} from '../../../service/auto-part.service';
import {ActivatedRoute} from '@angular/router';

export type Form  = FormGroup<{
  mark: FormControl<string | null>
  model: FormControl<string | null>
  name: FormControl<string | null>,
  description: FormControl<string | null>,
  category: FormControl<number | null>,
  price: FormControl<number | null>,
  amount: FormControl<number | null>,
  discount: FormControl<number | null>,
  image: FormControl<File | null>
}>


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    InputNumberModule,
    InputTextModule,
    FileUploadModule,
    DropdownModule,
    GarageComponent,
    AsyncPipe,
    InputTextareaModule,
    TooltipModule,
    ToastModule,
    BadgeModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [MessageService]
})
export class AddComponent {
  form: Form;

  files: File[] = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;

  categories: ICategory[] = [];

  id: string;

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService,
    public  categoryService: CategoryService,
    private profileService: ProfileService,
    private localStorage: LocalStorageService,
    private autoPartService: AutoPartService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getCategories();
    this.id = (this.activatedRoute.snapshot.queryParams as {id: string}).id;
    this.form = new FormGroup({
      mark: new FormControl("", Validators.required),
      model: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      category: new FormControl(0, Validators.required),
      price: new FormControl(0, Validators.required),
      amount: new FormControl(0, Validators.required),
      discount: new FormControl(0),
      image: new FormControl(<File>{})
    })

    if(this.id) {
      this.autoPartService.getAutoPartById(this.id).subscribe(item => {
        this.setDefaultForm(item)
      })
    }
  }

  setDefaultForm(item?: IAutoPart) {
    this.form.setValue({
      mark: item ? this.localStorage.get(LOCAL_STORAGE_KEY_CAR_MARK) : "",
      model: item ? item.cars_id.toString() : "",
      name: item ? item.name : "",
      description: item ? item.description : "",
      category: item ? item.category_id : -1,
      price: item ? +item.price : 0,
      amount: item ? item.amount : 0,
      discount: item ? item.discount : 0,
      image: <File>{}
    })
  }

  submitForm(edit: boolean = false) {
    const form = this.form.getRawValue();
    const dto: Omit<IAutoPart, 'id'> = {
      name: form.name as string,
      description: form.description as string,
      price: (form.price as number).toString(),
      amount: form.amount as number,
      discount: form.discount as number,
      image: form.image?.name ? 'form.image?.name' : 'null',
      category_id: form.category as number,
      cars_id: +(form.model as string),
      favourites: 0,
    }

    if(!edit) {
      this.autoPartService.addAutoPart(dto).subscribe(() => {
        this.setDefaultForm();
        this.form.markAsUntouched()
        this.form.markAsPristine()
      })
    } else {
      this.autoPartService.updateAutoPartAll(dto, +this.id).subscribe(() => {
        this.setDefaultForm();
        this.form.markAsUntouched()
        this.form.markAsPristine()
      })
    }


  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories = res;
    })
  }

  choose(event: any, callback: any) {
    callback();
  }

  changeGarage() {
    this.form.controls.mark.setValue(this.localStorage.get(LOCAL_STORAGE_KEY_CAR_MARK))
    this.form.controls.model.setValue(this.localStorage.get(LOCAL_STORAGE_KEY_CAR_MODEL))
  }

  onRemoveTemplatingFile(event:any, file: any, removeFileCallback: any, index: any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onTemplatedUpload() {
    const file = this.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.addFile(formData);
  }

  addFile(data: FormData) {
    console.log(data);
    this.profileService.addFile(data).subscribe(res=> {
      console.log(res);
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    })
  }
  onSelectedFiles(event: any) {
    this.files = event.currentFiles;
    this.form.controls.image.setValue(this.files[0]);
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file['size']));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: any) {
    callback();
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes?.[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes?.[i]}`;
  }
}

