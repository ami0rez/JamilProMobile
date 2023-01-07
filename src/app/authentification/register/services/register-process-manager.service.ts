import { Injectable } from '@angular/core';
import { Roles } from 'src/app/common/enums/roles';

import { UserConfig } from 'src/app/common/models/user-config';
import { ErrorMessagesService } from 'src/app/common/services/error-messages.service';
import { UserConfigUtils } from 'src/app/common/utils/user-config-utils';

import { RegisterPage } from '../models/register-page';
import { UserRegisrterStates } from '../models/user-regisrter-states';
import { UserRegisterOperatios } from '../models/user-register-operatios';
import { UserRegisterSteps } from '../models/user-register-steps';
import { RegisterProcessEventsService } from './register-process-events.service';
import { RegisterProcessValidatorService } from './register-process-validator.service';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterProcessManagerService {
  constructor(
    private registerService: RegisterService,
    private eventsService: RegisterProcessEventsService,
    private errorMessagesService: ErrorMessagesService,
    private validatorService: RegisterProcessValidatorService
  ) {}
  /*
   *  @description Execute current step
   */
  async executeStep(pageObject: RegisterPage, userConfig: UserConfig) {
    switch (pageObject.registerStep) {
      case UserRegisterSteps.Email:
        if (!(await this.validatorService.validateEmailStep(pageObject))) {
          return;
        }
        await this.eventsService.saveUserEmail(pageObject);
        break;
      case UserRegisterSteps.BusinessAcccount:
        if (
          !(await this.validatorService.validateBusinessAcccountStep(
            pageObject
          ))
        ) {
          return;
        }
        await this.eventsService.createBusinessAccount(pageObject);
        await this.eventsService.saveUserAccount(pageObject);
        await this.eventsService.updateInitialStep(
          UserRegisterSteps.PhoneNumberCheck
        );
        break;
      case UserRegisterSteps.PhoneNumberCheck:
        if (
          !(await this.validatorService.validatePhoneNumberStep(pageObject))
        ) {
          return;
        }
        await this.eventsService.sendAcountConfirmationSms(pageObject);
        break;
      case UserRegisterSteps.PhoneNumberVerificationCode:
        if (
          !(await this.validatorService.validateVerificationCodeStep(
            pageObject
          ))
        ) {
          return;
        }
        if (!(await this.eventsService.validateVerificationCode(pageObject))) {
          return;
        }
        userConfig.profile.accountCreationInitStep =
          UserRegisterSteps.BusinessName;
        break;
      case UserRegisterSteps.BusinessName:
        if (
          !(await this.validatorService.validateBusinessNameStep(pageObject))
        ) {
          return;
        }
        await this.eventsService.updatSalonProfile(pageObject);
        break;
      case UserRegisterSteps.Websiet:
        await this.eventsService.updatSalonProfile(pageObject);
        break;
      case UserRegisterSteps.MainBusinessType:
        if (
          !(await this.validatorService.validateMainBusinessStep(pageObject))
        ) {
          return;
        }
        await this.eventsService.updatSalonProfile(pageObject);
        break;
      case UserRegisterSteps.RelatedBusinessType:
        await this.eventsService.updatSalonProfile(pageObject);
        break;
      case UserRegisterSteps.Address:
        await this.eventsService.updatSalonProfile(pageObject);
        break;
      case UserRegisterSteps.SalonReach:
        await this.eventsService.updatSalonReach(pageObject);
        break;
    }
  }

  /*
   *  @description Go next step
   */
  async goNext(pageObject: RegisterPage, userConfig: UserConfig) {
    if (await this.canGoNext(pageObject, userConfig)) {
      pageObject.registerStep++;
      userConfig.profile.accountCreationCurrentStep = pageObject.registerStep;
      this.refreshPageTitle(pageObject);
      this.refreshUserRegisrterState(pageObject);
      await this.prepareCurrentStep(pageObject);
    } else {
      this.eventsService.finishSubscriptionProcess();
    }
  }

  /*
   *  @description Check if can go next
   */
  async canGoNext(
    pageObject: RegisterPage,
    userConfig: UserConfig
  ): Promise<boolean> {
    if (userConfig.profile.role == Roles.Owner) {
      return pageObject.registerStep != UserRegisterSteps.SalonReach;
    } else {
      return pageObject.registerStep + 1 < UserRegisterSteps.BusinessName;
    }
  }

  /*
   *  @description Refresh page title
   */
  refreshPageTitle(pageObject: RegisterPage) {
    switch (pageObject.registerStep) {
      case UserRegisterSteps.Email:
      case UserRegisterSteps.BusinessAcccount:
        pageObject.title = $localize`:@@register.createAccount:Create account`;
        break;
      case UserRegisterSteps.PhoneNumberCheck:
      case UserRegisterSteps.PhoneNumberVerificationCode:
        pageObject.title = $localize`:@@register.verifyYourPhoneNumber:Phone number`;
        break;
      case UserRegisterSteps.BusinessName:
      case UserRegisterSteps.Websiet:
        pageObject.title = $localize`:@@register.salon:Salon`;
        break;
    }
  }

  /*
   *  @description Refresh user regisrter state
   */
  refreshUserRegisrterState(pageObject: RegisterPage) {
    if (
      UserRegisterOperatios.AccountCreation.includes(pageObject.registerStep)
    ) {
      pageObject.registerState = UserRegisrterStates.AccountCreation;
      pageObject.showCancel = false;
    } else if (
      UserRegisterOperatios.AccountValidation.includes(pageObject.registerStep)
    ) {
      pageObject.registerState = UserRegisrterStates.AccountValidation;
      pageObject.showCancel = true;
      pageObject.cancelText = $localize`:@@global.logout:Logout`;
    } else if (
      UserRegisterOperatios.ProfileFilling.includes(pageObject.registerStep)
    ) {
      pageObject.registerState = UserRegisrterStates.ProfileFilling;
      pageObject.showCancel = true;
      pageObject.cancelText = $localize`:@@global.saveAndExit:Save and exit`;
    }
  }

  /*
   *  @description Validate step and go next
   */
  async prepareCurrentStep(pageObject: RegisterPage) {
    switch (pageObject.registerStep) {
      case UserRegisterSteps.MainBusinessType:
      case UserRegisterSteps.RelatedBusinessType:
        if (!pageObject.data.salonTypes || !pageObject.data.salonTypes.length) {
          pageObject.data.salonTypes = await this.registerService
            .getSalonTypes()
            .toPromise();
          this.translateSalonTypeNames(pageObject);
        }
        break;
    }
  }
  /*
   *  @description Translate salon type names
   */
  async translateSalonTypeNames(pageObject: RegisterPage) {
    pageObject.data.salonTypes.forEach((salon) => {
      salon.name =
        this.errorMessagesService[salon.key] ?? salon.name ?? salon.key;
    });
  }
}
