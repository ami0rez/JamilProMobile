import { SalonBalancePage } from './../../models/salon-balance-page';
import { Component, OnInit } from '@angular/core';
import { SalonBalanceManagerService } from '../../services/salon-balance-manager.service';
import { PaginationUtils } from 'src/app/common/utils/pagination-utils';
import { InfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-salon-balance',
  templateUrl: './salon-balance.component.html',
  styleUrls: ['./salon-balance.component.scss'],
})
export class SalonBalanceComponent implements OnInit {
  pageObject: SalonBalancePage = new SalonBalancePage();
  constructor(private salonBalanceManagerService: SalonBalanceManagerService) {}

  ngOnInit() {
    PaginationUtils.initializeRequest(this.pageObject.request);
    this.salonBalanceManagerService.getPaymentList(this.pageObject);
    this.salonBalanceManagerService.getEarnings(this.pageObject);
  }

  async onIonInfinite(event) {
    PaginationUtils.updatePaginationRequest(this.pageObject.request, {
      first: this.pageObject.request.start + this.pageObject.request.length,
    });
    this.salonBalanceManagerService.getPaymentList(this.pageObject);
    (event as InfiniteScrollCustomEvent).target.complete();
  }
  viewPayment(payment: any) {
    this.salonBalanceManagerService.viewPayment(payment);
  }

  /*
   *  @description Start withdrawal
   */
  async startWithdrawal() {
    this.salonBalanceManagerService.startWithdrawal();
  }
}
