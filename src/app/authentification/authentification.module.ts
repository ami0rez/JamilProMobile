import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SwiperModule } from 'swiper/angular';

import { InvCommonModule } from '../common/common.module';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { BusinessTypeComponent } from './register/components/business-type/business-type.component';
import { RegisterComponent } from './register/components/register/register.component';

@NgModule({
  declarations: [RegisterComponent, BusinessTypeComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthentificationRoutingModule,
    InvCommonModule,
    SwiperModule,
  ],
})
export class AuthentificationModule {}
