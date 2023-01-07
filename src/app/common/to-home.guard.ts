import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { TokenManagerService } from './services/token-manager.service';
@Injectable({
  providedIn: 'root',
})
export class ToHomeGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private tokenManagerService: TokenManagerService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.accessTokenValid()) {
      this.authenticationService.redirectToHome();
      return false;
    }
    try {
      const isRefreshSuccess =
        await this.tokenManagerService.tryRefreshingTokens();
      if (isRefreshSuccess) {
        this.authenticationService.redirectToHome();
        return false;
      }
      return isRefreshSuccess;
    } catch {
      return true;
    }
  }
}
