import { Routes } from '@angular/router';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { ContactDetailsViewComponent } from './contact-details-view/contact-details-view.component';
import { ContactCreatorViewComponent } from './contact-creator-view/contact-creator-view.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactResolver } from './contact.resolver';
import { NavigateSaveGuard } from './navigateSave.guard';

export const ContactsAppRoutes: Routes = [
  {
    path: '',
    component: ContactsDashboardComponent,
    children: [
      {
        path: '',
        component: ContactDetailsViewComponent,
        resolve: { contact: ContactResolver }
      },
      {
        path: 'contact/new',
        component: ContactCreatorViewComponent,
        canDeactivate: [NavigateSaveGuard]
      },
      {
        path: 'contact/:id',
        component: ContactDetailsViewComponent,
        resolve: { contact: ContactResolver }
      },
      {
        path: 'contact/:id/edit',
        component: ContactEditorComponent,
        resolve: { contact: ContactResolver },
        canDeactivate: [NavigateSaveGuard]
      }
    ]
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  }
];
