import { ListItem } from './../../../../common/models/list-item';
import { ServiceTreatmentTypeResponse } from './../../models/service-treatment-type-response';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-treatment-types',
  templateUrl: './treatment-types.component.html',
  styleUrls: ['./treatment-types.component.scss'],
})
export class TreatmentTypesComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  @Input()
  treatments: ServiceTreatmentTypeResponse[] = []

  @Input()
  showChips = true;

  disableCheckBoxes = false;
  constructor() { }

  get selectedItems(): ListItem[] {
    var items = [];
    this.treatments.forEach(types => {
      items = [...items, ...types.treatments.filter(item => item.selected)];
    })
    return items;
  }

  ngOnInit() { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  checkBoxChnage() {
    const count = this.countSelectedTreatments();
    this.disableCheckBoxes = count >= 3;
  }

  countSelectedTreatments() {
    var count = 0;
    this.treatments.forEach(types => {
      count += types.treatments.filter(item => item.selected)?.length ?? 0;
    })
    return count;
  }
}