import { PaginationUtils } from './../../../../common/utils/pagination-utils';
import { NotificationPage } from './../../models/notification-page';
import { Component, OnInit } from '@angular/core';
import { NotificationsManagerService } from '../../services/notifications-manager.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { NotificationListItem } from '../../models/notification-list-item';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  pageObject: NotificationPage = new NotificationPage();
  constructor(
    private notificationsManagerService: NotificationsManagerService
  ) {}

  async ngOnInit() {
    PaginationUtils.initializeRequest(this.pageObject.request);
    await this.notificationsManagerService.getNotificationList(this.pageObject);
  }

  async onIonInfinite(event) {
    PaginationUtils.updatePaginationRequest(this.pageObject.request, {
      first: this.pageObject.request.start + this.pageObject.request.length,
    });
    await this.notificationsManagerService.getNotificationList(this.pageObject);
    (event as InfiniteScrollCustomEvent).target.complete();
  }

  async viewNotifcationDetails(notification: NotificationListItem) {
    await this.notificationsManagerService.viewNotificationItem(notification);
  }
}
