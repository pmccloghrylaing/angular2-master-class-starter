import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export const APP_TITLE_CHANGE = 'appTitleChange';

@Injectable()
export class EventBusService {
  private _messages$ = new Subject<EventBusArgs>();
  private _registry = new Map<string, EventWatcher>();

  constructor() { }

  emit<T>(eventType: string, data: T) {
    let watcher = this._registry.get(eventType) || this.buildWatcher(eventType);
    watcher.lastValue = data;

    this._messages$.next({
      type: eventType,
      data: data
    });
  }

  observe<T>(eventType: string, replayLast = false): Observable<T> {
    let watcher = this._registry.get(eventType) || this.buildWatcher(eventType);
    if (replayLast && typeof watcher.lastValue !== 'undefined') {
      return Observable.of(watcher.lastValue)
        .merge(watcher.observable);
    }
    return watcher.observable;
  }

  buildWatcher(eventType: string): EventWatcher {
    let watcher = {
      observable: this._messages$
        .filter(args => args.type === eventType)
        .map(args => args.data)
    };
    this._registry.set(
      eventType,
      watcher
    );

    return watcher;
  }
}

interface EventBusArgs {
  type: string;
  data: any
}

interface EventWatcher {
  observable: Observable<any>;
  lastValue?: any;
}