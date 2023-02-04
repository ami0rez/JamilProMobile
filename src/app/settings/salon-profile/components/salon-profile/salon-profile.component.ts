import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { PageBase } from './../../../../common/models/page-base';

import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera/dist/esm/definitions';

import { NotificationService } from 'src/app/common/services/notification.service';
import { SalonManagerService } from 'src/app/settings/common/services/salon-manager.service';
import { BarberSalonPage } from '../../models/salon-page';

@Component({
  selector: 'app-salon-profile',
  templateUrl: './salon-profile.component.html',
  styleUrls: ['./salon-profile.component.scss'],
})
export class BarberShopProfileComponent extends PageBase implements OnInit {
  pageObject: BarberSalonPage = new BarberSalonPage();
  options: ImageOptions = {
    quality: 100,
    source: CameraSource.Prompt,
    resultType: CameraResultType.Base64,
  };
  constructor(
    // private camera: Camera,
    private location: Location,
    private barberManagerService: SalonManagerService,
    private notificationService: NotificationService,
    public platform: Platform
  ) {
    super();
  }

  async ngOnInit() {
    // if(this.platform.is("android") || this.platform.is("ios") ){
    //   Camera.requestPermissions({permissions: ['photos']})
    // }
    await this.barberManagerService.getSalon(this.pageObject);
  }

  saveProfile() {
    this.barberManagerService.saveSalon(this.pageObject);
  }
  goBack() {
    this.location.back();
  }

  pickImage() {
    Camera.getPhoto(this.options).then(
      (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData.base64String;
        this.pageObject.data.image = imageData.base64String;
        this.pageObject.base64Image = base64Image;
      },
      (err) => {
        this.notificationService.showError(err);
      }
    );
  }
}
