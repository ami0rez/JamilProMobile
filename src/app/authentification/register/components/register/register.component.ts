import { Component, OnInit } from '@angular/core';

import { PageBase } from 'src/app/common/models/page-base';

import { RegisterPage } from '../../models/register-page';
import { RegisterManagerService } from '../../services/register-manager.service';
import { RegisterProcessManagerService } from '../../services/register-process-manager.service';
import { UserRegisterSteps } from './../../models/user-register-steps';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends PageBase implements OnInit {
  pageObject: RegisterPage = new RegisterPage();
  isLoading: boolean = false;
  constructor(
    private registerManagerService: RegisterManagerService,
    private registerProcessManagerService: RegisterProcessManagerService
  ) {
    super();
  }

  ngOnInit() {
    this.registerProcessManagerService.refreshPageTitle(this.pageObject);
    if (
      this.pageObject.registerStep == UserRegisterSteps.Email ||
      this.pageObject.registerStep == UserRegisterSteps.PhoneNumberCheck
    ) {
      this.loadUserAccount();
    }
    this.registerProcessManagerService.prepareCurrentStep(this.pageObject);
    this.registerProcessManagerService.refreshUserRegisrterState(this.pageObject);
  }

  /*
   *  @description Move back
   */
  moveBack() {
    this.registerManagerService.moveBack(this.pageObject);
  }

  /*
   *  @description Move next
   */
  async next() {
    this.registerManagerService.executeStepAndGoNext(this.pageObject);
  }

  /*
   *  @description Cancel subscriptipon process
   */
  cancelProcess() {
    this.registerManagerService.cancelProcess(this.pageObject);
  }

  /*
   *  @description Load user email
   */
  loadUserAccount() {
    this.pageObject.data.userAccount.email = this.userConfig.profile?.email;
    this.pageObject.data.userAccount.firstName =
      this.userConfig.profile.firstName;
    this.pageObject.data.userAccount.lastName =
      this.userConfig.profile.lastName;
    this.pageObject.data.userAccount.phoneNumber =
      this.userConfig.profile.phoneNumber;
    this.pageObject.data.userAccount.privacyPolicyAgreement =
      this.userConfig.profile.privacyPolicyAgreement;
    this.pageObject.registerStep =
      this.userConfig.profile.accountCreationCurrentStep ?? 0;
    this.pageObject.initialStep =
      this.userConfig.profile.accountCreationInitStep ?? 0;
  }
}
