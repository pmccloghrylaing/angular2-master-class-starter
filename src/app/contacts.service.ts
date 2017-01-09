import { Injectable, Inject, forwardRef } from '@angular/core';
import { CONTACT_DATA } from './data/contact-data';
import { Contact } from './models/contact';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_ENDPOINT_TOKEN } from './app.tokens';

@Injectable()
export class ContactsService {

  constructor(private http: Http,
    @Inject(API_ENDPOINT_TOKEN) private apiEndpoint: string) { }

  getContacts() {
    return this.http.get(`${this.apiEndpoint}/api/contacts`)
      .map(r => r.json())
      .map(d => <Contact[]>d.items)
      .delay(1000);
  }

  getContact(id: string) {
    return this.http.get(`${this.apiEndpoint}/api/contacts/${id}`)
      .map(r => r.json())
      .map(d => <Contact>d.item)
      .delay(1000);
  }
  
  updateContact(contact: Contact) {
    return this.http.put(`${this.apiEndpoint}/api/contacts/${contact.id}`, contact)
      .delay(1000);
  }
}
