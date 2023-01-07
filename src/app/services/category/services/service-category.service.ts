import { CreateCategoryResponse } from './../models/create-category-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from 'src/app/common/services/app-config-service';
import { CreateCategoryQuery } from '../models/create-category-query';
import { ServiceTreatmentTypeResponse } from '../models/service-treatment-type-response';
import { UpdateCategoryQuery } from '../models/update-category-query';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {
  readonly serviceCategory =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Category';
    readonly salonServiceUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Service';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) { }

  /*
  *  @description Get salon treatments
  */
  public getServiceCategory(id: string): Observable<CreateCategoryResponse> {
    return this.http.get<CreateCategoryResponse>(`${this.serviceCategory}/${id}`);
  }

  /*
  *  @description Get salon treatments
  */
  public createServiceCategory(query: CreateCategoryQuery): Observable<CreateCategoryResponse> {
    return this.http.post<CreateCategoryResponse>(`${this.serviceCategory}`, query);
  }

  /*
  *  @description Get salon treatments
  */
  public updateServiceCategory(query: UpdateCategoryQuery): Observable<CreateCategoryResponse> {
    return this.http.put<CreateCategoryResponse>(`${this.serviceCategory}`, query);
  }

  /*
  *  @description Get salon treatments
  */
  public deleteServiceCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.serviceCategory}/${id}`);
  }

  /*
  *  @description Get salon treatments
  */
  public getSalonTreatments(): Observable<ServiceTreatmentTypeResponse[]> {
    return this.http.get<ServiceTreatmentTypeResponse[]>(`${this.salonServiceUrl}/Treatments`);
  }
}
