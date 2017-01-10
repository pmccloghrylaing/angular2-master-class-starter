import { Routes } from '@angular/router';
import { ContactsListViewComponent } from './contacts-list-view/contacts-list-view.component';
import { ContactDetailsViewComponent } from './contact-details-view/contact-details-view.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactResolver } from './contact.resolver';

export const ContactsAppRoutes: Routes = [
  { path: '', component: ContactsListViewComponent },
  {
    path: 'contact/:id',
    component: ContactDetailsViewComponent,
    resolve: { contact: ContactResolver }
  },
  {
    path: 'contact/:id/edit',
    component: ContactEditorComponent,
    resolve: { contact: ContactResolver }
  }
];
