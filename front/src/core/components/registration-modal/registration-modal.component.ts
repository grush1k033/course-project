import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

type TypeForm = FormGroup<{
  username: FormControl<string | null>,
  password: FormControl<string | null>,
  repeatPassword: FormControl<string | null>,
}>

@Component({
  selector: 'app-registration-modal',
  standalone: true,
  imports: [PasswordModule, CommonModule, DividerModule, ButtonModule, DialogModule, AvatarModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './registration-modal.component.html',
  styleUrl: './registration-modal.component.scss'
})
export class RegistrationModalComponent {
  form: TypeForm;
  @Input() visible: boolean = false;
  @Output() onHide = new EventEmitter<boolean>()

  constructor() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      repeatPassword: new FormControl('', [Validators.required]),
    })
  }

  get passwordEqual() {
    return this.form.value.password === this.form.value.repeatPassword;
  }

  createAccount() {
    console.log(this.form.getRawValue());
  }
}
