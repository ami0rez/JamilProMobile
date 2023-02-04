import { TranslationService } from 'src/app/common/services/translation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.pageObject.data.userProfile = this.authenticationService.userProfile;
    this.authenticationService.authChanged.subscribe((value) => {
      this.refreshData(value);
    });
    this.notificationsHeartbeatService.onNotificationNumberChange((val) => {
      this.pageObject.data.notificationCount = val;
    });
    this.notificationsHeartbeatService.onNotificationCountCall(async () => {
      return 0;
    });
    this.notificationsHeartbeatService.updateNotificationCount();
  }
  refreshData(value: UserProfile) {
    this.pageObject.data.userProfile = value;
  }
  navigateToNotifications() {
    this.router.navigate([RoutesConstants.notificationList]);
  }

  editProfile() {
    this.router.navigate([RoutesConstants.memberProfileUrl]);
  }
}
