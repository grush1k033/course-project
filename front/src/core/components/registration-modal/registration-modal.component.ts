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
import { FloatLabelModule } from 'primeng/floatlabel';

type TypeForm = FormGroup<{
  username: FormControl<string | null>,
  email: FormControl<string | null>,
  password: FormControl<string | null>,
  repeatPassword: FormControl<string | null>,
}>

interface IPasswordError {
  required: boolean,
  len: boolean,
  letters: boolean,
  digitCount: boolean,
  uppercase: boolean,
  char: boolean
}

@Component({
  selector: 'app-registration-modal',
  standalone: true,
  imports: [PasswordModule, CommonModule, DividerModule, ButtonModule, DialogModule, AvatarModule, ReactiveFormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './registration-modal.component.html',
  styleUrl: './registration-modal.component.scss'
})
export class RegistrationModalComponent {
  form: TypeForm;
  @Input() visible: boolean = false;
  @Output() onHide = new EventEmitter<boolean>()
  @Output() onNavigateToLogin = new EventEmitter<boolean>();

  constructor() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      repeatPassword: new FormControl('', [Validators.required]),
    })
  }

  clearForm() {
    this.form.setValue({
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    });
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  get password() {
    return this.form.controls.password;
  }

  get passwordError():IPasswordError | null {
    return this.form.controls.password.errors as IPasswordError | null;
  }

  get passwordEqual() {
    return this.form.value.password === this.form.value.repeatPassword;
  }

  createAccount() {
    console.log(this.form.getRawValue());
  }

  hideForm() {
    this.onHide.next(false);
    this.clearForm();
  }

  navigateToLogin() {
    this.onHide.next(false);
    this.onNavigateToLogin.next(true);
    this.clearForm();
  }
}
