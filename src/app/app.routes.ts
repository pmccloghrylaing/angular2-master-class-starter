import { Route } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';

export const ContactsAppRoutes: Route[] = [
  {
    path: '',
    component: ContactsListComponent
  }
];
