import { Patterns } from './../../../common/models/patterns';
import { Injectable } from '@angular/core';

import { NotificationService } from 'src/app/common/services/notification.service';
import { TranslationService } from 'src/app/common/services/translation.service';

import { RegisterPage } from '../models/register-page';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterProcessValidatorService {

  constructor(
    private registerService: RegisterService,
    private notificationService: NotificationService,
    private translationService: TranslationService,
  ) {}

  

  /**
   *  @description Validate email step info before trying to create user
   */
  async validateEmailStep(pageObject: RegisterPage) {
    if (!pageObject.data.userAccount.email) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@register.email: Email`
        )
      );
      return false;
    }
    
    
    if (!Patterns.email.test(pageObject.data.userAccount.email)) {
      await this.notificationService.showError(
        $localize`:@@register.wrongEmailFormat: Email format is wrong`
      );
      return false;
    }
    const emailExists = await this.registerService
      .validateEmail(pageObject.data.userAccount.email)
      .toPromise();
    if (emailExists) {
      await this.notificationService.showError(
        $localize`:@@register.emailUsed: This email is already in use`
      );
      return false;
    }
    return true;
  }

  /**
   *  @description Validate business acccount step info before trying to create user
   */
  async validateBusinessAcccountStep(pageObject: RegisterPage) {
    if (!pageObject.data.userAccount.privacyPolicyAgreement) {
      await this.notificationService.showError(
        $localize`:@@register.acceptPrivacyPolicy: Privacy policy must be agreed upon to move next`
      );
      return false;
    }
    if (!pageObject.data.userAccount.firstName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@register.firstName: First Name`
        )
      );
      return false;
    }
    if (!pageObject.data.userAccount.lastName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@register.lastName: Last Name`
        )
      );
      return false;
    }
    if (!(await this.validatePhoneNumberStep(pageObject))) {
      return false;
    }
    if (!pageObject.data.userAccount.password) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@register.password: Password`
        )
      );
      return false;
    }
    if (!pageObject.passwordRepeat) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@register.repeatPassword: Repeat Password`
        )
      );
      return false;
    }
    if (pageObject.passwordRepeat !== pageObject.data.userAccount.password) {
      await this.notificationService.showError(
        $localize`:@@register.errorPasswordRepeatPassword: the values sof fields Password and repeat password must be identical`
      );
      return false;
    }
    return true;
  }

  /**
   *  @description Validate business acccount step info before trying to create user
   */
  async validatePhoneNumberStep(pageObject: RegisterPage) {
    if (!pageObject.data.userAccount.phoneNumber) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@register.phoneNumber: Phone Number`
        )
      );
      return false;
    }
    
    if (!Patterns.phone.test(pageObject.data.userAccount.phoneNumber)) {
      await this.notificationService.showError(
        $localize`:@@register.wrongPhoneNumberFormat: Phone number format is wrong`
      );
      return false;
    }
    if (pageObject.passwordRepeat !== pageObject.data.userAccount.password) {
      await this.notificationService.showError(
        $localize`:@@register.errorPasswordRepeatPassword: the values sof fields Password and repeat password must be identical`
      );
      return false;
    }
    return true;
  }

  /**
   *  @description Validate business acccount step info before trying to create user
   */
  async validateVerificationCodeStep(pageObject: RegisterPage) {
    if (!pageObject.data.verificationCode) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@register.receivedCode: Received code`
        )
      );
      return false;
    }
    return true;
  }

  /**
   *  @description Validate business acccount step info before trying to create user
   */
  async validateBusinessNameStep(pageObject: RegisterPage) {
    if (!pageObject.data.salonProfile.name) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@barberShop.shopName: Shop Name`
        )
      );
      return false;
    }
    if (!pageObject.data.salonProfile.leagalName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@barberShop.businessLeagalName: Business leagal name`
        )
      );
      return false;
    }
    return true;
  }

  /*
   *  @description Validate main business step
   */
  async validateMainBusinessStep(pageObject: RegisterPage) {
    if (!pageObject.data.salonProfile.mainType) {
      await this.notificationService.showError(
        $localize`:@@register.mainTypeMustBeSelected: Main type must be selected`
      );
      return false;
    }
    return true;
  }
}
