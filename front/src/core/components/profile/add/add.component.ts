import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {FileSelectEvent, FileUploadEvent, FileUploadModule} from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { GarageComponent } from '../../garage/garage.component';
import { CategoryService } from '../../../service/category.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {BadgeModule} from 'primeng/badge';
import {ProfileService} from '../../../service/profile.service';


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
    CommonModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [MessageService]
})
export class AddComponent {

  files: File[] = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService,
    public  categoryService: CategoryService,
    private profileService: ProfileService
  ) {}

  choose(event: any, callback: any) {
    callback();
  }

  onRemoveTemplatingFile(event:any, file: any, removeFileCallback: any, index: any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear:any) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
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

  changeGarage($event: boolean) {

  }


}

