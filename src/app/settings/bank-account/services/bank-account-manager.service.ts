import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { TranslationService } from 'src/app/common/services/translation.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ConfirmationService } from 'src/app/common/services/confirmation.service';
import { BankAccountPage } from '../models/bank-account-page';
import { BakAccountService } from './bank-account.service';
import { BankAccountItemResponse } from '../models/bank-account-item-reponse';
import { CreateBankAccountQuery } from '../models/create-bank-account-query';
import { UpdateBankAccountQuery } from '../models/update-bank-account-query';

@Injectable({
  providedIn: 'root',
})
export class BakAccountManagerService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bakAccountService: BakAccountService,
    private translationService: TranslationService,
    private notificationService: NotificationService,
    private location: Location,
    private confirmationService: ConfirmationService
  ) {}

  /*
   *  @description Get service by id
   */
  async initializeMode(pageObject: BankAccountPage) {
    this.activatedRoute.params.subscribe(async (params) => {
      pageObject.data.bankAccountId = params['id'];
      if (pageObject.data.bankAccountId) {
        this.getBankAccountById(pageObject);
        pageObject.editPageTitle = $localize`:@@team.updateBankAccount:Update a bankAccount`;
      } else {
        pageObject.editPageTitle = $localize`:@@team.addBankAccount:Add a bankAccount`;
      }
    });
  }

  /*
   *  @description Get service by id
   */
  async getBankAccountList(pageObject: BankAccountPage) {
    var service = await this.bakAccountService.getBankAccounts().toPromise();
    pageObject.data.bankAccountList = service;
  }

  /*
   *  @description Get service by id
   */
  async editBankAccount(
    bankAccount: BankAccountItemResponse,
    pageObject: BankAccountPage
  ) {
    this.router.navigate([RoutesConstants.bankAccountsEdit, bankAccount?.id]);
  }

  /*
   *  @description Get service by id
   */
  async getBankAccountById(pageObject: BankAccountPage) {
    var service = await this.bakAccountService
      .getBankAccountById(pageObject.data.bankAccountId)
      .toPromise();
    pageObject.data.bankAccount = service;
  }

  /*
   *  @description Get salon services
   */
  async saveBankAccount(pageObject: BankAccountPage) {
    if (!(await this.validateBankAccountSave(pageObject))) {
      return;
    }
    if (pageObject.data.bankAccountId) {
      await this.updateBankAccount(pageObject);
    } else {
      await this.createBankAccount(pageObject);
    }
  }

  /*
   *  @description Delete bankAccount
   */
  async deleteBankAccount(pageObject: BankAccountPage) {
    this.confirmationService.confirm({
      title: $localize`:@@team.memeber:BankAccount`,
      onConfirm: async () => {
        await this.bakAccountService
          .deleteBankAccount(pageObject.data.bankAccountId)
          .toPromise();
        this.notificationService.showDeleteSuccess();
        this.location.back();
      },
      onCancel: () => {},
    });
  }

  /*
   *  @description delete bank account
   */
  async setAsDefault(
    pageObject: BankAccountPage,
    account: BankAccountItemResponse
  ) {
    if (account.default) {
      if (
        pageObject.data.bankAccountList.filter((acc) => acc.default).length > 1
      ) {
        pageObject.data.bankAccountList
          .filter((acc) => acc.default && acc.id != account.id)
          .forEach((acc) => {
            if (acc) {
              acc.default = false;
            }
          });
        await this.bakAccountService.setAsDefault(account.id).toPromise();
        this.notificationService.showSaveSuccess();
      }
    } else {
      if (!pageObject.data.bankAccountList.some((acc) => acc.default)) {
        setTimeout(() => {
          account.default = true;
        }, 200);
        await this.notificationService.showError(
          'un compte doit etre choisie par defaut'
        );
      }
    }
  }

  /*
   *  @description Validate bankAccount save
   */
  async validateBankAccountSave(pageObject: BankAccountPage) {
    if (!pageObject.data.bankAccount.bankName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@bank-account.bankName:Bank name`
        )
      );
      return false;
    }
    if (!pageObject.data.bankAccount.accountNumber) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@bank-account.accountNumber:Account Number`
        )
      );
      return false;
    }
    if (!pageObject.data.bankAccount.accountHolderName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@bank-account.accountHolderName:Account Holder Name`
        )
      );
      return false;
    }
    if (!pageObject.data.bankAccount.phoneNumber) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@bank-account.phoneNumber:Phone number`
        )
      );
      return false;
    }
    return true;
  }
  /*
   *  @description Create bankAccount
   */
  async createBankAccount(pageObject: BankAccountPage) {
    var query: CreateBankAccountQuery = {
      ...pageObject.data.bankAccount,
    };
    var result = await this.bakAccountService
      .createBankAccount(query)
      .toPromise();
    pageObject.data.bankAccount.id = result.id;
    pageObject.data.bankAccountId = result.id;
    this.notificationService.showSaveSuccess();
  }

  /*
   *  @description Update bankAccount
   */
  async updateBankAccount(pageObject: BankAccountPage) {
    var query: UpdateBankAccountQuery = {
      ...pageObject.data.bankAccount,
    };
    var result = await this.bakAccountService
      .updateBankAccount(pageObject.data.bankAccountId, query)
      .toPromise();
    this.notificationService.showSaveSuccess();
  }

  initBankAccountsListControls(pageObject: BankAccountPage) {
    pageObject.controls = [
      {
        label: $localize`:@@bank-account.addBankAccount: Add bank account`,
        icon: 'add',
        onClick: () => this.redirectToMemeberAdd(),
      },
    ];
  }

  /*
   *  @description Redirect to memeber add page
   */
  redirectToMemeberAdd() {
    this.router.navigate([RoutesConstants.bankAccountsEdit]);
  }
}
