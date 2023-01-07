import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvCommonModule } from '../common/common.module';
import { PaymentDetailsComponent } from './salon-balance/components/payment-details/payment-details.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { SalonBalanceComponent } from './salon-balance/components/salon-balance/salon-balance.component';
import { PaymentStatusCardComponent } from './salon-balance/components/payment-status-card/payment-status-card.component';
import { WithdrawalComponent } from './withdrawal/components/withdrawal/withdrawal.component';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
  declarations: [
    SalonBalanceComponent,
    PaymentDetailsComponent,
    PaymentStatusCardComponent,
    WithdrawalComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PaymentsRoutingModule,
    InvCommonModule,
    SettingsModule
  ],
})
export class PaymentsModule {}
