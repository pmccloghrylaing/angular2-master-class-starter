import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EventBusService, APP_TITLE_CHANGE } from '../event-bus.service';

@Component({
  selector: 'trm-contacts-dashboard',
  templateUrl: './contacts-dashboard.component.html'
})
export class ContactsDashboardComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  private mainPanelInUse = false;

  constructor(private router: Router,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.mainPanelInUse = !/^\/*$/.test(this.router.routerState.snapshot.url);
    this.routerSubscription = this.router.events
      .subscribe(e => {
        this.mainPanelInUse = !/^\/*$/.test(e.url);
        if (!this.mainPanelInUse) {
          this.eventBus.emit(APP_TITLE_CHANGE, 'Contacts');
        }
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
