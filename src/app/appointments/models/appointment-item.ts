import { AppointmentServiceItem } from './appointment-service-item';
import { AppointemntStates } from 'src/app/common/enums/appointemnt-states';

export class AppointmentItem {
  id: string;
  userName: string;
  serviceList: AppointmentServiceItem[] = [];
  totalPrice: string;
  duration: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  phoneNumber: string;
  image: any;
  state: AppointemntStates;
  canConfirm: boolean;
  canCancel: boolean;
  cancelTimePassed: boolean;
}
