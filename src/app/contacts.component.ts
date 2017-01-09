import { Component } from '@angular/core';
import { Contact } from './models/contact';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent {
  contacts: Contact[] = [
    {
      id: 6,
      name: 'Diana Ellis',
      email: '',
      phone: '',
      birthday: '',
      website: '',
      image: '/assets/images/6.jpg',
      address: {
        street: '6554 park lane',
        zip: '43378',
        city: 'Rush',
        country: 'United States'
      }
    }
  ];
}
