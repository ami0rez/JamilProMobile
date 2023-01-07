import PaginationRequest from 'src/app/common/models/pagination-request';
import { NotificationData } from './notification-data';

export class NotificationPage {
  data: NotificationData = new NotificationData();
  request: PaginationRequest = new PaginationRequest();
}
