import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'trm-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.contact = this.contactsService.getContact(id);
  }

}
