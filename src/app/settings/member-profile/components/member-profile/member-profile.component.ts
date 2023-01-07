import { Component, OnInit } from '@angular/core';
import { MemberProfilePage } from '../../models/member-profile-page';
// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { NotificationService } from 'src/app/common/services/notification.service';
import { MemberProfileManagerService } from '../../services/member-profile-manager.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
})
export class MemberProfileComponent implements OnInit {
  pageObject: MemberProfilePage = new MemberProfilePage();
  // options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   saveToPhotoAlbum: false,
  // };
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
    // this.camera.getPicture(this.options).then(
    //   (imageData) => {
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     this.pageObject.data.profile.image = imageData;
    //     this.pageObject.base64Image = base64Image;
    //   },
    //   (err) => {
    //     this.notificationService.showError(err);
    //   }
    // );
  }

  /*
  *  @description Save profile
  */
  async save() {
    await this.memberProfileManagerService.saveMemberProfile(this.pageObject);
  }
}
