import { PageBase } from 'src/app/common/models/page-base';
import { Component, OnInit } from '@angular/core';

import { OnlineBookingManagementPage } from '../../models/online-booking-management-page';
import { OnlineBookingManagerService } from '../../services/online-booking-manager.service';

@Component({
  selector: 'app-online-booking-management',
  templateUrl: './online-booking-management.component.html',
  styleUrls: ['./online-booking-management.component.scss'],
})
export class OnlineBookingManagementComponent
  extends PageBase
  implements OnInit
{
  pageObject = new OnlineBookingManagementPage();

  constructor(
    private readonly onlineBookingManagerService: OnlineBookingManagerService
  ) {
    super();
  }

  async ngOnInit() {
    this.onlineBookingManagerService.generateOptions(this.pageObject);
    await this.onlineBookingManagerService.getOnlineBooking(this.pageObject);
  }

  async save() {
    await this.onlineBookingManagerService.saveOnlineBooking(this.pageObject);
  }

  async delete() {}
}
