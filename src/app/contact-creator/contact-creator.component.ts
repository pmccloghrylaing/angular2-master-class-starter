import { Component, OnInit, OnDestroy, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AsyncValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Contact } from '../models/contact';
import { COUNTRIES_DATA } from '../data/countries-data';
import { EmailValidator } from '../email.validator';
import { EmailAvailabilityValidator } from '../email-availability.validator';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'trm-contact-creator',
  templateUrl: './contact-creator.component.html'
})
export class ContactCreatorComponent implements OnInit, OnDestroy {
  @Output() save = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<Contact>();
  @Output() dirty = new EventEmitter<boolean>();

  private countries = COUNTRIES_DATA;
  private form: FormGroup;
  private dirtySubscription: Subscription;

  constructor(private fb: FormBuilder,
    private contactsService: ContactsService,
    private emailValidator: EmailValidator,
    private emailAvailabilityValidator: EmailAvailabilityValidator) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control('',
        [
          Validators.required,
          Validators.minLength(3)
        ]),
      email: this.fb.control('',
        [
          Validators.required,
          this.emailValidator.validate
        ],
        [
          this.emailAvailabilityValidator.validate
        ]),
      phone: this.fb.control(''),
      birthday: this.fb.control(null),
      website: this.fb.control(''),
      address: this.fb.group({
        street: this.fb.control(''),
        zip: this.fb.control(''),
        city: this.fb.control(''),
        country: this.fb.control('')
      })
    });

    this.dirtySubscription = this.form.statusChanges
      .subscribe(() => this.dirty.emit(this.form.dirty));
  }

  ngOnDestroy() {
    this.dirtySubscription.unsubscribe();
  }

  showErrors(name: string) {
    let control = this.form.get(name);
    return control.invalid && control.touched && control.dirty;
  }

  getErrors(name: string) {
    return this.form.get(name).errors;
  }
}
