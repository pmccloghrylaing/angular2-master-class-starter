import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'trm-contact-details',
  templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent {
  @Input() contact: Contact;
  @Output() back = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Contact>();
}
