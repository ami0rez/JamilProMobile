import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  private readonly errorSubjectr = new Subject();
  private onErrorSubscription: Subscription;
  constructor() {}
  error(value) {
    this.errorSubjectr.next(value);
  }

  stopErrorListening() {
    if (this.onErrorSubscription) {
      this.onErrorSubscription.unsubscribe();
      this.onErrorSubscription = null;
    }
  }

  async onError(callback: (val) => void) {
    this.onErrorSubscription = this.errorSubjectr.subscribe(
      async (value) => await callback(value)
    );
  }
}
