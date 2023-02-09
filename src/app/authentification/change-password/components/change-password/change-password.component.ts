import { PageBase } from 'src/app/common/models/page-base';
import { Component, OnInit } from '@angular/core';
import { ChangePasswordPage } from '../../models/change-password-page';
import { ChnagePasswordManagerService } from '../../services/chnage-password-manager.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends PageBase implements OnInit {
  pageObject: ChangePasswordPage = new ChangePasswordPage();

  constructor(
    private chnagePasswordManagerService: ChnagePasswordManagerService
  ) {
    super();
  }

  async ngOnInit() {
    this.userConfig = await this.loadConfig();
    this.pageObject.imageUrl = this.userConfig.profile.avatar;
  }

  save() {
    this.chnagePasswordManagerService.changePassword(this.pageObject);
  }
}
