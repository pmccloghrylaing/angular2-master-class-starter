import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'trm-tab',
  template: '<ng-content *ngIf="selected"></ng-content>'
})
export class TabComponent {
  @Input() title: string;
  @Input() selected: boolean;
}
