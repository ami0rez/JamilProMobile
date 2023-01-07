import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppointmentPage } from '../../models/appointment-page';
import { AppointmentManagerService } from '../../services/appointment-manager.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss'],
})
export class AppointmentEditComponent implements OnInit {
  pageObject: AppointmentPage = new AppointmentPage();
  constructor(
    private activatedRoute: ActivatedRoute,
    private membersManagerService: AppointmentManagerService
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.pageObject.data.appointmentId = params['id'];
      if (this.pageObject.data.appointmentId) {
        await this.membersManagerService.getAppointmentById(this.pageObject);
      }
    });
  }

  async confirmAppointment(){
    await this.membersManagerService.confirmAppointment(this.pageObject);
  }
  async rejectAppointment(){
    await this.membersManagerService.rejectAppointment(this.pageObject);
  }
}
