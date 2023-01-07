import { SalonReachQuery } from './../models/salon-reach-query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/common/services/app-config-service';
// import { SalonProfileDto } from 'src/app/settings/salon-profile/models/salon-dto';
import { RegisterQuery } from '../models/register-query';
import { SalonTypeResponse } from './../models/salon-type-response';
import { AuthenticationResponse } from '../../models/authentication-response';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  readonly accountUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Account';
  readonly salonUrl = this.appConfigService.appConfig.apiUrl + 'api/v1/Salon';
  readonly userUrl = this.appConfigService.appConfig.apiUrl + 'api/v1/User';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  public validateEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.accountUrl}/EmailValidation/${email}`
    );
  }

  public register(query: RegisterQuery): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.accountUrl}/Register`,
      query
    );
  }

  public sendAcountConfirmationSms(
    phoneNumber: string
  ): Observable<AuthenticationResponse> {
    return this.http.get<AuthenticationResponse>(
      `${this.userUrl}/SendPhoneNumberVerification/${phoneNumber}`
    );
  }

  /*
   *  @description Validate verification code
   */
  public validateVerificationCode(code: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.userUrl}/ValidateVerificationCode/${code}`
    );
  }
  /*
   *  @description Ceates or updates barber salon
   */
  public updateSalonInfos(query: any): Observable<any> {
    return this.http.post<any>(
      `${this.salonUrl}/UpdateInfos`,
      query
    );
  }
  /*
   *  @description get salon types
   */
  public getSalonTypes(): Observable<SalonTypeResponse[]> {
    return this.http.get<SalonTypeResponse[]>(`${this.salonUrl}/Types`);
  }
  /*
   *  @description Updat salon reach
   */
  public updatSalonReach(query: SalonReachQuery): Observable<void> {
    return this.http.post<void>(`${this.salonUrl}/SalonReach`, query);
  }
}
