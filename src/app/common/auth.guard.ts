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
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private tokenManagerService: TokenManagerService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.accessTokenValid()) {
      if(route.routeConfig.data?.requireAdmin && !this.authenticationService.userProfile?.admin){
        return true;
      }
      return true;
    }
    try {
      const isRefreshSuccess =
        await this.tokenManagerService.tryRefreshingTokens();
      if (!isRefreshSuccess) {
        this.authenticationService.startAuthentication();
      }
      return isRefreshSuccess;
    } catch {
      this.authenticationService.startAuthentication();
      return false;
    }
  }
}
