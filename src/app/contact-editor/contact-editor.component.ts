import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service'
import { Contact } from '../models/contact'

@Component({
  selector: 'trm-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {
  contact: Contact = <any>{ address: {} };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContact(this.route.snapshot.params['id'])
      .subscribe(contact => this.contact = contact);
  }

  cancel(contact: Contact) {
    this.router.navigateByUrl(`/contact/${contact.id}`)
  }

  save(contact: Contact) {
    this.contactsService.updateContact(contact)
      .subscribe(x => this.router.navigateByUrl(`/contact/${contact.id}`));
  }
}
