import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 *  @description Manage logged user and authentication
 */
export class TranslationMassages {
  constructor() {
    // return new Proxy(this, {
    //   get(target, prop) {
    //     var value = self[prop];
    //     return value ?? '';
    //   },
    // });
  }

  Info = $localize`:@@notification.info:Info`;
  Success = $localize`:@@notification.success:Success`;
  Failure = $localize`:@@notification.failure:Failure`;
  Warning = $localize`:@@notification.warning:Warning`;
  AppointmentAccepted = $localize`:@@notification.appointmentAccepted:Appointment accepted`;
  AppointmentRejected = $localize`:@@notification.appointmentRejected:Appointment rejected`;
  AppointmentRescheduled = $localize`:@@notification.appointmentRescheduled:Appointment rescheduled`;
  Post = $localize`:@@notification.post:Post`;
  AppointmentSoon = $localize`:@@notification.appointmentSoon:Appointment soon`;
}
