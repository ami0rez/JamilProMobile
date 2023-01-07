import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { NotificationService } from 'src/app/common/services/notification.service';

import { MembersPage } from '../../models/members-page';
import { MembersManagerService } from '../../services/members-manager.service';

@Component({
  selector: 'app-memeber-edit',
  templateUrl: './memeber-edit.component.html',
  styleUrls: ['./memeber-edit.component.scss'],
})
export class MemeberEditComponent implements OnInit {
  pageObject = new MembersPage();
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

  /*
   *  @description Pick image
   */
  pickImage() {
    // this.camera.getPicture(this.options).then(
    //   (imageData) => {
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     this.pageObject.data.member.image = imageData;
    //     this.pageObject.base64Image = base64Image;
    //   },
    //   (err) => {
    //     this.notificationService.showError(err);
    //   }
    // );
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
