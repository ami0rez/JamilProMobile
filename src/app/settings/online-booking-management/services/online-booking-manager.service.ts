import { Injectable } from '@angular/core';

import { NotificationService } from 'src/app/common/services/notification.service';
import { TranslationService } from 'src/app/common/services/translation.service';
import { OnlineBookingManagementPage } from '../models/online-booking-management-page';
import { OnlineBookingSettingsItem } from '../models/online-booking-settings-item';
import {
  bookMaxMonthOptions,
  canRescheduleOptions,
  confirmAfterOptions,
  reservationBeforeHouresOptions,
  reservationBeforeMinutesOptions,
} from './../models/appointment-duration-constants';
import { OnlineBookingService } from './online-booking.service';

@Injectable({
  providedIn: 'root',
})
export class OnlineBookingManagerService {
  constructor(
    private readonly translationService: TranslationService,
    private notificationService: NotificationService,
    private readonly onlineBookingService: OnlineBookingService
  ) {}

  generateOptions(pageObject: OnlineBookingManagementPage) {
    canRescheduleOptions.forEach((item) => {
      if (item == 0) {
        pageObject.rescheduleOptions.push({
          label: $localize`:@@appointment-duration.immediatelyBeforeStartTime:Immediately before start time`,
          value: item,
        });
      } else {
        pageObject.rescheduleOptions.push({
          label: this.translationService.translateWithVariable(
            $localize`:@@appointment-duration.upToBeforeStartTime:Up to {0}h before start time`,
            item
          ),
          value: item,
        });
      }
    });
    confirmAfterOptions.forEach((item) => {
      if (item == 0) {
        pageObject.confirmAfterOptions.push({
          label: $localize`:@@appointment-duration.immediatelyAfterReservation:Immediately after reservation`,
          value: item,
        });
      } else {
        pageObject.confirmAfterOptions.push({
          label: this.translationService.translateWithVariable(
            $localize`:@@appointment-duration.AfterReservation:{0} min after reservation`,
            item
          ),
          value: item,
        });
        pageObject.resendNotificationOptions.unshift({
          label: this.translationService.translateWithVariable(
            $localize`:@@appointment-duration.beforeReservationStart:{0} min before reservation start`,
            item
          ),
          value: item,
        });
      }
    });
    reservationBeforeMinutesOptions.forEach((item) => {
      if (item == 0) {
        pageObject.bookBeforeOptions.push({
          label: $localize`:@@appointment-duration.anytime:Anytime`,
          value: item,
        });
      } else {
        pageObject.bookBeforeOptions.push({
          label: this.translationService.translateWithVariable(
            $localize`:@@appointment-duration.upToMinInAdvance:Up to {0} min in advance`,
            item
          ),
          value: item,
        });
      }
    });
    reservationBeforeHouresOptions.forEach((item) => {
      pageObject.bookBeforeOptions.push({
        label: this.translationService.translateWithVariable(
          $localize`:@@appointment-duration.upToHoureInAdvance:Up to {0} h in advance`,
          item
        ),
        value: item,
      });
    });
    bookMaxMonthOptions.forEach((item) => {
      if (item == undefined) {
        pageObject.bookMaxOptions.push({
          label: $localize`:@@appointment-duration.anytime:Anytime`,
          value: item,
        });
      } else {
        pageObject.bookMaxOptions.push({
          label: this.translationService.translateWithVariable(
            $localize`:@@appointment-duration.noMoreThanMonthsInTheFuture:No more than {0} months in the future`,
            item
          ),
          value: item,
        });
      }
    });
    pageObject.data.settings.resendNotificationBefore = Math.max(
      ...confirmAfterOptions
    );
  }

  /*
   *  @description Save online booking settings
   */
  async saveOnlineBooking(pageObject: OnlineBookingManagementPage) {
    const query: OnlineBookingSettingsItem = {
      ...pageObject.data.settings,
    };
    if (!(await this.validateSaveOnlineBookingQuery(query))) {
      return;
    }
    await this.onlineBookingService.saveOnlineBooking(query).toPromise();
    await this.notificationService.showSaveSuccess();
  }

  /*
   *  @description Get online booking settings
   */
  async getOnlineBooking(pageObject: OnlineBookingManagementPage) {
    var result = await this.onlineBookingService.getOnlineBooking().toPromise();
    pageObject.data.settings = result;
  }

  /*
   *  @description Validate save online booking query
   */
  async validateSaveOnlineBookingQuery(query: OnlineBookingSettingsItem) {
    // if (!query.name) {
    //   await this.notificationService.showError(
    //     this.translationService.generateRequiredMessage($localize`:@@barberShop.shopName: Shop name`)
    //   );
    //   return false;
    // } if (!query.leagalName) {
    //   await this.notificationService.showError(
    //     this.translationService.generateRequiredMessage($localize`:@@barberShop.businessLeagalName: Business leagal name`)
    //   );
    //   return false;
    // } if (!query.address) {
    //   await this.notificationService.showError(
    //     this.translationService.generateRequiredMessage($localize`:@@barberShop.address: Address`)
    //   );
    //   return false;
    // } if (!query.phoneNumber) {
    //   await this.notificationService.showError(
    //     this.translationService.generateRequiredMessage($localize`:@@barberShop.phoneNumber: Phone Number`)
    //   );
    //   return false;
    // }
    return true;
  }
}
