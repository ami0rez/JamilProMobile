import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { AuthenticationQuery } from '../models/authentication-query';
import { AuthenticationResponse } from '../models/authentication-response';
import { LoginPage } from '../models/login-page';
import { TranslationService } from './../../common/services/translation.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
/**
 *  @description Manage login page actions
 */
export class LoginManagerService {
  constructor(
    private loginService: LoginService,
    private notificationService: NotificationService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private translationService: TranslationService
  ) {}

  redirectToStarter() {
    this.router.navigate([RoutesConstants.starter]);
  }
  /**
   *  @description Login user
   */
  async login(pageObject: LoginPage) {
    var query: AuthenticationQuery = {
      password: pageObject.data.password,
      email: pageObject.data.email,
    };
    if (!(await this.validateLogin(query))) {
      return;
    }
    var result = await this.loginService.login(query).toPromise();
    this.manageLoginSuccess(pageObject, result);
  }
  
  /*
   *  @description Redirect to register
   */
  redirectToRegister() {
    this.router.navigate([RoutesConstants.register]);
  }

  /**
   *  @description Creat new user
   */
  async register(pageObject: LoginPage) {
  }

  /**
   *  @description complete authentication if user logged in
   */
  async manageLoginSuccess(
    pageObject: LoginPage,
    response: AuthenticationResponse
  ) {
    this.authenticationService.completeAuthentication(response);
    if (!response.profile.emailConfirmed) {
      await this.notificationService.showWarning(
        $localize`:@@login.verifyAcount:Please verify your account`
      );
    }
  }

  /**
   *  @description validates user info before trying to login
   */
  async validateLogin(query: AuthenticationQuery) {
    if (!query.email) {
      await this.notificationService.showError(
        $localize`:@@login.userNameError: Email is required`
      );
      return false;
    }
    if (!query.password) {
      await this.notificationService.showError(
        $localize`:@@login.passWordError: Password is required`
      );
      return false;
    }

    return true;
  }
}
