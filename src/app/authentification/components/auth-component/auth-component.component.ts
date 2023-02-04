import { UserConfigUtils } from 'src/app/common/utils/user-config-utils';
import { PageBase } from 'src/app/common/models/page-base';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../../models/login-page';
import { LoginManagerService } from '../../services/login-manager.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { HttpRequestsService } from 'src/app/common/services/http-requests.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent extends PageBase implements OnInit {
  pageObject: LoginPage = new LoginPage();
  isLoading: boolean = false;
  constructor(
    private loginManagerService: LoginManagerService,
    private notificationService: NotificationService,
    private httpRequestsService: HttpRequestsService
  ) {
    super();
    // GoogleAuth.initialize({
    //   clientId: '772374373898-qkfngn17t3tj3b314up142oqkv96bpic.apps.googleusercontent.com',
    //   scopes: ['profile', 'email'],
    //   grantOfflineAccess: true,
    // });
  }

  async ngOnInit() {
    if(!(await UserConfigUtils.getUserConfig())?.visitedStarter){
      this.loginManagerService.redirectToStarter();
    }
  }

  change(event) {
    this.pageObject.screen = event;
    this.httpRequestsService.onError(
      (val) => (this.pageObject.res = JSON.stringify(val))
    );
  }
  async signup(){
    this.loginManagerService.redirectToRegister();
  }

  async login() {
    await this.loginManagerService.login(this.pageObject);
  }

  async register() {
    await this.loginManagerService.register(this.pageObject);
  }

  async googleSignIn() {
    let googleUser = await GoogleAuth.signIn();
    console.debug(googleUser);
    
    // const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
    // return this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
  }
}