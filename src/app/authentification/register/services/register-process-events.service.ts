import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { SalonReachTypes } from 'src/app/common/enums/salon-reach-types';
import { AccountType } from 'src/app/common/models/account-type';
import { UserProfile } from 'src/app/common/models/user-profile';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { ModalNotificationService } from 'src/app/common/services/modal-notification.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { UserConfigUtils } from 'src/app/common/utils/user-config-utils';

import { RegisterPage } from '../models/register-page';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterProcessEventsService {
  constructor(
    private registerService: RegisterService,
    private notificationService: NotificationService,
    private modalNotificationService: ModalNotificationService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  /**
   *  @description Create business account
   */
  async createBusinessAccount(pageObject: RegisterPage) {
    pageObject.saving = true;
    pageObject.data.userAccount.accountType = AccountType.PARTNER
    var result = await this.registerService
      .register(pageObject.data.userAccount)
      .toPromise();
    pageObject.saving = false;
    this.authenticationService.completeAuthentication(result);
    pageObject.data.salonProfile.phoneNumber =
      pageObject.data.userAccount.phoneNumber;
    pageObject.data.salonProfile.email = pageObject.data.userAccount.email;
    await await this.notificationService.showSuccess(
      $localize`:@@register.accountCreatedSuccessfully: Congratulation, your account has been created successfully, please complete next steps to complete your profile`,
      true
    );
  }
  /*
   *  @description Save user email
   */
  async saveUserEmail(pageObject: RegisterPage) {
    const userConfig = await UserConfigUtils.getUserConfig();
    if (!userConfig.profile) {
      userConfig.profile = new UserProfile();
    }
    userConfig.profile.email = pageObject.data.userAccount.email;
    await UserConfigUtils.saveUserConfig(userConfig);
  }

  /*
   *  @description Save user account
   */
  async saveUserAccount(pageObject: RegisterPage) {
    const userConfig = await UserConfigUtils.getUserConfig();
    if (!userConfig.profile) {
      userConfig.profile = new UserProfile();
    }
    userConfig.profile.firstName = pageObject.data.userAccount.firstName;
    userConfig.profile.lastName = pageObject.data.userAccount.lastName;
    userConfig.profile.phoneNumber = pageObject.data.userAccount.phoneNumber;
    userConfig.profile.privacyPolicyAgreement =
      pageObject.data.userAccount.privacyPolicyAgreement;
      await UserConfigUtils.saveUserConfig(userConfig);
  }

  /**
   *  @description Send acount confirmation sms
   */
  async sendAcountConfirmationSms(pageObject: RegisterPage) {
    await this.registerService
      .sendAcountConfirmationSms(pageObject.data.userAccount.phoneNumber)
      .toPromise();
  }

  /**
   *  @description Send acount confirmation sms
   */
  async validateVerificationCode(pageObject: RegisterPage): Promise<boolean> {
    var codeValid = await this.registerService
      .validateVerificationCode(pageObject.data.verificationCode)
      .toPromise();
    if (!codeValid) {
      pageObject.invalidVerificationCodeMessage = $localize`:@@register.wrongPhoneNumberVerificationCode: The code you provided is invalid, please check the received code or go back to the previous step to check phone number and resend code`;
    } else {
      await this.validatePhonenNumber();
      pageObject.invalidVerificationCodeMessage = $localize`:@@register.theCodeIsValid: The code is valid`;
    }
    return codeValid;
  }

  /**
   *  @description Updat salon profile
   */
  async updatSalonProfile(pageObject: RegisterPage) {
    await this.registerService
      .updateSalonInfos({ ...pageObject.data.salonProfile, salonTime: [] })
      .toPromise();
    const userConfig = await UserConfigUtils.getUserConfig();
    Object.keys(userConfig.salonProfile).forEach((key) => {
      userConfig.salonProfile[key] =
        pageObject.data.salonProfile[key] ?? userConfig.salonProfile[key];
    });
    await UserConfigUtils.saveUserConfig(userConfig);
  }

  /**
   *  @description Updat salon reach
   */
  async updatSalonReach(pageObject: RegisterPage) {
    const { salonReach } = pageObject.data.salonProfile;
    await this.registerService
      .updatSalonReach({
        ...salonReach,
        otherDescription:
          salonReach.reachType == SalonReachTypes.Other
            ? salonReach.otherDescription
            : '',
      })
      .toPromise();
  }

  /**
   *  @description Updat salon reach
   */
  async finishSubscriptionProcess() {
    await this.modalNotificationService.showSaveSuccess();
    this.router.navigate([RoutesConstants.home]);
  }

  /**
   *  @description Updat salon reach
   */
  async updateInitialStep(step: number) {
    const userConfig = await UserConfigUtils.getUserConfig();
    userConfig.profile.accountCreationInitStep = step;
    await UserConfigUtils.saveUserConfig(userConfig);
  }

  /**
   *  @description Updat salon reach
   */
  async updateCurrentStep(step: number) {
    const userConfig = await UserConfigUtils.getUserConfig();
    userConfig.profile.accountCreationCurrentStep = step;
    await UserConfigUtils.saveUserConfig(userConfig);
  }

  /**
   *  @description Updat salon reach
   */
  async validatePhonenNumber() {
    const userConfig = await UserConfigUtils.getUserConfig();
    userConfig.profile.phoneNumberConfirmed = true;
    await UserConfigUtils.saveUserConfig(userConfig);
  }
}
