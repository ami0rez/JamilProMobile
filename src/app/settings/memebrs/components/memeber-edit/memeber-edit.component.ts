import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MembersPage } from '../../models/members-page';
import { MembersManagerService } from '../../services/members-manager.service';

@Component({
  selector: 'app-memeber-edit',
  templateUrl: './memeber-edit.component.html',
  styleUrls: ['./memeber-edit.component.scss'],
})
export class MemeberEditComponent implements OnInit {
  pageObject = new MembersPage();

  constructor(
    private activatedRoute: ActivatedRoute,
    private memebersManagerService: MembersManagerService
  ) {}
  async ngOnInit() {
    await this.memebersManagerService.getServiceOptions(this.pageObject);
    this.activatedRoute.params.subscribe(async (params) => {
      this.pageObject.data.memberId = params['id'];
      if (this.pageObject.data.memberId) {
        this.memebersManagerService.getMemberById(this.pageObject);
        this.pageObject.editPageTitle = $localize`:@@team.updateMember:Update a member`;
      } else {
        this.pageObject.editPageTitle = $localize`:@@team.addMember:Add a member`;
      }
    });
  }

  saveMember() {}
  deleteMember() {}

  cancel() {}

  async save() {
    await this.memebersManagerService.saveMember(this.pageObject);
  }

  async remove() {
    await this.memebersManagerService.removeMember(this.pageObject);
  }
}
