import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsHeartbeatService {
  id: number;
  private intervalDuration = 30000;
  private initintervalDuration = 3000;
  private notificationsCount = 0;
  private iterations = 0;
  private heartBeatSubscription: Subscription;
  private notificationNumberChangeSubscription: Subscription;
  private onNotificationNumberChangeSubject: Subject<number> =
    new Subject<number>();
  private notificationCountCallSusbcription: Subscription;
  private notificationCountCallSubject: Subject<number> = new Subject<number>();

  constructor(protected heartBeatHttp: HttpClient) {
    this.id = new Date().getTime();
  }

  /*
   *  @description Start heartbeat
   */
  start() {
    const observable = interval(this.intervalDuration).pipe(startWith(0));
    if (this.heartBeatSubscription) {
      this.heartBeatSubscription.unsubscribe();
    }
    this.heartBeatSubscription = observable.subscribe(
      (iteration) => {
        this.iterations = iteration;
        this.updateNotificationCount();
      },
      (error) => {
        console.log('heartbeat error', error);
      },
      () => {
        console.log('complete');
      }
    );
  }

  /*
   *  @description On notification number change
   */
  onNotificationNumberChange(callback: (val) => void) {
    if (this.notificationNumberChangeSubscription) {
      this.notificationNumberChangeSubscription.unsubscribe();
    }
    this.notificationNumberChangeSubscription =
      this.onNotificationNumberChangeSubject.subscribe(async (val) => {
        await callback(val);
      });
  }

  /*
   *  @description Stop notification subscription
   */
  stopNotificationSubscription() {
    if (this.notificationNumberChangeSubscription) {
      this.notificationNumberChangeSubscription.unsubscribe();
      this.notificationNumberChangeSubscription = null;
    }
  }

  /*
   *  @description On notificationcount call
   */
  onNotificationCountCall(callback: (val) => Promise<number>) {
    if (this.notificationCountCallSusbcription) {
      this.notificationCountCallSusbcription.unsubscribe();
    }
    this.notificationNumberChangeSubscription =
      this.notificationCountCallSubject.subscribe(async (val) => {
        if (callback) {
          const newNotificationsCount = await callback(val);
          if (this.notificationsCount != newNotificationsCount) {
            this.intervalDuration = this.initintervalDuration;
            this.notificationsCount = newNotificationsCount;
            this.onNotificationNumberChangeSubject.next(
              this.notificationsCount
            );
          }
        }
      });
  }

  /*
   *  @description Update notification count
   */
  async updateNotificationCount() {
    await this.notificationCountCallSubject.next(null);
  }

  ngOnDestroy() {
    this.heartBeatSubscription.unsubscribe();
    this.notificationCountCallSusbcription.unsubscribe();
  }
}
