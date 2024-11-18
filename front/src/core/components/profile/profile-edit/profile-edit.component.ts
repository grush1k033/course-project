import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    FileUploadModule
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent { 
  value = '';

  onUpload(event: any) {
    console.log(event);
  }
}
