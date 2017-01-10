import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service'
import { LoaderService } from '../loader.service';
import { EventBusService } from '../event-bus.service';
import { Contact } from '../models/contact'

@Component({
  selector: 'trm-contact-editor',
  templateUrl: './contact-editor.component.html'
})
export class ContactEditorComponent implements OnInit {
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private loader: LoaderService,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.contact = this.route.snapshot.data['contact'];

    this.eventBus.emit('appTitleChange', `Edit: ${this.contact.name}`)
  }

  cancel(contact: Contact) {
    this.router.navigateByUrl(`/contact/${contact.id}`)
  }

  save(contact: Contact) {
    var saveObs = this.contactsService.updateContact(contact);
    this.loader.showLoader(saveObs);
    saveObs.subscribe(x => this.router.navigateByUrl(`/contact/${contact.id}`));
  }
}
