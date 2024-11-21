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
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { AuthService, IUser } from '../../service/auth.service';

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
  imports: [PasswordModule, CommonModule, DividerModule, ButtonModule, DialogModule, AvatarModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, InputIconModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  form: TypeForm;
  @Input() visible: boolean = false;
  @Output() onHide = new EventEmitter<boolean>()
  @Output() onNavigateToRegistration = new EventEmitter<boolean>()

  constructor(private auth: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email], loginValidator(this.auth, true)),
      password: new FormControl('', [Validators.required, passwordValidator()]),
    })

    this.form.controls.email.statusChanges.subscribe(res => {
      console.log(res);
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

  get email() {
    return this.form.controls.email;
  }

  get emailError() : {noExist: boolean} | null {
    return this.email.errors as {noExist: boolean} | null;
  }

  get password() {
    return this.form.controls.password;
  }

  get passwordError():IPasswordError | null {
    return this.form.controls.password.errors as IPasswordError | null;
  }

  login() {
    const  {email, password} = this.form.getRawValue()
    const dto: Omit<IUser, 'name'> = {
      email: email as string,
      password: password as string
    }
    this.auth.login(dto).subscribe(() => {
      this.onHide.next(false);
    })
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
