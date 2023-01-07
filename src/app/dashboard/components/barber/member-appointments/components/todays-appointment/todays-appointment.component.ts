import { AppointmentListItem } from './../../../../../../appointments/models/appointment-list-item';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/common/constants/routes-constants';

@Component({
  selector: 'app-todays-appointment',
  templateUrl: './todays-appointment.component.html',
  styleUrls: ['./todays-appointment.component.scss'],
})
export class TodaysAppointmentComponent {
  @Input()
  appointments: AppointmentListItem[] = [];

  @Output()
  infinitScroll: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router: Router) {}

  onIonInfinite(event) {
    this.infinitScroll.emit(event);
  }

  /*
   *  @description edit appointment
   */
  async editAppointment(appointment: AppointmentListItem) {
    this.router.navigate([RoutesConstants.appointmentDetails, appointment?.id]);
  }
}
