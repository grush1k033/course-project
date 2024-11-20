import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { GarageComponent } from '../../garage/garage.component';
import { CategoryService } from '../../../service/category.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    InputNumberModule,
    InputTextModule,
    FileUploadModule,
    DropdownModule,
    GarageComponent,
    AsyncPipe
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent { 
  
  constructor(public categoryService: CategoryService){
    
  }

  onUpload(event: any) {
    
  }

  changeGarage(event: boolean) {

  }


}

