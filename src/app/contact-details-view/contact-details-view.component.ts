import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { EventBusService, APP_TITLE_CHANGE } from '../event-bus.service';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../loader.service';

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
  private contact: Contact;
  private contactSubscription: Subscription
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    private contactsService: ContactsService,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.contactSubscription = this.route.params
      .switchMap(p => {
        this.id = p['id'];
        return this.id ?
          this.loader.showLoader(this.contactsService.getContact(this.id)) :
          this.contactsService.getContact('0');
      })
      .subscribe(contact => {
        this.contact = contact;
        this.eventBus.emit(APP_TITLE_CHANGE, contact.name);
      });
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

  edit(contact: Contact) {
    this.router.navigate(['/contact', contact.id, 'edit']);
  }

  back() {
    this.router.navigate(['/']);
  }
}