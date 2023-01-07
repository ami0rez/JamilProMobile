import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BarberSettingsData } from '../../settings/models/settings-data';

import { AppConfigService } from 'src/app/common/services/app-config-service';
import { SalonProfileDto as SalonProfileDto } from '../../salon-profile/models/salon-dto';

@Injectable({
  providedIn: 'root'
})
export class SalonService {
  readonly barberSalonUrl =
  this.appConfigService.appConfig.apiUrl + 'api/v1/Salon';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
  *  @description Ceates or updates barber salon
  */
  public saveSalonProfile(query: SalonProfileDto): Observable<SalonProfileDto> {
    return this.http.post<SalonProfileDto>(`${this.barberSalonUrl}`, query);
  }

  /*
  *  @description get barber salon
  */
  public getBarberSalon(): Observable<SalonProfileDto> {
    return this.http.get<SalonProfileDto>(`${this.barberSalonUrl}`);
  }

  /*
  *  @description get barber salon profile
  */
  public getBarberSalonProfile(): Observable<BarberSettingsData> {
    return this.http.get<BarberSettingsData>(`${this.barberSalonUrl}/profile`);
  }
}
