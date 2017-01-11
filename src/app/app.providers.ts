import { Provider, Component } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';
import { NG_VALIDATORS } from '@angular/forms';
import { API_ENDPOINT } from './app.tokens';
import { ContactsService } from './contacts.service';
import { ContactResolver } from './contact.resolver';
import { LoaderService } from './loader.service';
import { EventBusService } from './event-bus.service';
import { EmailValidator } from './email.validator';
import { EmailAvailabilityValidator } from './email-availability.validator';
import { NavigateSaveGuard } from './navigateSave.guard';

export const APP_PROVIDERS: Provider[] = [
  { provide: API_ENDPOINT, useValue: 'http://localhost:4201' },
  ContactsService,
  ContactResolver,
  LoaderService,
  EventBusService,
  EmailValidator,
  EmailAvailabilityValidator,
  NavigateSaveGuard
];
