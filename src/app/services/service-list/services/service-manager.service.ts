import { Injectable } from '@angular/core';
import { ServicesListPage } from '../models/service-list-page';

import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagerService {

  constructor(
    private serviceService: ServiceService
  ) { }


  /*
  *  @description Get salon services
  */
  async getSalonServices(pageObject: ServicesListPage) {
    var result = await this.serviceService.getSalonServices().toPromise();
    pageObject.data = result;
  }

}
