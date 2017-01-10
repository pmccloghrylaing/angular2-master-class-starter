import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { EventBusService, APP_TITLE_CHANGE } from '../event-bus.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'trm-contact-details-view',
  template:
`<trm-contact-details
  [contact]="contact"
  (edit)="edit($event)"
  (back)="back()">
</trm-contact-details>`
})
export class ContactDetailsViewComponent implements OnInit, OnDestroy {
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private eventBus: EventBusService) { }

private eventSubscription: Subscription;
  ngOnInit() {
    this.contact = this.route.snapshot.data['contact'];

    this.eventSubscription = this.eventBus
      .observe(APP_TITLE_CHANGE, true)
      .subscribe(x => console.log(x));

    this.eventBus.emit(APP_TITLE_CHANGE, this.contact.name);
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  edit(contact: Contact) {
    this.router.navigate(['/contact', contact.id, 'edit']);
  }

  back() {
    this.router.navigate(['/']);
  }
}