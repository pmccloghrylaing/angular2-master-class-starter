import { Component, OnInit } from '@angular/core';
import { EventBusService, APP_TITLE_CHANGE } from '../event-bus.service';

@Component({
  selector: 'trm-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private eventBus: EventBusService) { }

  ngOnInit() {
    this.eventBus.emit(APP_TITLE_CHANGE, 'About');
  }

}
