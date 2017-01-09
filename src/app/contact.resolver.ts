import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Contact } from './models/contact';
import { ContactsService } from './contacts.service';

@Injectable()
export class ContactResolver implements Resolve<Contact> {

  constructor(private contactsService: ContactsService) {
    debugger;
   }

  resolve(route: ActivatedRouteSnapshot) {
    debugger;
    return this.contactsService.getContact(route.params['id']);
  }
}
