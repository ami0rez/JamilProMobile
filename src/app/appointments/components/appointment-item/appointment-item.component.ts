import { Component, Input, OnInit } from '@angular/core';
import { AppointmentListItem } from '../../models/appointment-list-item';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.scss'],
})
export class AppointmentItemComponent implements OnInit {
  @Input()
  appointment: AppointmentListItem = new AppointmentListItem();
  constructor() {}

  ngOnInit() {}
}
