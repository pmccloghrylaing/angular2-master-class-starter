import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  private contacts$: Observable<Contact[]>;
  private terms$ = new Subject<string>();
  private searching = true;

  constructor(
    private contactsService: ContactsService) { }

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
}
