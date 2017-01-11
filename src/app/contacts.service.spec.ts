/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { ContactsService } from './contacts.service';

describe('Service: Contacts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        ContactsService,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend, options) => new Http(backend, options)
        }
      ]
    });
  });

  it('should ...', inject([ContactsService], (service: ContactsService) => {
    expect(service).toBeTruthy();
  }));
});
