import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvCommonModule } from '../common/common.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationItemComponent } from './notifications/components/notification-item/notification-item.component';
import { NotificationListComponent } from './notifications/components/notification-list/notification-list.component';



@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotificationsRoutingModule,
    InvCommonModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class NotificationsModule { }
