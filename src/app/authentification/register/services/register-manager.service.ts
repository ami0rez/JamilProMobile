import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/common/constants/routes-constants';

import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { UserConfigUtils } from 'src/app/common/utils/user-config-utils';

import { RegisterPage } from '../models/register-page';
import { UserRegisrterStates } from '../models/user-regisrter-states';
import { RegisterProcessManagerService } from './register-process-manager.service';

@Injectable({
  providedIn: 'root',
})
/**
 *  @description Manage login page actions
 */
export class RegisterManagerService {
  constructor(
    private registerProcessManagerService: RegisterProcessManagerService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  /*
   *  @description Validate step and go next
   */
  async executeStepAndGoNext(pageObject: RegisterPage) {
    const userConfig = await UserConfigUtils.getUserConfig();
    this.registerProcessManagerService.executeStep(pageObject, userConfig);
    this.registerProcessManagerService.goNext(pageObject, userConfig);
    await UserConfigUtils.saveUserConfig(userConfig);
  }

  /**
   *  @description Updat salon reach
   */
  async cancelProcess(pageObject: RegisterPage) {
    if (pageObject.registerState == UserRegisrterStates.AccountValidation) {
      this.authenticationService.logout();
    } else if (pageObject.registerState == UserRegisrterStates.ProfileFilling) {
      this.router.navigate([RoutesConstants.home]);
    }
  }

  /*
   *  @description Move back
   */
  async moveBack(pageObject: RegisterPage) {
    const userConfig = await UserConfigUtils.getUserConfig();
    pageObject.registerStep--;
    userConfig.profile.accountCreationCurrentStep = pageObject.registerStep;
    await UserConfigUtils.saveUserConfig(userConfig);
  }

  

  /*
   *  @description Goto login
   */
  gotoLogin() {
    console.log('going to login');
    
    this.router.navigate([RoutesConstants.login]);
  }
}
