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
  (back)="back()"
  [class.hide-on-small-only]="id == null">
</trm-contact-details>`
})
export class ContactDetailsViewComponent implements OnInit, OnDestroy {
  private contact: Contact;
  private subscriptions: Subscription[]
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.subscriptions = [
      this.route.params
        .subscribe(p => this.id = p['id']),
      this.route.data
        .map(data => data['contact'])
        .subscribe(contact => {
          this.contact = contact;
          if (this.id) {
            this.eventBus.emit(APP_TITLE_CHANGE, contact.name);
          }
        })
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  edit(contact: Contact) {
    this.router.navigate(['/contact', contact.id, 'edit']);
  }

  back() {
    this.router.navigate(['/']);
  }
}