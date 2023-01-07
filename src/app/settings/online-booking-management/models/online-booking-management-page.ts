import { ListItem } from './../../../common/models/list-item';
import { canRescheduleOptions } from './appointment-duration-constants';
import { OnlineBookingManagementData } from './online-booking-management-data';

export class OnlineBookingManagementPage {
  data: OnlineBookingManagementData = new OnlineBookingManagementData();
  rescheduleOptions: ListItem[] = [];
  confirmAfterOptions: ListItem[] = [];
  resendNotificationOptions: ListItem[] = [];
  bookBeforeOptions: ListItem[] = [];
  bookMaxOptions: ListItem[] = [];
}
