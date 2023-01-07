import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { IonicModule } from '@ionic/angular';
import { DahsboardRoutingModule } from './dashboard-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { InvCommonModule } from '../common/common.module';
import { BarberBalanceComponent } from './components/barber/barber-balance/barber-balance.component';
import { BarberProfileComponent } from './components/barber/barber-profile/barber-profile.component';
import { TodaysAppointmentComponent } from './components/barber/member-appointments/components/todays-appointment/todays-appointment.component';
import { BestDealsComponent } from './components/best-deals/best-deals.component';
import { PopularSalonsComponent } from './components/popular-salons/popular-salons.component';
import { ServiceExplorerComponent } from './components/service-explorer/service-explorer.component';
import { SlideApointmentComponent } from './components/slide-apointment/slide-apointment.component';
import { SlideSalonComponent } from './components/slide-salon/slide-salon.component';
import { UpcomingAppointmentsComponent } from './components/upcoming-appointments/upcoming-appointments.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './dashboard.page';

@NgModule({
  imports: [FormsModule,
    CommonModule,
    IonicModule.forRoot(),
    InvCommonModule,
    DahsboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    BestDealsComponent,
    UpcomingAppointmentsComponent,
    SlideApointmentComponent,
    ServiceExplorerComponent,
    PopularSalonsComponent,
    SlideSalonComponent,
    BarberBalanceComponent,
    BarberProfileComponent,
    TodaysAppointmentComponent
  ], 
  providers:[
    // LocalNotifications
  ]
})
export class DashboardPageModule { }
