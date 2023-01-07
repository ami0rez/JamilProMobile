import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemberProfileComponent } from './member-profile/components/member-profile/member-profile.component';
import { OtherSettingsComponent } from './other-settings/components/other-settings/other-settings.component';
import { SettingItemComponent } from './other-settings/components/setting-item/setting-item.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';
import { IonicModule } from '@ionic/angular';
import { InvCommonModule } from '../common/common.module';
import { BankAccountEditionComponent } from './bank-account/components/bank-account-edition/bank-account-edition.component';
import { BankAccountItemComponent } from './bank-account/components/bank-account-item/bank-account-item.component';
import { BankAccountListComponent } from './bank-account/components/bank-account-list/bank-account-list.component';
import { GalleryComponent } from './gallery/components/gallery/gallery.component';
import { MembersListComponent } from './memebrs/components/members-list/members-list.component';
import { MemeberEditComponent } from './memebrs/components/memeber-edit/memeber-edit.component';
import { OnlineBookingManagementComponent } from './online-booking-management/components/online-booking-management/online-booking-management.component';
import { BarberShopProfileComponent } from './salon-profile/components/salon-profile/salon-profile.component';
import { SalonTimeEditorComponent } from './salon-time-editor/salon-time-editor.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { BarberSettingsComponent } from './settings/components/settings/settings.component';

@NgModule({
  declarations: [
    SettingItemComponent,
    BarberShopProfileComponent,
    SalonTimeEditorComponent,
    BarberSettingsComponent,
    MembersListComponent,
    MemeberEditComponent,
    BankAccountListComponent,
    BankAccountItemComponent,
    BankAccountEditionComponent,
    SettingItemComponent,
    OtherSettingsComponent,
    OnlineBookingManagementComponent,
    GalleryComponent,
    MemberProfileComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule.forRoot(),
    InvCommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [BankAccountItemComponent],
})
export class SettingsModule {}
