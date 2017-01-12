import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ContactsService } from '../contacts.service'
import { LoaderService } from '../loader.service';
import { EventBusService } from '../event-bus.service';
import { Contact } from '../models/contact';
import { SaveComponent } from '../navigateSave.guard';

@Component({
  selector: 'trm-contact-editor',
  templateUrl: './contact-editor.component.html'
})
export class ContactEditorComponent implements OnInit, AfterViewInit, SaveComponent {
  saved = true;
  private contact: Contact;
  private dirtySubscription: Subscription;
  @ViewChild(NgForm) form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private loader: LoaderService,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.contact = this.route.snapshot.data['contact'];

    this.eventBus.emit('appTitleChange', `Edit: ${this.contact.name}`);
  }

  ngAfterViewInit() {
    this.form.statusChanges
        .subscribe(() => this.saved = !this.form.dirty);
  }

  cancel(contact: Contact) {
    this.router.navigateByUrl(`/contact/${contact.id}`)
  }

  save(contact: Contact) {
    this.loader.showLoader(this.contactsService.updateContact(contact))
      .subscribe(contact => {
        debugger;
        this.form.reset(contact);
        //this.contact = contact;
        //this.router.navigateByUrl(`/contact/${contact.id}`);
      });
  }
}
