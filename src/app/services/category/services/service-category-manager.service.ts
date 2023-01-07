import { Injectable } from '@angular/core';

import { TranslationService } from 'src/app/common/services/translation.service';
import { NewCategoryPage } from '../models/category-page';
import { ServiceCategoryService } from './service-category.service';
import { ServiceTreatmentTypeResponse } from '../models/service-treatment-type-response';
import { NotificationService } from './../../../common/services/notification.service';
import { CreateCategoryQuery } from './../models/create-category-query';
import { UpdateCategoryQuery } from '../models/update-category-query';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryManagerService {

  constructor(
    private serviceCategoryService: ServiceCategoryService,
    private translationService: TranslationService,
    private notificationService: NotificationService
  ) { }


  /*
  *  @description Get salon treatments
  */
  async getSalonServices(pageObject: NewCategoryPage) {
    var result = await this.serviceCategoryService.getServiceCategory(pageObject.data.id).toPromise();
    pageObject.data.id = result.id;
    pageObject.data.name = result.name;
    pageObject.data.description = result.description;
    this.selectedCategoryTreatments(pageObject, result.catgoryTtreatments);
  }

  /*
  *  @description Get salon treatments
  */
  async getSalonTreatments(pageObject: NewCategoryPage) {
    var result = await this.serviceCategoryService.getSalonTreatments().toPromise();
    this.translateTreatments(result);
    pageObject.data.treatmentList = result;
  }

  /*
  *  @description Translate treatments
  */
  async translateTreatments(treatments: ServiceTreatmentTypeResponse[]) {
    treatments.forEach(element => {
      element.name = this.translationService.translateTreatments(element.name)
      element.treatments.forEach(treatment => {
        treatment.label = this.translationService.translateTreatments(treatment.label)
      });
    });
  }


  /*
  *  @description Get salon treatments
  */
  async saveCategory(pageObject: NewCategoryPage) {
    if (!await this.validateCategorySave(pageObject)) {
      return;
    }
    if (pageObject.data.id) {
      await this.updateServiceCategory(pageObject)
    } else {
      await this.createServiceCategory(pageObject)
    }
  }




  /*
  *  @description Get salon treatments
  */
  async validateCategorySave(pageObject: NewCategoryPage) {
    if (!pageObject.data.name) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@category.name:Name`)
      );
      return false;

    }
    const catgoryTtreatments = this.getSelectedCategoryTreatments(pageObject);
    if (!catgoryTtreatments || catgoryTtreatments.length < 1) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@category.treatmentType:Treatment type`)
      );
      return false;
    }
    return true;
  }


  /*
  *  @description Get salon treatments
  */
  async createServiceCategory(pageObject: NewCategoryPage) {
    var query: CreateCategoryQuery = {
      name: pageObject.data.name,
      description: pageObject.data.description,
      catgoryTtreatments: this.getSelectedCategoryTreatments(pageObject)
    }
    var result = await this.serviceCategoryService.createServiceCategory(query).toPromise();
    pageObject.data.id = result.id;
    this.notificationService.showSaveSuccess()
  }


  /*
  *  @description Get salon treatments
  */
  async deleteCategory(id: string) {
    await this.serviceCategoryService.deleteServiceCategory(id).toPromise();
    this.notificationService.showDeleteSuccess()
  }


  /*
  *  @description Get salon treatments
  */
  async updateServiceCategory(pageObject: NewCategoryPage) {
    var query: UpdateCategoryQuery = {
      id: pageObject.data.id,
      name: pageObject.data.name,
      description: pageObject.data.description,
      catgoryTtreatments: this.getSelectedCategoryTreatments(pageObject)
    }
    var result = await this.serviceCategoryService.updateServiceCategory(query).toPromise();
    this.notificationService.showSaveSuccess()
  }

  /*
  *  @description Get salon treatments
  */
  getSelectedCategoryTreatments(pageObject: NewCategoryPage): string[] {
    var items = [];
    pageObject.data.treatmentList.forEach(type => {
      items = [...items, ...type.treatments.filter(item => item.selected).map(item => item.value)];
    })
    return items;
  }

  /*
  *  @description select salon treatments
  */
  selectedCategoryTreatments(pageObject: NewCategoryPage, treatments: string[]) {
    pageObject.data.treatmentList.forEach(type => {
      type.treatments.forEach(treatment => {
        treatment.selected = treatments.some(item => item == treatment.value)
      });
    })
  }

}