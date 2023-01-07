import { Constants } from './../../../common/models/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { TranslationService } from 'src/app/common/services/translation.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ConfirmationService } from 'src/app/common/services/confirmation.service';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalPage } from '../models/withdrawal-page';

@Injectable({
  providedIn: 'root',
})
export class WithdrawalManagerService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private withdrawalService: WithdrawalService,
    private translationService: TranslationService,
    private notificationService: NotificationService,
    private location: Location,
    private confirmationService: ConfirmationService
  ) {}

  /*
   *  @description Get service by id
   */
  async initializeMode(pageObject: WithdrawalPage) {
    this.activatedRoute.params.subscribe(async (params) => {
      pageObject.data.withdrawalId = params['id'];
      if (pageObject.data.withdrawalId) {
        // pageObject.editPageTitle = $localize`:@@team.updateBankAccount:Update a bankAccount`;
      } else {
        // pageObject.editPageTitle = $localize`:@@team.addBankAccount:Add a bankAccount`;
      }
    });
  }

  /*
   *  @description Get service by id
   */
  async getDefaultBankAccount(pageObject: WithdrawalPage) {
    var service = await this.withdrawalService
      .getDefaultBankAccount()
      .toPromise();
    pageObject.data.account = service;
  }

  /*
   *  @description Get salon services
   */
  async withdrawal(pageObject: WithdrawalPage) {
    if (!(await this.validateWithdrawal(pageObject))) {
      return;
    }
    if (!pageObject.data.withdrawalId) {
      // await this.withdrawal(pageObject);
    }
  }

  /*
   *  @description Validate bankAccount save
   */
  async validateWithdrawal(pageObject: WithdrawalPage) {
    if (!pageObject.data.item.amount) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@withdrawal.amount:Amount`
        )
      );
      return false;
    }
    if (pageObject.data.item.amount < pageObject.minAmount) {
      await this.notificationService.showError(
        this.translationService.translateWithVariable(
          $localize`:@@global.error.amountMustBeHigherThenX:Amount must be higher then {0}` +
            ' ' +
            Constants.CURRENCY,
          pageObject.minAmount
        )
      );
      return false;
    }
    return true;
  }
}
