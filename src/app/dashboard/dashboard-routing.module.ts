import { DashboardComponent } from './dashboard.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneNUmberValidGuard } from '../common/guards/phone-number-valid.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [PhoneNUmberValidGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DahsboardRoutingModule {}
