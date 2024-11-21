import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginValidator, passwordValidator } from '../../validators';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import {AuthService} from '../../service/auth.service';

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
  imports: [PasswordModule, CommonModule, DividerModule, ButtonModule, DialogModule, AvatarModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, InputIconModule],
  templateUrl: './registration-modal.component.html',
  styleUrl: './registration-modal.component.scss'
})
export class RegistrationModalComponent {
  form: TypeForm;
  @Input() visible: boolean = false;
  @Output() onHide = new EventEmitter<boolean>()
  @Output() onNavigateToLogin = new EventEmitter<boolean>();

  constructor(private auth: AuthService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email], [loginValidator(this.auth)]),
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

  public get email() {
    return this.form.controls.email;
  }

  get emailError() : {isExist: boolean} | null {
    return this.email.errors as {isExist: boolean} | null;
  }

  get passwordError():IPasswordError | null {
    return this.password.errors as IPasswordError | null;
  }

  get passwordEqual() {
    return this.form.value.password === this.form.value.repeatPassword;
  }

  createAccount() {
    this.auth.register({
      name: this.form.getRawValue().username as string,
      email: this.form.getRawValue().email as string,
      password: this.form.getRawValue().password as string
    }).subscribe(() => {
      this.onHide.next(false)
    })
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
