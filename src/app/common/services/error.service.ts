import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Constants } from '../models/constants';
import { ErrorMessagesService } from './error-messages.service';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(
    private toastController: ToastController,
    private errorMessagesService: ErrorMessagesService
  ) {}
  lifeTime = Constants.notificationLifeTime;
  position: 'top' | 'middle' | 'bottom' = 'bottom';
  async showErrors(data) {
    const toast = await this.toastController.create({
      message: `${data.reason}`,
      position: this.position,
      duration: this.lifeTime,
    });
    await toast.present();
  }

  async showServerErrors(data) {
    let severity = 'error';
    let summary = this.errorMessagesService.error;
    switch (data.status) {
      case 0:
        severity = 'success';
        summary = this.errorMessagesService.success;
        break;
      case 1:
        severity = 'info';
        summary = this.errorMessagesService.info;
        break;
      case 2:
        severity = 'warn';
        summary = this.errorMessagesService.warning;
    }

    const toast = await this.toastController.create({
      message: `${data.reason}`,
      position: this.position,
      duration: this.lifeTime,
    });
    await toast.present();
  }
}
