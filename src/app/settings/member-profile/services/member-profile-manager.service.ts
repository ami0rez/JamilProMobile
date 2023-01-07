import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/common/services/notification.service';
import { TranslationService } from 'src/app/common/services/translation.service';
import { MemberProfilePage } from '../models/member-profile-page';
import { MemberProfileResponse } from '../models/member-profile-response';
import { MemberProfileService } from './member-profile.service';

@Injectable({
  providedIn: 'root'
})
export class MemberProfileManagerService {
  constructor(
    private memberProfileService: MemberProfileService,
    private notificationService: NotificationService,
    private translationService: TranslationService) { }


  /*
  *  @description Saves salon's data
  */
  async saveMemberProfile(pageObject: MemberProfilePage) {
    if (!await this.validateMemberProfileQuery(pageObject.data.profile)) {
      return;
    }
    await this.memberProfileService.saveMemberProfile(pageObject.data.profile).toPromise();
    await this.notificationService.showSaveSuccess();
  }

  /*
  *  @description Gets salon's data
  */
  async getMemberProfile(pageObject: MemberProfilePage) {
    var result = await this.memberProfileService.getMemberProfile().toPromise();
    let base64Image = 'data:image/jpeg;base64,' + result.image;
    pageObject.data.profile = { ...result}
    pageObject.base64Image = base64Image;
  }

  /*
  *  @description Validate member profile query
  */
  async validateMemberProfileQuery(query: MemberProfileResponse) {
    if (!query.firstName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@signup.firstName: First Name`)
      );
      return false;
    } if (!query.lastName) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@signup.lastName: Last Name`)
      );
      return false;
    } if (!query.phoneNumber) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@signup.phoneNumber: Phone Number`)
      );
      return false;
    } if (!query.email) {
      await this.notificationService.showError(
        this.translationService.generateRequiredMessage($localize`:@@signup.email: Email`)
      );
      return false;
    } 
    return true;
  }
}
