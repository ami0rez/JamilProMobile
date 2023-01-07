import { MenuItem } from 'src/app/common/models/menu-item';
import { BankAccountData } from './bank-account-data';

export class BankAccountPage{
  data: BankAccountData = new BankAccountData();
  editPageTitle: string;
  controls: MenuItem[] = [];
}