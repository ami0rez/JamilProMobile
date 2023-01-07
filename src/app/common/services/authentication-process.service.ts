import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterProcessEventsService } from 'src/app/authentification/register/services/register-process-events.service';
import { RoutesConstants } from '../constants/routes-constants';
import { UserRegisterSteps } from './../../authentification/register/models/user-register-steps';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationProcessService {
  constructor(
    private authenticationService: AuthenticationService,
    private eventsService: RegisterProcessEventsService,
    private router: Router
  ) {}

  /**
   *  @description Is phone number confirmed
   */
  public isPhoneNumberConfirmed(): boolean {
    if (this.authenticationService.accessTokenValid()) {
      const user = this.authenticationService.userProfile;
      console.debug(JSON.stringify(user));
      if (user) {
        return user.phoneNumberConfirmed;
      }
    }
    return false;
  }
  /**
   *  @description Validate phone number
   */
  public validatePhoneNumber() {
    this.eventsService.updateInitialStep(UserRegisterSteps.PhoneNumberCheck);
    this.eventsService.updateCurrentStep(UserRegisterSteps.PhoneNumberCheck);
    this.router.navigate([RoutesConstants.register]);
  }
}
