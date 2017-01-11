import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class NavigateSaveGuard implements CanDeactivate<SaveComponent> {
  canDeactivate(component: SaveComponent) {
    return component.saved ||
      window.confirm('Navigate away without saving?');
  }
}

export interface SaveComponent {
  saved: boolean;
}