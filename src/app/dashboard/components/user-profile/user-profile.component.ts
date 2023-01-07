import { TranslationService } from 'src/app/common/services/translation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
// import { Badge } from '@awesome-cordova-plugins/badge/ngx';

import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { UserProfile } from 'src/app/common/models/user-profile';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { NotificationsHeartbeatService } from 'src/app/common/services/notifications-heartbeat.service';
import { NotificationsManagerService } from 'src/app/notifications/notifications/services/notifications-manager.service';
import { DashboardPage } from '../../models/dashboard-page';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  pageObject: DashboardPage = new DashboardPage();
  defaultImage = "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg";
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private readonly notificationsHeartbeatService: NotificationsHeartbeatService,
    private readonly notificationsManagerService: NotificationsManagerService,
    // private localNotifications: LocalNotifications,
    // private badge: Badge,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.pageObject.data.userProfile = this.authenticationService.userProfile;
    this.authenticationService.authChanged.subscribe((value) => {
      this.refreshData(value);
    });
    this.notificationsHeartbeatService.onNotificationNumberChange((val) => {
      this.pageObject.data.notificationCount = val;
      // this.badge.set(val);
      // this.localNotifications.schedule([
      //   {
      //     id: 1,
      //     title: $localize`:@@notification.newNotifications:New notifications2`,
      //     text: this.translationService.translateWithVariable(
      //       $localize`:@@notification.newNotificationsBody:You have {0} new notifications, you might want to check them to stay updated`,
      //       val
      //     ),
      //     foreground: true,
      //   },
      // ]);
    });
    this.notificationsHeartbeatService.onNotificationCountCall(async () => {
      //var count = await this.notificationsManagerService.getNotificationCount();
      return 0;
    });
    this.notificationsHeartbeatService.updateNotificationCount();
  }
  refreshData(value: UserProfile) {
    this.pageObject;
  }
  navigateToNotifications() {
    this.router.navigate([RoutesConstants.notificationList]);
  }

  editProfile() {
    this.router.navigate([RoutesConstants.memberProfileUrl]);
  }
}
