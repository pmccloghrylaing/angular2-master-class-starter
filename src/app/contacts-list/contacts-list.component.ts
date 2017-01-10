import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent {
  @Input() contacts: Observable<Contact[]>;
  @Input() searching = false;
  @Output() searchContacts = new EventEmitter<string>();
  @Output() selectContact = new EventEmitter<Contact>();

  constructor() { }
}
