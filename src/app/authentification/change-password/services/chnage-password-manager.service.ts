import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/common/services/notification.service';
import { TranslationService } from 'src/app/common/services/translation.service';
import { ChangePasswordPage } from './../models/change-password-page';
import { ChnagePasswordService } from './chnage-password.service';

@Injectable({
  providedIn: 'root',
})
export class ChnagePasswordManagerService {

  constructor(
    private chnagePasswordService: ChnagePasswordService,
    private notificationService: NotificationService,
    private translationService: TranslationService
  ) {}

  /*
  *  @description Change password
  */
  async changePassword(pageObject: ChangePasswordPage) {
    if(!await this.validateChangePasswordQuery(pageObject)){
      return;
    }
    await lastValueFrom(this.chnagePasswordService.changePassword(pageObject.data));
    this.notificationService.showUpdateTemplateSuccess($localize`:@@chnage-passowrd.password: Password`)
  }

  /*
  *  @description Validate change password query
  */
  async validateChangePasswordQuery(pageObject: ChangePasswordPage) {
    if (!pageObject.data.currentPassword) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@change-password.currentPassword: Current password`
        )
      );
      return false;
    }    
    if (!pageObject.data.password) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@change-password.newPassword: New password`
        )
      );
      return false;
    }
    if (!pageObject.repeatPassword) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@change-password.repeatPassword: Repeat password`
        )
      );
      return false;
    }
    if (pageObject.data.password != pageObject.repeatPassword) {
      await this.notificationService.showError(
        $localize`:@@change-password.errorPasswordRepeatPassword: the values sof fields Password and repeat password must be identical`
      );
      return false;
    }
    return true;
  }
}
