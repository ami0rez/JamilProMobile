import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewCategoryComponent } from './category/componenets/category/category.component';
import { ServiceListComponent } from './service-list/components/service-list/service-list.component';
import { ServiceEditionComponent } from './services-edition/components/service-edition/service-edition.component';

const routes: Routes = [
  {
    path: 'category',
    component: NewCategoryComponent,
    pathMatch: 'full',
  },
  {
    path: 'category/:id',
    component: NewCategoryComponent,
    pathMatch: 'full',
  },
  {
    path: 'edition',
    component: ServiceEditionComponent,
  },
  {
    path: 'edition/:idcategory',
    component: ServiceEditionComponent,
  },
  {
    path: 'edition/:idcategory/:id',
    component: ServiceEditionComponent,
  },
  {
    path: '',
    component: ServiceListComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
