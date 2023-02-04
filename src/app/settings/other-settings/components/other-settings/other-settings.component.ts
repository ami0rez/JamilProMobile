import { UserConfigUtils } from './../../../../common/utils/user-config-utils';
import { Component, OnInit } from '@angular/core';
import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { PageBase } from 'src/app/common/models/page-base';
import { LanguageService } from 'src/app/common/services/language.service';
import { OtherSettingsPage } from '../../models/other-settings-page';
import { MemberSettingsManagerService } from '../../services/member-settings-manager.service';

@Component({
  selector: 'app-other-settings',
  templateUrl: './other-settings.component.html',
  styleUrls: ['./other-settings.component.scss'],
})
export class OtherSettingsComponent extends PageBase implements OnInit {
  pageObject: OtherSettingsPage = new OtherSettingsPage();
  routes = RoutesConstants;

  constructor(
    private memberSettingsManagerService: MemberSettingsManagerService,
    private readonly languageService: LanguageService
  ) {
    super();
  }

  async ngOnInit() {
    this.userConfig = await UserConfigUtils.getUserConfig();
    this.memberSettingsManagerService.getOtherSettings(this.pageObject);
  }

  async handelNotificationChange() {
    await this.memberSettingsManagerService.updateNtiofications(
      this.pageObject
    );
  }

  /*
   *  @description On language change
   */
  onLanguageChange() {
    this.updateConfig();
    this.languageService.onLanguageChange();
  }
}
