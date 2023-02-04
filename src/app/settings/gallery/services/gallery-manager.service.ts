import { GalleryService } from './gallery.service';
import { GalleryPage } from './../models/gallery-page';
import { Injectable } from '@angular/core';

import { Camera } from '@capacitor/camera';
import {
  CameraResultType,
  CameraSource,
  ImageOptions,
} from '@capacitor/camera/dist/esm/definitions';

import { NotificationService } from 'src/app/common/services/notification.service';
import { AppConfigService } from 'src/app/common/services/app-config-service';

@Injectable({
  providedIn: 'root',
})
export class GalleryManagerService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly galleryService: GalleryService,
    private appConfigService: AppConfigService
  ) {}

  initGalleryControls(pageObject: GalleryPage) {
    pageObject.controls = [
      {
        label: $localize`:@@gallery.addImage:Add Image`,
        icon: 'image',
        onClick: () => this.pickImage(pageObject),
      },
      {
        label: $localize`:@@gallery.addVideo:Add Video`,
        icon: 'videocam',
        onClick: () => this.pickVideo(pageObject),
      },
    ];
  }

  async loadImages(pageObject: GalleryPage) {
    var imagePaths = await this.galleryService.getGalleryImages().toPromise();
    pageObject.data.gallery.images = imagePaths.map(
      (imageSource) => this.appConfigService.appConfig.apiUrl + imageSource
    );
  }

  redirectToUploadGallery() {
    // this.videoPlayer
    //   .play(
    //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    //   )
    //   .then(() => {
    //     console.log('video completed');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  pickImage(pageObject: GalleryPage) {
    const options: ImageOptions = {
      quality: 100,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64,
    };
    Camera.getPhoto(options).then(
      async (imageData) => {
        console.log(imageData);
        var query = {
          base64Image: imageData.base64String,
        };
        await this.galleryService.saveGalleryImage(query).toPromise();
        console.log('saved');
        let base64Image = 'data:image/jpeg;base64,' + imageData.base64String;
        pageObject.data.gallery.images.push(base64Image);
      },
      (err) => {
        this.notificationService.showError(err);
      }
    );
  }

  pickVideo(pageObject: GalleryPage) {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   mediaType: this.camera.MediaType.VIDEO,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   saveToPhotoAlbum: false,
    // };
    // this.camera.getPicture(options).then(
    //   async (imageData) => {
    //     console.log('saving');
    //     var query = {
    //       base64Video: imageData,
    //     };
    //     await this.galleryService.saveGalleryVideo(query).toPromise();
    //     console.log('saved');
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     pageObject.data.gallery.images.push(base64Image);
    //   },
    //   (err) => {
    //     this.notificationService.showError(err);
    //   }
    // );
  }
}
