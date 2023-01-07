import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/common/services/notification.service';
import { OtherSettingsPage } from '../models/other-settings-page';
import { MembrSettingsService } from './member-settings.service';

@Injectable({
  providedIn: 'root',
})
export class MemberSettingsManagerService {
  constructor(
    private membrsService: MembrSettingsService,
    private notificationService: NotificationService
  ) {}

  /*
   *  @description Get service by id
   */
  async getOtherSettings(pageObject: OtherSettingsPage) {
    var settings = await this.membrsService.getOtherSettings().toPromise();
    pageObject.data.settings = settings;
  }

  /*
   *  @description Update ntiofications
   */
  async updateNtiofications(pageObject: OtherSettingsPage) {
    await this.membrsService
      .updateNotifications(pageObject.data.settings.appNotifications)
      .toPromise();
    this.notificationService.showSaveSuccess();
  }

  /*
   *  @description Update language
   */
  async updateLanguage(pageObject: OtherSettingsPage) {
    // await this.membrsService
    //   .updateLanguage(pageObject.data.settings?.language)
    //   .toPromise();
    this.notificationService.showSaveSuccess();
  }
}
