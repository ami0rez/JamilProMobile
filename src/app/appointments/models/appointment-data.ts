import { AppointmentItem } from './appointment-item';
import { AppointmentListItem } from './appointment-list-item';

export class AppointmentsData {
  newAppointmentList: AppointmentListItem[] = [];
  upcomingAppointmentList: AppointmentListItem[] = [];
  cancelledAppointmentList: AppointmentListItem[] = [];
  completedAppointmentList: AppointmentListItem[] = [];
  appointment: AppointmentItem = new AppointmentItem();
  appointmentId: string;
  tabIndex: number = 0;
}
