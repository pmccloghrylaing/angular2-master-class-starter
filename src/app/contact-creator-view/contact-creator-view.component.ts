import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { LoaderService } from '../loader.service';
import { EventBusService, APP_TITLE_CHANGE } from '../event-bus.service';
import { SaveComponent } from '../navigateSave.guard';

@Component({
  selector: 'trm-contact-creator-view',
  template:
`<trm-contact-creator
  (save)="save($event)"
  (cancel)="navigateToRoot()"
  (dirty)="saved = !$event">
</trm-contact-creator>`
})
export class ContactCreatorViewComponent implements OnInit, SaveComponent {
  saved = true;

  constructor(private contactsService: ContactsService,
    private router: Router,
    private loader: LoaderService,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.eventBus.emit(APP_TITLE_CHANGE, 'New Contact');
  }

  save(contact: Contact) {
    this.loader.showLoader(
      this.contactsService
        .addContact(contact))
      .subscribe(() => {
        this.saved = true;
        this.navigateToRoot();
      });
  }

  navigateToRoot() {
    this.router.navigate(['/']);
  }
}
