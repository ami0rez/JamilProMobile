import { Injectable } from '@angular/core';
import { BarberSettingsPage } from '../../settings/models/settings-page';

import { Days } from 'src/app/common/enums/days';
import { NotificationService } from 'src/app/common/services/notification.service';
import { TranslationService } from 'src/app/common/services/translation.service';
import { SalonProfileDto } from '../../salon-profile/models/salon-dto';
import { BarberSalonPage } from '../../salon-profile/models/salon-page';
import { SalonTimeDto, SalonTimeItemDto } from '../../salon-profile/models/salon-time';
import { SalonService } from './salon.service';

@Injectable({
  providedIn: 'root'
})
export class SalonManagerService {

  constructor(
    private barberService: SalonService,
    private notificationService: NotificationService,
    private translationService: TranslationService) { }


  /*
  *  @description Saves salon's data
  */
  async saveSalon(pageObject: BarberSalonPage) {
    const query: SalonProfileDto = {
      ...pageObject.data,
      salonTime: this.mapObjectTimeToArray(pageObject.data.salonTime)
    }
    if (!await this.validateSaveSalonQuery(query)) {
      return;
    }
    var result = await this.barberService.saveSalonProfile(query).toPromise();
    pageObject.data.id = result.id;
    await this.notificationService.showSaveSuccess();
  }

  /*
  *  @description Gets salon's data
  */
  async getSalon(pageObject: BarberSalonPage) {
    var result = await this.barberService.getBarberSalon().toPromise();
    let base64Image = 'data:image/jpeg;base64,' + result.image;
    pageObject.data = { ...result, salonTime: this.mapArrayTimeToObject(result.salonTime) }
    pageObject.base64Image = base64Image;
  }

  /*
  *  @description Gets salon's data
  */
  async getSalonProfile(pageObject: BarberSettingsPage) {
    var result = await this.barberService.getBarberSalonProfile().toPromise();
    let base64Image = 'data:image/jpeg;base64,' + result.image;
    pageObject.data = { ...result, image: base64Image }
  }

  /*
  *  @description Gets salon's data
  */
  mapArrayTimeToObject(salonTime: SalonTimeItemDto[]): SalonTimeDto {
    let salonObject = new SalonTimeDto();
    salonObject.monday = salonTime.find(item => item.day == Days.Monday) ?? new SalonTimeItemDto(Days.Monday);
    salonObject.tuesday = salonTime.find(item => item.day == Days.Tuesday) ?? new SalonTimeItemDto(Days.Tuesday);
    salonObject.wednesday = salonTime.find(item => item.day == Days.Wednesday) ?? new SalonTimeItemDto(Days.Wednesday);
    salonObject.thursday = salonTime.find(item => item.day == Days.Thursday) ?? new SalonTimeItemDto(Days.Thursday);
    salonObject.friday = salonTime.find(item => item.day == Days.Friday) ?? new SalonTimeItemDto(Days.Friday);
    salonObject.saturday = salonTime.find(item => item.day == Days.Saturday) ?? new SalonTimeItemDto(Days.Saturday);
    Object.keys(salonObject).forEach(key => {
      salonObject[key].active = salonTime.some(item => item.day == salonObject[key].day)
    })
    return salonObject;
  }


  /*
  *  @description Gets salon's data
  */
  mapObjectTimeToArray(salonTime: SalonTimeDto): SalonTimeItemDto[] {
    const salonArray: SalonTimeItemDto[] = Object.keys(salonTime)
      .filter(key => salonTime[key].active)
      .map(key => salonTime[key])
    return salonArray;
  }


  async validateSaveSalonQuery(query: SalonProfileDto) {
    if (!query.name) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@barberShop.shopName: Shop name`)
      );
      return false;
    } if (!query.leagalName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@barberShop.businessLeagalName: Business leagal name`)
      );
      return false;
    } if (!query.address) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@barberShop.address: Address`)
      );
      return false;
    } if (!query.phoneNumber) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@barberShop.phoneNumber: Phone Number`)
      );
      return false;
    }
    return true;
  }
}
