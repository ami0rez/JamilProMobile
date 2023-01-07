import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

import { RoutesConstants } from 'src/app/common/constants/routes-constants';
import { MembersPage } from '../models/members-page';
import { ServiceService } from 'src/app/services/service-list/services/service.service';
import { SelectListItem } from 'src/app/common/models/select-liast-item';
import { TranslationService } from 'src/app/common/services/translation.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { MembrsService } from './membrs.service';
import { ConfirmationService } from 'src/app/common/services/confirmation.service';
import { MemberItemResponse } from '../models/member-item-reposne';
import { UpdateMemberQuery } from '../models/update-member-query';
import { CreateMemberQuery } from '../models/create-member-query';
import { Patterns } from 'src/app/common/models/patterns';

@Injectable({
  providedIn: 'root',
})
export class MembersManagerService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private membrsService: MembrsService,
    private translationService: TranslationService,
    private notificationService: NotificationService,
    private location: Location,
    private confirmationService: ConfirmationService
  ) {}

  /*
   *  @description Get service by id
   */
  async initializeMode(pageObject: MembersPage) {
    this.activatedRoute.params.subscribe(async (params) => {
      pageObject.data.memberId = params['id'];
      if (pageObject.data.memberId) {
        this.getMemberById(pageObject);
        pageObject.editPageTitle = $localize`:@@team.updateMember:Update a member`;
      } else {
        pageObject.editPageTitle = $localize`:@@team.addMember:Add a member`;
      }
    });
  }

  /*
   *  @description Get member list
   */
  async getMemberList(pageObject: MembersPage) {
    var list = await this.membrsService.getMembers().toPromise();
    pageObject.data.memberList = list.map((item) => ({
      ...item,
      image: item.image ?? pageObject.defaultAvatar,
    }));
  }
  /*
   *  @description Get salon services
   */
  async getServiceOptions(pageObject: MembersPage) {
    var result = await this.serviceService.getSalonServices().toPromise();
    pageObject.serviceOptions = result.categories.map((item) => ({
      id: item.id,
      name: item.name,
      options: item.services.map((serv) => {
        var item: SelectListItem = {
          label: serv.name,
          value: serv.id,
          selected: false,
        };
        return item;
      }),
    }));
  }
  /*
   *  @description Get service by id
   */
  async editMember(member: MemberItemResponse, pageObject: MembersPage) {
    this.router.navigate([RoutesConstants.memeberEdit, member?.id]);
  }
  /*
   *  @description Get service by id
   */
  async getMemberById(pageObject: MembersPage) {
    var service = await this.membrsService
      .getMemberById(pageObject.data.memberId)
      .toPromise();
    pageObject.data.member = service;
  }

  /*
   *  @description Get salon services
   */
  async saveMember(pageObject: MembersPage) {
    if (!(await this.validateMemberSave(pageObject))) {
      return;
    }
    if (pageObject.data.memberId) {
      await this.updateMember(pageObject);
    } else {
      await this.createMember(pageObject);
    }
  }

  /*
   *  @description Delete member
   */
  async removeMember(pageObject: MembersPage) {
    this.confirmationService.confirm({
      fullTitle: $localize`:@@team.removeFromTeam:Remove from team`,
      fullDescription: this.translationService.translateWithVariable(
        $localize`:@@team.removeFromTeamDesc:Are you sure you want to remove '{0}' from the team`,
        pageObject.data.member.lastName + ' ' + pageObject.data.member.firstName
      ),
      onConfirm: async () => {
        await this.membrsService
          .removeMember(pageObject.data.memberId)
          .toPromise();
        this.notificationService.showDeleteSuccess();
        this.location.back();
      },
      onCancel: () => {},
    });
  }

  /*
   *  @description Validate member save
   */
  async validateMemberSave(pageObject: MembersPage) {
    if (!pageObject.data.member.firstName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@team.firstName:First name`
        )
      );
      return false;
    }
    if (!pageObject.data.member.lastName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@team.lastName:Last name`
        )
      );
      return false;
    }
    if (!pageObject.data.member.email) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@team.email:Email`
        )
      );
      return false;
    }
    if (!pageObject.data.member.role && pageObject.data.member.role !== 0) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@team.role:Role`
        )
      );
      return false;
    }

    if (!Patterns.email.test(pageObject.data.member.email)) {
      await this.notificationService.showError(
        $localize`:@@team.wrongEmailFormat: Email format is wrong`
      );
      return false;
    }

    if (
      !!pageObject.data.member.phoneNumber &&
      !Patterns.phone.test(pageObject.data.member.phoneNumber)
    ) {
      await this.notificationService.showError(
        $localize`:@@team.wrongPhoneNumberFormat: Phone number format is wrong`
      );
      return false;
    }
    if (
      !pageObject.data.member.services ||
      !pageObject.data.member.services.length
    ) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage(
          $localize`:@@team.services:Services`
        )
      );
      return false;
    }
    return true;
  }
  /*
   *  @description Create member
   */
  async createMember(pageObject: MembersPage) {
    var query: CreateMemberQuery = {
      ...pageObject.data.member,
    };
    var result = await this.membrsService.createMember(query).toPromise();
    pageObject.data.member.id = result.id;
    pageObject.data.memberId = result.id;
    this.notificationService.showSaveSuccess();
  }

  /*
   *  @description Update member
   */
  async updateMember(pageObject: MembersPage) {
    var query: UpdateMemberQuery = {
      ...pageObject.data.member,
    };
    var result = await this.membrsService
      .updateMember(pageObject.data.memberId, query)
      .toPromise();
    this.notificationService.showSaveSuccess();
  }

  initMembersListControls(pageObject: MembersPage) {
    pageObject.controls = [
      {
        label: $localize`:@@team.addMember: Add memeber`,
        icon: 'add',
        onClick: () => this.redirectToMemeberAdd(),
      },
    ];
  }

  /*
   *  @description Redirect to memeber add page
   */
  redirectToMemeberAdd() {
    this.router.navigate([RoutesConstants.memeberEdit]);
  }
}
