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
  private validationResult$: Observable<{}>;
  private currentControl: AbstractControl;

  validate: AsyncValidatorFn;

  constructor(emailValidator: EmailValidator,
    contactsService: ContactsService) {

    this.validate = (control: AbstractControl) => {
      if (!control.value) {
        return Observable.of(null);
      }

      if (this.currentControl != control || this.validationResult$ == null) {
        this.currentControl = control;
        this.validationResult$ = control.valueChanges
          .debounceTime(400)
          .distinctUntilChanged()
          .switchMap(() => {
            if (!emailValidator.isValidEmail(control.value)) {
              return Observable.of(null);
            }
            return contactsService.isEmailAvailable(control.value)
              .map(available => available ? null : {
                checkEmailAsync: true
              });
          })
          .share();
      }

      return this.validationResult$;
    }
  }
}
