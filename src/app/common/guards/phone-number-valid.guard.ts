import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationProcessService } from '../services/authentication-process.service';
@Injectable({
  providedIn: 'root',
})
export class PhoneNUmberValidGuard implements CanActivate {
  constructor(
    private authenticationProcessService: AuthenticationProcessService,
    private router: Router
  ) {}

  async canActivate() {
    if (this.authenticationProcessService.isPhoneNumberConfirmed()) {
      return true;
    } else {
      this.authenticationProcessService.validatePhoneNumber();
      return false;
    }
  }
}
