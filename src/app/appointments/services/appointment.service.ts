import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PaginationRequest from 'src/app/common/models/pagination-request';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { AppointmentItem } from '../models/appointment-item';
import { AppointmentListItem } from '../models/appointment-list-item';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  readonly appointmentUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Appointment';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get appointments
   */
  public getAppointments(
    request: PaginationRequest
  ): Observable<AppointmentListItem[]> {
    return this.http.post<AppointmentListItem[]>(
      `${this.appointmentUrl}/Paginate`,
      request
    );
  }

  /*
   *  @description Get appointment by id
   */
  public getAppointmentById(id: string): Observable<AppointmentItem> {
    return this.http.get<AppointmentItem>(`${this.appointmentUrl}/${id}`);
  }

  /*
   *  @description Confirm appointment
   */
  confirmAppointment(id: string): Observable<void> {
    return this.http.get<void>(`${this.appointmentUrl}/Confirm/${id}`);
  }

  /*
   *  @description Reject appointment
   */
  rejectAppointment(id: string): Observable<void> {
    return this.http.get<void>(`${this.appointmentUrl}/Reject/${id}`);
  }
}
