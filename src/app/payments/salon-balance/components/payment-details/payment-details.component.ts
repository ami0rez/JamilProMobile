import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalonBalancePage } from '../../models/salon-balance-page';
import { SalonBalanceManagerService } from '../../services/salon-balance-manager.service';
import { PageBase } from 'src/app/common/models/page-base';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent extends PageBase implements OnInit {
  pageObject: SalonBalancePage = new SalonBalancePage();
  sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private readonly salonBalanceManagerService: SalonBalanceManagerService
  ) {
    super();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async (params) => {
      this.pageObject.data.id = params['id'];
      if (this.pageObject.data.id) {
        await this.salonBalanceManagerService.getPaymentById(this.pageObject);
      }
    });
  }

  save() {}
}
