import { PageBase } from 'src/app/common/models/page-base';
import { Component, OnInit } from '@angular/core';
import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SalonManagerService } from 'src/app/settings/common/services/salon-manager.service';
import { BarberSettingsPage } from './../../models/settings-page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class BarberSettingsComponent extends PageBase implements OnInit {
  pageObject: BarberSettingsPage = new BarberSettingsPage();
  routes = RoutesConstants;
  constructor(
    private authenticationService: AuthenticationService,
    private barberManagerService: SalonManagerService
  ) {
    super();
  }

  ngOnInit() {
    this.barberManagerService.getSalonProfile(this.pageObject);
  }

  logout() {
    this.authenticationService.logout();
  }
}
