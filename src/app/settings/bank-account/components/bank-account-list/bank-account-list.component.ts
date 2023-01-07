import { Component, OnInit } from '@angular/core';
import { BankAccountItemResponse } from '../../models/bank-account-item-reponse';

import { BankAccountPage } from '../../models/bank-account-page';
import { BakAccountManagerService } from '../../services/bank-account-manager.service';

@Component({
  selector: 'app-bank-account-list',
  templateUrl: './bank-account-list.component.html',
  styleUrls: ['./bank-account-list.component.scss'],
})
export class BankAccountListComponent {
  pageObject: BankAccountPage = new BankAccountPage();

  constructor(private membersManagerService: BakAccountManagerService) {}

  async ionViewWillEnter() {
    this.membersManagerService.initBankAccountsListControls(this.pageObject);
    await this.membersManagerService.getBankAccountList(this.pageObject);
  }

  async editBankAccount(account: BankAccountItemResponse) {
    await this.membersManagerService.editBankAccount(account, this.pageObject);
  }

  async changeDefaultAccount(account: BankAccountItemResponse) {
    await this.membersManagerService.setAsDefault(this.pageObject, account);
  }
}
