import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/authentification/services/token.service';
import { RefreshTokenQuery } from '../models/refresh-token-query';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
/**
 *  @description Manage user tokens
 */
export class TokenManagerService {
  constructor(
    private tokenService: TokenService,
    private authenticationService: AuthenticationService
  ) {}

  /**
   *  @description Refresh user token
   */
  async tryRefreshingTokens(): Promise<boolean> {
    const authSettings = this.authenticationService.authenticationSettings;
    const query: RefreshTokenQuery = {
      accessToken: authSettings.accessToken,
      refreshToken: authSettings.refreshToken,
    };
    const refreshTokenResponse = await this.tokenService
      .refresh(query)
      .toPromise();
    this.authenticationService.completeSilentRenew(refreshTokenResponse);
    return true;
  }
}
