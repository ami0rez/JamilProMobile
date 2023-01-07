import { AppointmentTabs } from './../models/appointment-tabs';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { AppointemntStates } from 'src/app/common/enums/appointemnt-states';
import { SelectListItem } from 'src/app/common/models/select-liast-item';
import { ConfirmationService } from 'src/app/common/services/confirmation.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { TranslationService } from 'src/app/common/services/translation.service';
import { ServiceService } from 'src/app/services/service-list/services/service.service';
import { AppointmentListItem } from '../models/appointment-list-item';
import { AppointmentPage } from '../models/appointment-page';
import { AppointmentService } from './appointment.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentManagerService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private membrsService: AppointmentService,
    private translationService: TranslationService,
    private notificationService: NotificationService,
    private location: Location,
    private confirmationService: ConfirmationService
  ) {}

  /*
   *  @description Get service by id
   */
  // async initializeMode(pageObject: AppointmentPage) {
  //   this.activatedRoute.params.subscribe(async (params) => {
  //     pageObject.data.appointmentId = params['id'];
  //     if (pageObject.data.appointmentId) {
  //       this.getAppointmentById(pageObject);
  //       pageObject.editPageTitle = $localize`:@@team.updateAppointment:Update a appointment`;
  //     }else{
  //       pageObject.editPageTitle = $localize`:@@team.addAppointment:Add a appointment`;
  //     }
  //   });
  // }

  /*
   *  @description Get service by id
   */
  async getAppointmentList(pageObject: AppointmentPage, index: number) {
    var results = await this.membrsService
      .getAppointments(pageObject.request)
      .toPromise();
    if (index == AppointmentTabs.New) {
      pageObject.data.newAppointmentList = [
        ...(pageObject.data.newAppointmentList ?? []),
        ...(results ?? []),
      ];
    }
    if (index == AppointmentTabs.Upcoming) {
      pageObject.data.upcomingAppointmentList = [
        ...(pageObject.data.upcomingAppointmentList ?? []),
        ...(results ?? []),
      ];
    }
    if (index == AppointmentTabs.Completed) {
      pageObject.data.completedAppointmentList = [
        ...(pageObject.data.completedAppointmentList ?? []),
        ...(results ?? []),
      ];
    }
    if (index == AppointmentTabs.Canceled) {
      pageObject.data.cancelledAppointmentList = [
        ...(pageObject.data.cancelledAppointmentList ?? []),
        ...(results ?? []),
      ];
    }
  }

  /*
   *  @description edit appointment
   */
  async editAppointment(appointment: AppointmentListItem) {
    this.router.navigate([RoutesConstants.appointmentDetails, appointment?.id]);
  }
  /*
   *  @description Get appointment by id
   */
  async getAppointmentById(pageObject: AppointmentPage) {
    var appointment = await this.membrsService
      .getAppointmentById(pageObject.data.appointmentId)
      .toPromise();
    pageObject.data.appointment = appointment;
  }
  /*
   *  @description Confirm appointment
   */
  async confirmAppointment(pageObject: AppointmentPage) {
    await this.membrsService
      .confirmAppointment(pageObject.data.appointmentId)
      .toPromise();
    pageObject.data.appointment.state = AppointemntStates.Accepted;
    pageObject.data.appointment.canConfirm = false;
    await this.notificationService.showSaveSuccess();
  }

  /*
   *  @description Reject appointment
   */
  async rejectAppointment(pageObject: AppointmentPage) {
    await this.membrsService
      .rejectAppointment(pageObject.data.appointmentId)
      .toPromise();
    pageObject.data.appointment.state = AppointemntStates.Refused;
    pageObject.data.appointment.canCancel = false;
    await this.notificationService.showSaveSuccess();
  }
}
