import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'trm-contacts-list-view',
  templateUrl:
`<trm-contacts-list
  [contacts]="contacts$"
  [searching]="searching"
  (searchContacts)="terms$.next($event)"
  (selectContact)="selectContact($event)"
  (addContact)="addContact()">
</trm-contacts-list>`
})
export class ContactsListViewComponent implements OnInit, OnDestroy {
  private contacts$: Observable<Contact[]>;
  private terms$ = new Subject<string>();
  private searching = true;

  constructor(
    private contactsService: ContactsService,
    private router: Router) { }

  ngOnInit() {
    this.contacts$ = this.contactsService.search(
        this.terms$.startWith(''),
        500,
        () => this.searching = true,
        () => this.searching = false);
  }

  ngOnDestroy() {
    this.terms$.complete();
  }

  selectContact(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }

  addContact() {
    this.router.navigate(['/contact', 'new']);
  }
}
