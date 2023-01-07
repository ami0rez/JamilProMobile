import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentListItem } from 'src/app/appointments/models/appointment-list-item';
import PaginationRequest from 'src/app/common/models/pagination-request';

import { AppConfigService } from 'src/app/common/services/app-config-service';
import { ProfileAdvanceResponse } from '../models/profile-advance';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly memberDashboardUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/MemberDashboard';
  readonly appointmentUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Appointment';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get members
   */
  public getAdvance(): Observable<ProfileAdvanceResponse> {
    return this.http.get<ProfileAdvanceResponse>(
      `${this.memberDashboardUrl}/Advance`
    );
  }

  /*
   *  @description Get appointments
   */
  public getTodaysAppointments(
    request: PaginationRequest
  ): Observable<AppointmentListItem[]> {
    return this.http.post<AppointmentListItem[]>(`${this.appointmentUrl}/Today`, request);
  }
}
