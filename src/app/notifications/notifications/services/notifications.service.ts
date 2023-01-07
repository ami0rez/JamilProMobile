import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PaginationRequest from 'src/app/common/models/pagination-request';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { NotificationListItem } from '../models/notification-list-item';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  readonly notificationUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Notification';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get notifications
   */
  public getNotifications(
    request: PaginationRequest
  ): Observable<NotificationListItem[]> {
    return this.http.post<NotificationListItem[]>(
      `${this.notificationUrl}`,
      request
    );
  }

  /*
   *  @description Get notifications
   */
  public getNotificationCount(): Observable<number> {
    return this.http.get<number>(`${this.notificationUrl}/Count`);
  }

  /*
   *  @description Get notifications
   */
  public makeRecieved(request: PaginationRequest): Observable<void> {
    return this.http.post<void>(`${this.notificationUrl}/Received`, request);
  }

  /*
   *  @description Make notification Seen
   */
  makeSeen(id: string): Observable<void> {
    return this.http.get<void>(`${this.notificationUrl}/Seen/${id}`);
  }
}
