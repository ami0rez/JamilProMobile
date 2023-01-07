import { InvCommonModule } from './../common/common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesRoutingModule } from './services-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NewCategoryComponent } from './category/componenets/category/category.component';
import { IonicModule } from '@ionic/angular';
import { TreatmentTypesComponent } from './category/componenets/treatment-types/treatment-types.component';
import { ServiceEditionComponent } from './services-edition/components/service-edition/service-edition.component';
import { ServiceListComponent } from './service-list/components/service-list/service-list.component';
import { ServiceItemComponent } from './service-list/components/service-item/service-item.component';



@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceItemComponent,
    NewCategoryComponent,
    TreatmentTypesComponent,
    ServiceEditionComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule.forRoot(),
    InvCommonModule,
    ServicesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ServicesModule { }
