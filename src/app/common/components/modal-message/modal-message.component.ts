import {
  AfterContentInit,
  Component,
  QueryList,
  ViewChildren
} from '@angular/core';
import { IonModal } from '@ionic/angular';

import { ModalNotification } from '../../models/modal-notification';
import { ModalNotificationEvents } from '../../models/modal-notification-events';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss'],
})
export class ModalMessageComponent implements AfterContentInit {
  @ViewChildren(IonModal) modal: QueryList<IonModal>;
  pageObject: ModalNotification = new ModalNotification();
  isModalOpen = false;
  constructor() {}

  ngAfterContentInit() {
    ModalNotificationEvents.modaleNotificationDataChange.subscribe((data) => {
      this.pageObject = data;
    });
    ModalNotificationEvents.modaleNotificationStateChange.subscribe((state) => {
      this.isModalOpen = state;
    });
  }
}
