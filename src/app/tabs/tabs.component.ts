import { Component, OnInit, AfterContentInit, ContentChildren, ViewChild, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'trm-tabs',
  template: `<ul class="tabs">
  <li class="btn"
      *ngFor="let tab of tabs"
      [class.red]="tab.selected"
      [class.btn-flat]="!tab.selected"
      (click)="selectTab(tab)">
    {{tab.title}}
  </li>
</ul>
<ng-content></ng-content>`
})
export class TabsComponent implements OnInit, AfterContentInit {
  @ContentChildren(TabComponent)
  private tabs: QueryList<TabComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.selectTab(this.tabs.first);
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach(t => t.selected = false);
    tab.selected = true;
  }
}
