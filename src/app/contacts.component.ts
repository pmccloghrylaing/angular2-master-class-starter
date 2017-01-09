import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact';
import { LoaderService } from './loader.service';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css'],
  providers: [
    LoaderService
  ]
})
export class ContactsAppComponent implements OnInit {

  constructor(
    public loader: LoaderService,
    router: Router) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() { }
}