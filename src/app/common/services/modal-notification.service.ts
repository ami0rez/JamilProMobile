import { Injectable } from '@angular/core';

import { Constants } from '../models/constants';
import { ModalNotificationEvents } from '../models/modal-notification-events';

@Injectable({ providedIn: 'root' })
export class ModalNotificationService {
  private static lifeTime = Constants.notificationLifeTime;
  private static longLifeTime = Constants.longNotificationLifeTime;
  private saveSuccessMessage = $localize`:@@global.traitementSucces: Processing completed successfully`;
  private deleteSuccessMessage = $localize`:@@global.deleteSucces: Deletion completed successfully`;

  constructor() {}

  async showSaveSuccess() {
    await this.showSuccess(this.saveSuccessMessage);
  }
  async showDeleteSuccess() {
    await this.showSuccess(this.deleteSuccessMessage);
  }

  async showSuccess(message, longDuration: boolean = false) {
    ModalNotificationEvents.modaleNotificationDataChange.next({
      message: message,
    });
    ModalNotificationEvents.modaleNotificationStateChange.next(true);
    let showMessage = new Promise(function (resolve, reject) {
      setTimeout(
        () => {
          ModalNotificationEvents.modaleNotificationStateChange.next(false);
          resolve('finished');
        },
        longDuration
          ? ModalNotificationService.longLifeTime
          : ModalNotificationService.lifeTime
      );
    });
    await showMessage;
  }

  // async showError(data) {
  //   const toast = await this.toastController.create({
  //     message: `${data}`,
  //     position: this.position,
  //     duration: this.lifeTime,
  //     cssClass: 'error-toast',
  //   });
  //   await toast.present();
  // }

  // async showWarning(data) {
  //   const toast = await this.toastController.create({
  //     message: `${data}`,
  //     position: this.position,
  //     duration: this.lifeTime,
  //     cssClass: 'warning-toast',
  //   });
  //   await toast.present();
  // }

  // async show(data) {
  //   const toast = await this.toastController.create({
  //     message: `${data}`,
  //     position: this.position,
  //     duration: this.lifeTime,
  //   });
  //   await toast.present();
  // }
}
