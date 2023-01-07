export class PaymentDetails {
  image: string;
  username: string = 'ZEROUALI Amine';
  transaction: string;
  date: Date;
  paidAmount: number;
  originalAmount: number;
  tax: number;
  couponDiscount: number;
  totalPayment: number;
  paid: boolean;
  byCart: boolean;
}
