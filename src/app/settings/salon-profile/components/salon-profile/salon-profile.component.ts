import { PageBase } from './../../../../common/models/page-base';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { BarberSalonPage } from '../../models/salon-page';
import { NotificationService } from 'src/app/common/services/notification.service';
import { SalonManagerService } from 'src/app/settings/common/services/salon-manager.service';

@Component({
  selector: 'app-salon-profile',
  templateUrl: './salon-profile.component.html',
  styleUrls: ['./salon-profile.component.scss'],
})
export class BarberShopProfileComponent extends PageBase implements OnInit {
  pageObject: BarberSalonPage = new BarberSalonPage();
  // options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   saveToPhotoAlbum: false,
  // };
  constructor(
    // private camera: Camera,
    private location: Location,
    private barberManagerService: SalonManagerService,
    private notificationService: NotificationService
  ) {
    super();
  }

  async ngOnInit() {
    await this.barberManagerService.getSalon(this.pageObject);
  }

  saveProfile() {
    this.barberManagerService.saveSalon(this.pageObject);
  }
  goBack() {
    this.location.back();
  }

  pickImage() {
    // this.camera.getPicture(this.options).then(
    //   (imageData) => {
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     this.pageObject.data.image = imageData;
    //     this.pageObject.base64Image = base64Image;
    //   },
    //   (err) => {
    //     this.notificationService.showError(err);
    //   }
    // );
  }
}
