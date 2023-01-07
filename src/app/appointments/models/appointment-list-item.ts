import { AppointemntStates } from 'src/app/common/enums/appointemnt-states';

export class AppointmentListItem {
  id: string;
  userName: string;
  serviceCount: number;
  totalPrice: number;
  duration: number;
  startTime: Date;
  endTime: Date;
  date: Date;
  image: any;
  state: AppointemntStates;
}
