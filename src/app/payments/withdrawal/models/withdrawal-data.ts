import { BankAccountItemResponse } from 'src/app/settings/bank-account/models/bank-account-item-reponse';
import { WithdrawalItem } from './withdrawal-item';

export class WithdrawalData {
  item: WithdrawalItem = new WithdrawalItem();
  account: BankAccountItemResponse = new BankAccountItemResponse();
  withdrawalId: string;
}
