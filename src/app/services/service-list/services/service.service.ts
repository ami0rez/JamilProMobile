import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from 'src/app/common/services/app-config-service';
import { ServicesListData } from '../models/service-list-data';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly salonServiceUrl =
  this.appConfigService.appConfig.apiUrl + 'api/v1/Service';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
  *  @description Get salon treatments
  */
  public getSalonServices(): Observable<ServicesListData> {
    return this.http.get<ServicesListData>(`${this.salonServiceUrl}`);
  }
}
