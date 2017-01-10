import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoaderService {
  loading: number = 0;

  constructor(private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading += 1;
    }
    if (event instanceof NavigationEnd) {
      this.loading -= 1;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading -= 1;
    }
    if (event instanceof NavigationError) {
      this.loading -= 1;
    }
  }

  showLoader<T>(observable: Observable<T>) {
    this.loading += 1;
    var result = observable.share()
    result.subscribe(
      null,
      () => this.loading -= 1,
      () => this.loading -= 1);
    
    return result;
  }
}
