import { PageBase } from 'src/app/common/models/page-base';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { ServiceEditionPage } from '../../models/service-edition-page';
import { ServiceEditionManagerService } from '../../services/service-edition-manager.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'src/app/common/services/confirmation.service';

@Component({
  selector: 'app-service-edition',
  templateUrl: './service-edition.component.html',
  styleUrls: ['./service-edition.component.scss'],
})
export class ServiceEditionComponent extends PageBase implements OnInit {
  pageObject: ServiceEditionPage = new ServiceEditionPage();
  sub: Subscription;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private serviceEditionManagerService: ServiceEditionManagerService
  ) {
    super();
  }

  async ngOnInit() {
    this.sub = this.route.params.subscribe(async (params) => {
      this.pageObject.data.categoryId = params['idcategory'];
      this.pageObject.data.id = params['id'];
      if (this.pageObject.data.id) {
        await this.serviceEditionManagerService.getService(this.pageObject);
      }
    });
    await this.serviceEditionManagerService.loadOptions(this.pageObject);
    await this.serviceEditionManagerService.getSalonProfile(this.pageObject);
  }

  async saveService() {
    await this.serviceEditionManagerService.saveService(this.pageObject);
  }

  async deleteService() {
    this.confirmationService.confirm({
      title: 'service',
      onConfirm: async () => {
        await this.serviceEditionManagerService.deleteService(this.pageObject);
      },
      onCancel: () => {},
    });
  }

  goBack() {
    this.location.back();
  }
}
