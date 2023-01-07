import { Component, OnInit } from '@angular/core';
import { PageBase } from 'src/app/common/models/page-base';
import { WithdrawalPage } from '../../models/withdrawal-page';
import { WithdrawalManagerService } from '../../services/withdrawal-manager.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent extends PageBase implements OnInit {
  pageObject: WithdrawalPage = new WithdrawalPage();
  constructor(private withdrawalManagerService: WithdrawalManagerService) {
    super();
  }

  ngOnInit() {
    this.withdrawalManagerService.getDefaultBankAccount(this.pageObject);
  }

  /*
   *  @description Get salon services
   */
  async withdrawal() {
    this.withdrawalManagerService.withdrawal(this.pageObject);
  }
}
