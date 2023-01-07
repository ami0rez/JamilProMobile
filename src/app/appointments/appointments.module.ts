import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InvCommonModule } from './../common/common.module';

import { AppointmentItemComponent } from './components/appointment-item/appointment-item.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentEditComponent } from './components/appointment-edit/appointment-edit.component';

@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentItemComponent,
    AppointmentEditComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppointmentsRoutingModule,
    InvCommonModule,
  ],
})
export class AppointmentsModule {}
