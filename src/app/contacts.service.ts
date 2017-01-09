import { Injectable } from '@angular/core';
import { CONTACT_DATA } from './data/contact-data';
import { Contact } from './models/contact';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const API_ENDPOINT = 'http://localhost:4201'

@Injectable()
export class ContactsService {

  constructor(private http: Http) { }

  getContacts() {
    return this.http.get(`${API_ENDPOINT}/api/contacts`)
      .map(r => r.json())
      .map(d => <Contact[]>d.items)
      .delay(1000);
  }

  getContact(id: string) {
    return this.http.get(`${API_ENDPOINT}/api/contacts/${id}`)
      .map(r => r.json())
      .map(d => <Contact>d.item)
      .delay(1000);
  }
  
  updateContact(contact: Contact) {
    return this.http.put(`${API_ENDPOINT}/api/contacts/${contact.id}`, contact)
      .delay(1000);
  }
}
