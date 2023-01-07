import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { IonModal } from '@ionic/angular';
import { BarberSalonPage } from '../salon-profile/models/salon-page';
import { SalonManagerService } from '../common/services/salon-manager.service';

@Component({
  selector: 'app-salon-time-editor',
  templateUrl: './salon-time-editor.component.html',
  styleUrls: ['./salon-time-editor.component.scss'],
})
export class SalonTimeEditorComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  
  @Input()
  pageObject: BarberSalonPage;

  date;
  constructor(
    private location: Location, 
    private barberManagerService: SalonManagerService) {
  }

  saveProfile() {
    this.barberManagerService.saveSalon(this.pageObject);
  }

  ngOnInit() { }


  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    console.log(this.pageObject);
  }

}
