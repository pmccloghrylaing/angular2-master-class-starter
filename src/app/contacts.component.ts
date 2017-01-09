import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact';
import { ContactsService } from './contacts.service';
import { ContactResolver } from './contact.resolver';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css'],
  providers: [
    ContactsService,
    ContactResolver
  ]
})
export class ContactsAppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}
