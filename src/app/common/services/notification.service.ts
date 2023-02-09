import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Constants } from '../models/constants';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private lifeTime = Constants.notificationLifeTime;
  private longLifeTime = Constants.longNotificationLifeTime;
  private saveSuccessMessage = $localize`:@@global.traitementSucces: Processing completed successfully`;
  private deleteSuccessMessage = $localize`:@@global.deleteSucces: Deletion completed successfully`;
  private position: 'top' | 'middle' | 'bottom' = 'bottom';

  constructor(private toastController: ToastController) {}

  async showSaveSuccess() {
    await this.showSuccess(this.saveSuccessMessage);
  }
  async showUpdateTemplateSuccess(entity: string) {
    if (!entity) {
      return;
    }
    let message = $localize`:@@modificationTemplateSucces:Modification of {0} have been done successfully`
    message = message.replace(/{(\d+)}/g, (match, num) => {
      return entity;
    });
    await this.showSuccess(message);
  }
  async showDeleteSuccess() {
    await this.showSuccess(this.deleteSuccessMessage);
  }

  async showSuccess(message, longDuration: boolean = false) {
    const toast = await this.toastController.create({
      message: `${message}`,
      position: this.position,
      duration: longDuration ? this.longLifeTime : this.lifeTime,
      cssClass: 'success-toast',
    });
    await toast.present();
  }
  async showError(data) {
    const toast = await this.toastController.create({
      message: `${data}`,
      position: this.position,
      duration: this.lifeTime,
      cssClass: 'error-toast',
    });
    await toast.present();
  }
  async showWarning(data) {
    const toast = await this.toastController.create({
      message: `${data}`,
      position: this.position,
      duration: this.lifeTime,
      cssClass: 'warning-toast',
    });
    await toast.present();
  }

  async show(data) {
    const toast = await this.toastController.create({
      message: `${data}`,
      position: this.position,
      duration: this.lifeTime,
    });
    await toast.present();
  }
}
