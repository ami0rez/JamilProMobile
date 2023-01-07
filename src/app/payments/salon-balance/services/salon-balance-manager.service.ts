import { PaymentListItem } from './../models/payment-list-item';
import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from 'src/app/common/services/notification.service';
import { SalonBalancePage } from '../models/salon-balance-page';

import { SalonBalanceService } from './salon-balance.service';

@Injectable({
  providedIn: 'root',
})
export class SalonBalanceManagerService {
  constructor(
    private readonly router: Router,
    private readonly salonBalanceService: SalonBalanceService,
    private readonly notificationService: NotificationService
  ) {}

  /*
   *  @description Get payment list
   */
  async getPaymentList(pageObject: SalonBalancePage) {
    var results = await this.salonBalanceService
      .getPayments(pageObject.request)
      .toPromise();
    pageObject.data.list = [...pageObject.data.list, ...results];
  }

  /*
   *  @description get payment id
   */
  async getPaymentById(pageObject: SalonBalancePage) {
    var payment = await this.salonBalanceService
      .getPaymentById(pageObject.data.id)
      .toPromise();
    pageObject.data.payment = payment;
  }

  /*
   *  @description Get notifications
   */
  async getEarnings(pageObject: SalonBalancePage) {
    var results = await this.salonBalanceService.getEarnings().toPromise();
    pageObject.data.earnings = results;
  }

  /*
   *  @description view payment item
   */
  async viewPayment(notification: PaymentListItem) {
    this.router.navigate([RoutesConstants.paymentDetails, notification.id]);
  }

  /*
   *  @description Start withdrawal
   */
  async startWithdrawal() {
    this.router.navigate([RoutesConstants.withdrawl]);
  }
}
