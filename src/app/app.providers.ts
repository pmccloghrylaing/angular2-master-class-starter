import { Provider } from '@angular/core';
import { API_ENDPOINT_TOKEN } from './app.tokens';
import { ContactsService } from './contacts.service';
import { ContactResolver } from './contact.resolver';
import { LoaderService } from './loader.service';
import { EventBusService } from './event-bus.service';

export const APP_PROVIDERS: Provider[] = [
    { provide: API_ENDPOINT_TOKEN, useValue: 'http://localhost:4201' },
    ContactsService,
    ContactResolver,
    LoaderService,
    EventBusService
];
