import { PaymentDetails } from './payment-details';
import { EarningsResponse } from './payment-response';
import { PaymentListItem } from './payment-list-item';

export class SalonBalanceData {
  list: PaymentListItem[] = [];
  payment: PaymentDetails = new PaymentDetails();
  earnings: EarningsResponse = new EarningsResponse();
  id: string;
}
