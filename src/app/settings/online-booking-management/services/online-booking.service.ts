import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from 'src/app/common/services/app-config-service';
import { OnlineBookingSettingsItem } from '../models/online-booking-settings-item';

@Injectable({
  providedIn: 'root'
})
export class OnlineBookingService {

  readonly onlineBookingUrl =
  this.appConfigService.appConfig.apiUrl + 'api/v1/OnlineBooking';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
  *  @description Save online booking settings
  */
  public saveOnlineBooking(query: OnlineBookingSettingsItem): Observable<OnlineBookingSettingsItem> {
    return this.http.post<OnlineBookingSettingsItem>(`${this.onlineBookingUrl}`, query);
  }

  /*
  *  @description Get online booking settings
  */
  public getOnlineBooking(): Observable<OnlineBookingSettingsItem> {
    return this.http.get<OnlineBookingSettingsItem>(`${this.onlineBookingUrl}`);
  }
}
