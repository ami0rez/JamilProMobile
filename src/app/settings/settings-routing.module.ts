import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountEditionComponent } from './bank-account/components/bank-account-edition/bank-account-edition.component';
import { BankAccountListComponent } from './bank-account/components/bank-account-list/bank-account-list.component';
import { BarberShopProfileComponent } from './salon-profile/components/salon-profile/salon-profile.component';
import { BarberSettingsComponent } from './settings/components/settings/settings.component';
import { GalleryComponent } from './gallery/components/gallery/gallery.component';

import { MembersListComponent } from './memebrs/components/members-list/members-list.component';
import { MemeberEditComponent } from './memebrs/components/memeber-edit/memeber-edit.component';
import { OnlineBookingManagementComponent } from './online-booking-management/components/online-booking-management/online-booking-management.component';
import { OtherSettingsComponent } from './other-settings/components/other-settings/other-settings.component';
import { SalonTimeEditorComponent } from './salon-time-editor/salon-time-editor.component';
import { MemberProfileComponent } from './member-profile/components/member-profile/member-profile.component';

const routes: Routes = [
  {
    path: 'time',
    component: SalonTimeEditorComponent,
  },
  {
    path: 'settings',
    component: BarberSettingsComponent,
  },
  {
    path: 'salon',
    component: BarberShopProfileComponent
  },
  {
    path: 'member-profile',
    component: MemberProfileComponent
  },
  {
    path: 'team',
    component: MembersListComponent,
  },
  {
    path: 'member',
    component: MemeberEditComponent,
  },
  {
    path: 'member/:id',
    component: MemeberEditComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'bank-account-list',
    component: BankAccountListComponent,
  },
  {
    path: 'bank-account-edit',
    component: BankAccountEditionComponent,
  },
  {
    path: 'bank-account-edit/:id',
    component: BankAccountEditionComponent,
  },
  {
    path: 'other-settings',
    component: OtherSettingsComponent,
  },
  {
    path: 'online-booking-management',
    component: OnlineBookingManagementComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
