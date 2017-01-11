import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, Validator, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ContactsService } from './contacts.service';
import { EmailValidator } from './email.validator';

@Directive({
  selector: '[checkEmailAsync][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => EmailAvailabilityValidator), multi: true }
  ]
})
export class EmailAvailabilityValidator implements Validator {
  private controlMap = new Map<AbstractControl, Observable<{}>>();

  validate: AsyncValidatorFn;

  constructor(emailValidator: EmailValidator,
    contactsService: ContactsService) {

    this.validate = (control: AbstractControl) => {
      if (!control.value) {
        return Observable.of(null);
      }

      if (!this.controlMap.has(control)) {
        this.controlMap.set(control,
          control.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(() => {
              if (!emailValidator.isValidEmail(control.value)) {
                return Observable.of(null);
              }
              return contactsService.isEmailAvailable(control.value)
                .map(x => x.error ? {
                  checkEmailAsync: true
                } : null);
            })
            .share());
      }

      return this.controlMap.get(control).first();
    }
  }
}
