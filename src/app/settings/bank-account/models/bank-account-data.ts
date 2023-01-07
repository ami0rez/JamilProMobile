import { BankAccountItemResponse } from './bank-account-item-reponse';
export class BankAccountData{
  bankAccountList: BankAccountItemResponse[] = [];
  bankAccount: BankAccountItemResponse = new BankAccountItemResponse();
  bankAccountId: string;
}