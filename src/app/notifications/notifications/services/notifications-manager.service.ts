import { RoutesKeys } from './../../../common/constants/routes-constants';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { AppointemntStates } from 'src/app/common/enums/appointemnt-states';
import { TranslationMassages } from 'src/app/common/messages/translation-massages';
import { ConfirmationService } from 'src/app/common/services/confirmation.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { TranslationService } from 'src/app/common/services/translation.service';
import { ServiceService } from 'src/app/services/service-list/services/service.service';

import { NotificationListItem } from '../models/notification-list-item';
import { NotificationPage } from '../models/notification-page';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsManagerService {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly serviceService: ServiceService,
    private readonly notificationsService: NotificationsService,
    private readonly translationMassages: TranslationMassages,
    private readonly notificationService: NotificationService,
    private readonly confirmationService: ConfirmationService
  ) {}

  /*
   *  @description Get service by id
   */
  async getNotificationList(pageObject: NotificationPage) {
    var results = await this.notificationsService
      .getNotifications(pageObject.request)
      .toPromise();
    pageObject.data.notifications = [
      ...pageObject.data.notifications,
      ...results,
    ];
    pageObject.data.notifications.forEach((element) => {
      element.title = this.translationMassages[element.title];
    });
    if (results.some((notification) => !notification.received)) {
      await this.makeNotificationsReceived(pageObject);
    }
  }

  /*
   *  @description Get service by id
   */
  async getNotificationCount(): Promise<number> {
    var count = await this.notificationsService
      .getNotificationCount()
      .toPromise();
    return count;
  }

  /*
   *  @description view notification item
   */
  async viewNotificationItem(notification: NotificationListItem) {
    notification.seen = true;
    await this.makeNotificationsSeen(notification.id);
    this.router.navigate([
      RoutesKeys[notification.link],
      notification.targetId,
    ]);
  }

  /*
   *  @description Make notifications received
   */
  async makeNotificationsReceived(pageObject: NotificationPage) {
    await this.notificationsService
      .makeRecieved(pageObject.request)
      .toPromise();
  }

  /*
   *  @description Reject notification
   */
  private async makeNotificationsSeen(id: string) {
    await this.notificationsService.makeSeen(id).toPromise();
  }
}
