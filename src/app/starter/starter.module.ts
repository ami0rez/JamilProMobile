import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

import { InvCommonModule } from '../common/common.module';
import { StarterComponent } from './starter/starter.component';
import { StarterRoutingModule } from './starter-routing.module';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@NgModule({
  declarations: [StarterComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StarterRoutingModule,
    InvCommonModule,
    SwiperModule
  ],
})
export class StarterModule {}
