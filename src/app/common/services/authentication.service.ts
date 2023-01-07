import { StorageUtils } from './../utils/storage-utils';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfile } from '../models/user-profile';
import { AuthenticationSettings } from '../models/authentication-settings';
// import { AuthenticationResponse } from 'src/app/authentification/models/authentication-response';
import { RefreshTokenResponse } from '../models/refresh-token-response';
import { UserConfigUtils } from '../utils/user-config-utils';
import { RoutesConstants } from '../constants/routes-constants';

@Injectable({
  providedIn: 'root',
})
/**
 *  @description Manage logged user and authentication
 */
export class AuthenticationService {
  // private readonly profileKey = 'profile';
  private readonly authenticationSettingsKey = 'auth-settings';
  private user = null;
  private authSettings = null;
  private authChangeSub = new Subject<UserProfile>();
  public authChanged = this.authChangeSub.asObservable();
  private jwtHelper: JwtHelperService;

  userProfile: UserProfile;

  

  constructor(private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  /**
   *  @description Check if user authenticated
   */
  public get userAuthenticated() {
    return this.userProfile !== null;
  }

  /**
   *  @description Get authentication settings
   */
  public get authenticationSettings(): AuthenticationSettings {
    if (this.authSettings) {
      return this.authSettings;
    }
    const jsonSettings = localStorage.getItem(this.authenticationSettingsKey);
    this.authSettings = JSON.parse(jsonSettings);
    return this.authSettings;
  }

  /**
   *  @description Get authentication settings
   */
  public async loadAuthenticationSettings() {
    this.authSettings = await StorageUtils.getItem(this.authenticationSettingsKey);
  }

  /**
   *  @description get user profile
   */
  public async loadUserProfile() {
    const userConfig = await UserConfigUtils.getUserConfig();
    this.userProfile = userConfig.profile;
  }

  /**
   *  @description Send a notification about user authentication status
   */
  public sendAuthenticatedNotification(user: UserProfile) {
    this.authChangeSub.next(user);
  }

  /**
   *  @description Get Access Token
   */
  public accessTokenValid(): boolean {
    const token = this.authenticationSettings?.accessToken;
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  /**
   *  @description save settings after user connected
   */
  async completeAuthentication(response: any) {
    await UserConfigUtils.saveUserProfileProperties(response.profile);
    const authentication: AuthenticationSettings = {
      accessToken: response.accessToken,
      accessTokenType: response.accessTokenType,
      refreshToken: response.refreshToken,
    };
    await StorageUtils.setItem(
      this.authenticationSettingsKey,
      JSON.stringify(authentication)
    );
    this.authSettings = authentication;
    this.sendAuthenticatedNotification(response.profile);
    this.redirectToHome();
  }
  /**
   *  @description save new access token and refresh token after token is refreshed
   */
  async completeSilentRenew(response: RefreshTokenResponse) {
    const authentication: AuthenticationSettings = {
      ...this.authenticationSettings,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
    await StorageUtils.setItem(
      this.authenticationSettingsKey,
      JSON.stringify(authentication)
    );
  }

  /**
   *  @description start authenticating
   */
  async startAuthentication() {
    UserConfigUtils.removeUserProfile();
    await StorageUtils.removeItem(this.authenticationSettingsKey);
    this.user = null;
    this.authSettings = null;
    this.sendAuthenticatedNotification(null);
    this.router.navigate([RoutesConstants.login]);
  }

  /**
   *  @description redirect To Home
   */
  redirectToHome() {
    this.router.navigate([RoutesConstants.home]);
  }

  /**
   *  @description logout
   */
  public logout() {
    StorageUtils.removeItem(this.authenticationSettingsKey);
    UserConfigUtils.initUserConfig();
    this.user = null;
    this.authSettings = null;
    this.sendAuthenticatedNotification(null);
    this.router.navigate([RoutesConstants.login]);
  }
  F;

  /**
   *  @description  get authorization header (token)
   */
  getAuthorizationHeaderValue(): string {
    if (
      this.userProfile === null ||
      this.userProfile === undefined ||
      this.authenticationSettings?.accessToken === null ||
      this.authenticationSettings?.accessToken === undefined
    ) {
      return '';
    } else {
      return `${this.authenticationSettings.accessTokenType} ${this.authenticationSettings.accessToken}`;
    }
  }
}
