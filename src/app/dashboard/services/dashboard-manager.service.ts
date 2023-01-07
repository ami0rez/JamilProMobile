import { Injectable } from '@angular/core';
import { ErrorMessagesService } from 'src/app/common/services/error-messages.service';
import { DashboardPage } from '../models/dashboard-page';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardManagerService {
  constructor(
    private dashboardService: DashboardService,
    private errorMessagesService: ErrorMessagesService
  ) {}

  /*
   *  @description Get advance
   */
  async getAdvance(pageObject: DashboardPage) {
    var advance = await await this.dashboardService.getAdvance().toPromise();
    advance.salonNextStep = this.errorMessagesService[advance.salonNextStep];
    pageObject.data.advance = advance;
  }
  /*
   *  @description Get advance
   */
  async getTodaysAppointments(pageObject: DashboardPage) {
    var appointments = await await this.dashboardService
      .getTodaysAppointments(pageObject.request)
      .toPromise();
    pageObject.data.appointments = [
      ...pageObject.data.appointments,
      ...appointments,
    ];
  }
}
