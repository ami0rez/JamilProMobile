import { ConfirmationService } from './../../services/confirmation.service';
import { ConfirmationModel } from './../../models/confirmation-model';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  pageObject: ConfirmationModel = new ConfirmationModel();
  modalVisible = false;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.confirmationService.onDisplay.subscribe((confirmation) => {
      this.modalVisible = true;
      this.pageObject = confirmation;
    });
  }

  async cancel() {
    this.modalVisible = false;
    if (this.pageObject.onCancel) {
      await this.pageObject.onCancel();
    }
  }

  async confirm() {
    this.modalVisible = false;
    if (this.pageObject.onCancel) {
      await this.pageObject.onConfirm();
    }
  }
}
