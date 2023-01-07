import PaginationRequest from 'src/app/common/models/pagination-request';
import { SalonBalanceData } from './salon-balance-data';

export class SalonBalancePage {
  data: SalonBalanceData = new SalonBalanceData();
  request: PaginationRequest = new PaginationRequest();
}
