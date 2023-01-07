import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from 'src/app/common/services/app-config-service';
import { ServiceEditionData } from '../models/service-edition-data';
import { SelectListItem } from 'src/app/common/models/select-liast-item';
import { ServiceEditOptions } from '../models/service-edit-options';
import { BarberSettingsData } from 'src/app/settings/settings/models/settings-data';

@Injectable({
  providedIn: 'root',
})
export class ServiceEditionService {
  readonly serviceUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Service';
  readonly categoryUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Category';
  readonly salonUrl = this.appConfigService.appConfig.apiUrl + 'api/v1/Salon';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get salon treatments
   */
  public getSalonServices(): Observable<ServiceEditionData> {
    return this.http.get<ServiceEditionData>(`${this.serviceUrl}`);
  }

  /*
   *  @description Get salon treatments
   */
  public getOptions(): Observable<ServiceEditOptions> {
    return this.http.get<ServiceEditOptions>(`${this.serviceUrl}/Options`);
  }

  /*
   *  @description Get salon treatments
   */
  public getCategories(): Observable<SelectListItem[]> {
    return this.http.get<SelectListItem[]>(`${this.categoryUrl}/Options`);
  }

  /*
   *  @description Get salon treatments
   */
  public getService(id: string): Observable<ServiceEditionData> {
    return this.http.get<ServiceEditionData>(`${this.serviceUrl}/${id}`);
  }

  /*
   *  @description get barber salon profile
   */
  public getBarberSalonProfile(): Observable<BarberSettingsData> {
    return this.http.get<BarberSettingsData>(`${this.salonUrl}/profile`);
  }

  /*
   *  @description Create service
   */
  public createService(
    query: ServiceEditionData
  ): Observable<ServiceEditionData> {
    return this.http.post<ServiceEditionData>(`${this.serviceUrl}`, query);
  }

  /*
   *  @description Update service
   */
  public updateService(
    id: string,
    query: ServiceEditionData
  ): Observable<ServiceEditionData> {
    return this.http.put<ServiceEditionData>(`${this.serviceUrl}/${id}`, query);
  }

  /*
   *  @description Create service
   */
  public deleteService(id: string): Observable<ServiceEditionData> {
    return this.http.delete<ServiceEditionData>(`${this.serviceUrl}/${id}`);
  }
}
