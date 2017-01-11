import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

const VALID_EMAIL = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }]
})
export class EmailValidatorDirective { }

export function validateEmail(c: AbstractControl) {
  return !c.value || VALID_EMAIL.test(c.value) ? null : {
    validateEmail: true
  };
}
