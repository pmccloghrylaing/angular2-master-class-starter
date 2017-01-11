import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, Validator, ValidatorFn, NG_VALIDATORS } from '@angular/forms';

const VALID_EMAIL = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
  ]
})
export class EmailValidator implements Validator {

  validate: ValidatorFn;

  constructor() {
    this.validate = (control: AbstractControl) => {
      return !control.value || this.isValidEmail(control.value) ? null : {
        validateEmail: true
      };
    }
  }

  isValidEmail(email: string) {
    return VALID_EMAIL.test(email);
  }
}
