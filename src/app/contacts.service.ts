import { Injectable } from '@angular/core';
import { CONTACT_DATA } from './data/contact-data';
import { Contact } from './models/contact';

@Injectable()
export class ContactsService {

  constructor() { }

  getContacts(): Contact[] {
    return CONTACT_DATA;
  }

  getContact(id: string): Contact {
    return CONTACT_DATA.find(c => c.id.toString() === id);
  }
}
