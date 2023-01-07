import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { Genders } from './../../../common/enums/geneder';
import { ServiceEditionPage } from './../models/service-edition-page';

import { ServiceEditionService } from './service-edition.service';
import { TranslationService } from 'src/app/common/services/translation.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ConfirmationService } from 'src/app/common/services/confirmation.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceEditionManagerService {
  constructor(
    private serviceEditionService: ServiceEditionService,
    private translationService: TranslationService,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  /*
   *  @description load options for editing
   */
  async loadOptions(pageObject: ServiceEditionPage) {
    var options = await this.serviceEditionService.getOptions().toPromise();
    pageObject.options = [{ id: '', name: '', options: options.categories }];
    pageObject.memberOptions = [{ id: '', name: '', options: options.members }];
  }

  /*
   *  @description Get service by id
   */
  async getService(pageObject: ServiceEditionPage) {
    var service = await this.serviceEditionService
      .getService(pageObject.data.id)
      .toPromise();
    pageObject.data = service;
  }

  /*
   *  @description Gets salon's data
   */
  async getSalonProfile(pageObject: ServiceEditionPage) {
    var result = await this.serviceEditionService
      .getBarberSalonProfile()
      .toPromise();
    pageObject.data.targetGeneder = result.salonGender;
    pageObject.disableGenderEditiong = result.salonGender != Genders.Unisex;
  }

  // /*
  //  *  @description Get salon services
  //  */
  // async getCategories(pageObject: ServiceEditionPage) {
  //   var result = await this.serviceEditionService.getCategories().toPromise();
  //   pageObject.options = [{ id: '', name: '', options: result }];
  // }

  /*
   *  @description Get salon services
   */
  async saveService(pageObject: ServiceEditionPage) {
    if (!(await this.validateServiceSave(pageObject))) {
      return;
    }
    if (pageObject.data.id) {
      await this.updateService(pageObject);
    } else {
      await this.createService(pageObject);
    }
  }

  /*
   *  @description Get salon services
   */
  async deleteService(pageObject: ServiceEditionPage) {
    await this.serviceEditionService
      .deleteService(pageObject.data.id)
      .toPromise();
    this.notificationService.showDeleteSuccess();
    this.location.back();
  }

  /*
   *  @description Validate service save
   */
  async validateServiceSave(pageObject: ServiceEditionPage) {
    if (!pageObject.data.name) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@service.name:Name`
        )
      );
      return false;
    }
    if (!pageObject.data.categoryId) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@service.category:Ctaegory`
        )
      );
      return false;
    }
    if (!pageObject.data.targetGeneder && pageObject.data.targetGeneder !== 0) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@service.serviceAvailableFor:Service available for`
        )
      );
      return false;
    }
    if (!pageObject.data.duration) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@service.duration:Duration`
        )
      );
      return false;
    }
    if (!pageObject.data.price) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@service.price:Price`
        )
      );
      return false;
    }
    if (!pageObject.data.priceType && pageObject.data.priceType != 0) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@service.priceType:Price type`
        )
      );
      return false;
    }
    return true;
  }
  /*
   *  @description Create service
   */
  async createService(pageObject: ServiceEditionPage) {
    var result = await this.serviceEditionService
      .createService(pageObject.data)
      .toPromise();
    pageObject.data.id = result.id;
    this.notificationService.showSaveSuccess();
  }

  /*
   *  @description Update service
   */
  async updateService(pageObject: ServiceEditionPage) {
    var result = await this.serviceEditionService
      .updateService(pageObject.data.id, pageObject.data)
      .toPromise();
    pageObject.data.id = result.id;
    this.notificationService.showSaveSuccess();
  }
}
