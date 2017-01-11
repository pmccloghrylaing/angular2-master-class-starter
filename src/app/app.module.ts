import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import { ContactsAppComponent } from './contacts.component';
import { ContactsHeaderComponent } from './contacts-header';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsAppRoutes } from './app.routes';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { APP_PROVIDERS } from './app.providers';
import { ContactDetailsViewComponent } from './contact-details-view/contact-details-view.component';
import { ContactsListViewComponent } from './contacts-list-view/contacts-list-view.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { ContactCreatorComponent } from './contact-creator/contact-creator.component';
import { ContactCreatorViewComponent } from './contact-creator-view/contact-creator-view.component';
import { ErrorsPipe } from './errors.pipe';
import { EmailValidatorDirective } from './email-validator.directive';
import { EmailAvailabilityValidatorDirective } from './email-availability-validator.directive';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsHeaderComponent,
    ContactsListComponent,
    ContactDetailsComponent,
    ContactEditorComponent,
    ContactDetailsViewComponent,
    ContactsListViewComponent,
    TabsComponent,
    TabComponent,
    ContactCreatorComponent,
    ContactCreatorViewComponent,
    ErrorsPipe,
    EmailValidatorDirective,
    EmailAvailabilityValidatorDirective,
    ContactsDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ContactsAppRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [ContactsAppComponent],
  providers: APP_PROVIDERS
})
export class ContactsModule {

}
