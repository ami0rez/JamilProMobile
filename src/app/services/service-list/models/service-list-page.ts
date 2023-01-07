import { ListItem } from 'src/app/common/models/list-item';
import { ServicesListData } from './service-list-data';

export class ServicesListPage {
  data: ServicesListData = new ServicesListData();
  serviceTypes: ListItem[] = [];
}