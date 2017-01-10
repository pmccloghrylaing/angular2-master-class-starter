import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact';
import { LoaderService } from './loader.service';
import { EventBusService, APP_TITLE_CHANGE } from './event-bus.service';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css']
})
export class ContactsAppComponent implements OnInit {
  private title: string;

  constructor(
    private eventBus: EventBusService,
    private loader: LoaderService,
    private router: Router) {
  }

  ngOnInit() {
    this.eventBus.observe<string>(APP_TITLE_CHANGE)
      .subscribe(title => this.title = title);

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}