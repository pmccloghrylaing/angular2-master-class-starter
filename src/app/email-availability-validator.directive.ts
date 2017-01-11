import { Directive, forwardRef } from '@angular/core';
import { FormControl, Validator, ValidatorFn, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ContactsService } from './contacts.service';
import { validateEmail } from './email-validator.directive';

@Directive({
  selector: '[checkEmailAsync][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => EmailAvailabilityValidatorDirective), multi: true }
  ]
})
export class EmailAvailabilityValidatorDirective {

  validate: AsyncValidatorFn;

  constructor(contactsService: ContactsService) {
    this.validate = checkEmailAvailability(contactsService);
  }
}

export function checkEmailAvailability(contactsService: ContactsService): AsyncValidatorFn {
  return control => {
    if (!control.value || validateEmail(control)) {
      return Observable.of(null);
    }

    return contactsService.isEmailAvailable(control.value)
      .map(x => x.error ? {
        checkEmailAsync: true
      } : null);
  }
}
