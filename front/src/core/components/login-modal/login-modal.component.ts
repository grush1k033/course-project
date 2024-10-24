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
  email: FormControl<string | null>,
  password: FormControl<string | null>,
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
  selector: 'app-login-modal',
  standalone: true,
  imports: [PasswordModule, CommonModule, DividerModule, ButtonModule, DialogModule, AvatarModule, ReactiveFormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  form: TypeForm;
  @Input() visible: boolean = false;
  @Output() onHide = new EventEmitter<boolean>()
  @Output() onNavigateToRegistration = new EventEmitter<boolean>()

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
    })
  }

  clearForm() {
    this.form.setValue({
      email: '',
      password: '',
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

  login() {
    console.log(this.form.getRawValue());
  }

  hideForm() {
    this.onHide.next(false);
    this.clearForm();
  }

  navigateToRegistration() {
    this.onHide.next(false);
    this.onNavigateToRegistration.next(true);
    this.clearForm();
  }
}
