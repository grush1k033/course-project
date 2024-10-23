import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = passwordPattern.test(control.value);
    const lengthRegex = /^.{9,}$/;
    const lettersRegex = /^[A-Za-z0-9!@#$%^&*()-_=+{};:'",.<>?`~\\|[\]\/ ]+$/;
    const digitCountRegex = /(?=(.*\d.*\d.*\d))/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()]/;
    const objError = {
      len: !lengthRegex.test(control.value),
      letters: !lettersRegex.test(control.value),
      digitCount: !digitCountRegex.test(control.value),
      uppercase: !uppercaseRegex.test(control.value),
      char: !specialCharRegex.test(control.value),
    }
    return valid ? null : objError;
  }
}
