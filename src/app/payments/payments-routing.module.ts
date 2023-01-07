import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentDetailsComponent } from './salon-balance/components/payment-details/payment-details.component';
import { SalonBalanceComponent } from './salon-balance/components/salon-balance/salon-balance.component';
import { WithdrawalComponent } from './withdrawal/components/withdrawal/withdrawal.component';

const routes: Routes = [
  {
    path: 'balance',
    component: SalonBalanceComponent,
  },
  {
    path: 'details/:id',
    component: PaymentDetailsComponent,
  },
  {
    path: 'withdrawl',
    component: WithdrawalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}
