import { AppointmentTabs } from './../../models/appointment-tabs';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/core';
import { PaginationUtils } from 'src/app/common/utils/pagination-utils';

import { AppointmentListItem } from '../../models/appointment-list-item';
import { AppointmentManagerService } from '../../services/appointment-manager.service';
import { AppointmentPage } from './../../models/appointment-page';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  pageObject: AppointmentPage = new AppointmentPage();
  constructor(private appointmentsManagerService: AppointmentManagerService) {}

  async ionViewWillEnter() {
    PaginationUtils.initializeRequest(this.pageObject.request);
  }
  async ngOnInit() {
    PaginationUtils.initializeRequest(this.pageObject.request);
  }

  async editAppointment(appointment: AppointmentListItem) {
    await this.appointmentsManagerService.editAppointment(appointment);
  }

  async onIonInfinite(event, tabIndex: number) {
    await this.appointmentsManagerService.getAppointmentList(
      this.pageObject,
      tabIndex
    );
    (event as InfiniteScrollCustomEvent).target.complete();
  }

  async onIonNewInfinite(event) {
    PaginationUtils.updatePaginationRequest(this.pageObject.request, {
      first: this.pageObject.request.start + this.pageObject.request.length,
    });
    this.updatinPagingFilter(AppointmentTabs.New);
    this.onIonInfinite(event, AppointmentTabs.New);
  }

  async onIonUpcomingInfinite(event) {
    PaginationUtils.updatePaginationRequest(this.pageObject.request, {
      first: this.pageObject.request.start + this.pageObject.request.length,
    });
    this.updatinPagingFilter(AppointmentTabs.Upcoming);
    this.onIonInfinite(event, AppointmentTabs.Upcoming);
  }

  async onIonCompletedInfinite(event) {
    PaginationUtils.updatePaginationRequest(this.pageObject.request, {
      first: this.pageObject.request.start + this.pageObject.request.length,
    });
    this.updatinPagingFilter(AppointmentTabs.Completed);
    this.onIonInfinite(event, AppointmentTabs.Completed);
  }

  async onIonCancelledInfinite(event) {
    PaginationUtils.updatePaginationRequest(this.pageObject.request, {
      first: this.pageObject.request.start + this.pageObject.request.length,
    });
    this.updatinPagingFilter(AppointmentTabs.Canceled);
    this.onIonInfinite(event, AppointmentTabs.Canceled);
  }

  /*
   *  @description Updatin paging filter
   */
  updatinPagingFilter(value) {
    this.pageObject.request.filters = [
      {
        key: 'State',
        matchMode: 'equals',
        value: value?.toString(),
        columnType: 'number',
      },
    ];
  }

  /*
   *  @description Tab changed
   */
  async tabChanged(index) {
    this.updatinPagingFilter(index);
    await this.appointmentsManagerService.getAppointmentList(
      this.pageObject,
      index
    );
  }
}
