import { Component, OnInit } from '@angular/core';
import { MemberProfilePage } from '../../models/member-profile-page';

import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera/dist/esm/definitions';

import { NotificationService } from 'src/app/common/services/notification.service';
import { MemberProfileManagerService } from '../../services/member-profile-manager.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
})
export class MemberProfileComponent implements OnInit {
  pageObject: MemberProfilePage = new MemberProfilePage();
  options: ImageOptions = {
    quality: 100,
    source: CameraSource.Prompt,
    resultType: CameraResultType.Base64,
  };
  constructor(
    // private camera: Camera,
    private notificationService: NotificationService,
    private readonly memberProfileManagerService: MemberProfileManagerService
  ) {}

  async ngOnInit() {
    await this.memberProfileManagerService.getMemberProfile(this.pageObject);
  }

  /*
  *  @description Pick image
  */
  pickImage() {
    Camera.getPhoto(this.options).then(
      (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData.base64String;
        this.pageObject.data.profile.image = imageData.base64String;
        this.pageObject.base64Image = base64Image;
      },
      (err) => {
        this.notificationService.showError(err);
      }
    );
  }

  /*
  *  @description Save profile
  */
  async save() {
    await this.memberProfileManagerService.saveMemberProfile(this.pageObject);
  }
}
