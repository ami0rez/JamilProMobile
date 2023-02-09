
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { ChangePasswordData } from '../models/change-password-data';

@Injectable({
  providedIn: 'root',
})
export class ChnagePasswordService {
  readonly accountUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Account';
  readonly salonUrl = this.appConfigService.appConfig.apiUrl + 'api/v1/Salon';
  readonly userUrl = this.appConfigService.appConfig.apiUrl + 'api/v1/User';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  public changePassword(query: ChangePasswordData): Observable<void> {
    return this.http.post<void>(
      `${this.accountUrl}/ChangePassword`, query
    );
  }
}
