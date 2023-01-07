import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankAccountPage } from '../../models/bank-account-page';
import { BakAccountManagerService } from '../../services/bank-account-manager.service';

@Component({
  selector: 'app-bank-account-edition',
  templateUrl: './bank-account-edition.component.html',
  styleUrls: ['./bank-account-edition.component.scss'],
})
export class BankAccountEditionComponent {
  pageObject = new BankAccountPage();
  constructor(
    private activatedRoute: ActivatedRoute,
    private memebersManagerService: BakAccountManagerService
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.pageObject.data.bankAccountId = params['id'];
      if (this.pageObject.data.bankAccountId) {
        this.memebersManagerService.getBankAccountById(this.pageObject);
        this.pageObject.editPageTitle = $localize`:@@bank-account.updateBankAccount:Update a bank account`;
      } else {
        this.pageObject.editPageTitle = $localize`:@@bank-account.addBankAccount:Add a bank account`;
      }
    });
  }

  saveBankAccount() {}
  deleteBankAccount() {}

  cancel() {}

  async save() {
    await this.memebersManagerService.saveBankAccount(this.pageObject);
  }

  async delete() {
    await this.memebersManagerService.deleteBankAccount(this.pageObject);
  }
}
