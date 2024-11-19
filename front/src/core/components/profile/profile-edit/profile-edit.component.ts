import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { passwordValidator } from '../../../validators';
export type ProfIleForm = FormGroup<{
  username: FormControl<string | null>
  email: FormControl<string | null>
  password: FormControl<string | null>
  passwordRepeat: FormControl<string | null>
}>

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    FileUploadModule,
    PasswordModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent { 
  form: ProfIleForm;
  constructor() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      passwordRepeat: new FormControl('', [Validators.required])
    })
  }


  onUpload(event: any) {
    console.log(event);
  }

  submitForm() {
    console.log(this.form.getRawValue());
  }

  get passwordEqual() {
    return this.form.value.password === this.form.value.passwordRepeat;
  }
}
