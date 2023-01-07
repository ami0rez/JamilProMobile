import { PageBase } from 'src/app/common/models/page-base';
import { Component, OnInit } from '@angular/core';
import { MembersPage } from '../../models/members-page';
import { MembersManagerService } from '../../services/members-manager.service';
import { MemberItemResponse } from './../../models/member-item-reposne';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent extends PageBase {
  pageObject = new MembersPage();
  constructor(private membersManagerService: MembersManagerService) {
    super();
  }

  async ionViewWillEnter() {
    this.membersManagerService.initMembersListControls(this.pageObject);
    await this.membersManagerService.getMemberList(this.pageObject);
  }

  async editMember(member: MemberItemResponse) {
    await this.membersManagerService.editMember(member, this.pageObject);
  }
}
