import { PageBase } from 'src/app/common/models/page-base';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { ServiceManagerService } from '../../services/service-manager.service';
import { ServiceCategoryManagerService } from 'src/app/services/category/services/service-category-manager.service';
import { ServicesListPage } from '../../models/service-list-page';
import { ServicesCategory } from '../../models/serivce-list-category';
import { ServicesListItem } from '../../models/service-list-item';
import { ConfirmationService } from 'src/app/common/services/confirmation.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent extends PageBase {
  routes = RoutesConstants;
  pageObject: ServicesListPage = new ServicesListPage();
  constructor(
    private location: Location,
    private router: Router,
    private serviceManagerService: ServiceManagerService,
    private confirmationService: ConfirmationService,
    private serviceCategoryManagerService: ServiceCategoryManagerService
  ) {
    super();
  }

  async ionViewWillEnter() {
    await this.serviceManagerService.getSalonServices(this.pageObject);
  }

  goBack() {
    this.location.back();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  editCategory(category: ServicesCategory) {
    this.router.navigate([RoutesConstants.salonServiceCategory, category.id]);
  }

  async deleteCategory(category: ServicesCategory) {
    this.confirmationService.confirm({
      title: $localize`:@@category.category:Category`,
      onConfirm: async () => {
        await this.serviceCategoryManagerService.deleteCategory(category.id);
        await this.serviceManagerService.getSalonServices(this.pageObject);
      },
      onCancel: () => {},
    });
  }

  async createService(category: ServicesCategory) {
    this.router.navigate([RoutesConstants.salonEditionService, category.id]);
  }

  async editService(category: ServicesCategory, service: ServicesListItem) {
    this.router.navigate([
      RoutesConstants.salonEditionService,
      category.id,
      service.id,
    ]);
  }
}
