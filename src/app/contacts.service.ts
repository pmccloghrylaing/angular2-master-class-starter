import { Injectable, Inject, forwardRef } from '@angular/core';
import { CONTACT_DATA } from './data/contact-data';
import { Contact } from './models/contact';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_ENDPOINT_TOKEN } from './app.tokens';

@Injectable()
export class ContactsService {

  constructor(private http: Http,
    @Inject(API_ENDPOINT_TOKEN) private apiEndpoint: string) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get(`${this.apiEndpoint}/api/contacts`)
      .map(r => r.json())
      .map(d => <Contact[]>d.items)
      .delay(5000);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get(`${this.apiEndpoint}/api/contacts/${id}`)
      .map(r => r.json())
      .map(d => <Contact>d.item)
      .delay(1000);
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(`${this.apiEndpoint}/api/contacts/${contact.id}`, contact)
      .delay(1000);
  }

  private rawSearch(term: string): Observable<Contact[]> {
    return this.http.get(`${this.apiEndpoint}/api/search?text=${term}`)
      .map(r => r.json())
      .map(d => d.items)
      .delay(1000);
  }

  search(terms$: Observable<string>, debounceMs = 400,
    onRequest?: () => void,
    onResponse?: () => void): Observable<Contact[]> {
    var lastResults: Contact[] = [];
    return terms$.debounceTime(debounceMs)
      .map(t => (t || '').trim())
      .distinctUntilChanged()
      .do(x => onRequest && onRequest())
      .switchMap(term => Observable.of(
        this.getCurrentMatches(lastResults, term),
        term ?
          this.rawSearch(term) :
          this.getContacts()))
      .flatMap(x => x)
      .do(x => {
        lastResults = x;
        onResponse && onResponse();
      });
  }

  private getCurrentMatches(current: Contact[], term): Observable<Contact[]> {
    return Observable.of(
      current.filter(c =>
        c.name.toLowerCase()
          .indexOf(term.toLowerCase()) !== -1));
  }
}
