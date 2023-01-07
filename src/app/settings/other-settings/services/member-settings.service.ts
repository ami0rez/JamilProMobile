import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { OtherSettingsItem } from '../models/other-settings.item';

@Injectable({
  providedIn: 'root',
})
export class MembrSettingsService {
  readonly memberSettingsUrl = this.appConfigService.appConfig.apiUrl + 'api/v1/MemberSetting';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get members
   */
  public getOtherSettings(): Observable<OtherSettingsItem> {
    return this.http.get<OtherSettingsItem>(`${this.memberSettingsUrl}`);
  }

  /*
   *  @description Update notifications
   */
  public updateNotifications(value: boolean): Observable<void> {
    return this.http.get<void>(`${this.memberSettingsUrl}/Notifications/${value}`);
  }

  /*
   *  @description Update language
   */
  public updateLanguage(value: string): Observable<void> {
    return this.http.get<void>(`${this.memberSettingsUrl}/Language/${value}`);
  }
}
