import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[];
  
  constructor(
    private loader: LoaderService,
    private contactsService: ContactsService) {}

  ngOnInit() {
    var contactsObs = this.contactsService.getContacts();
    this.loader.showLoader(contactsObs);
    contactsObs.subscribe(contacts => this.contacts = contacts);
  }
}
