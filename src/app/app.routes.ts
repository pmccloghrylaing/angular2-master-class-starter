import { Routes } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactResolver } from './contact.resolver';

export const ContactsAppRoutes: Routes = [
  { path: '', component: ContactsListComponent },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: ContactResolver }
  },
  {
    path: 'contact/:id/edit',
    component: ContactEditorComponent,
    resolve: { contact: ContactResolver }
  }
];
