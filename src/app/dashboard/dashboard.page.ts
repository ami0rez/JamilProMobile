import { PageBase } from 'src/app/common/models/page-base';
import { RoutesConstants } from './../common/constants/routes-constants';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardManagerService } from './services/dashboard-manager.service';
import { DashboardPage } from './models/dashboard-page';
import { PaginationUtils } from '../common/utils/pagination-utils';
import { InfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardComponent extends PageBase implements OnInit {
  pageObject: DashboardPage = new DashboardPage();
  constructor(
    private router: Router,
    private readonly dashboardManagerService: DashboardManagerService
  ) {
    super();
  }

  completeProfile() {
    this.router.navigate([RoutesConstants.barberSalonSettingsUrl]);
  }

  async ngOnInit() {
    await this.loadConfig();
    PaginationUtils.initializeRequest(this.pageObject.request);
    this.dashboardManagerService.getAdvance(this.pageObject);
    this.dashboardManagerService.getTodaysAppointments(this.pageObject);
  }

  async onIonInfinite(event) {
    PaginationUtils.updatePaginationRequest(this.pageObject.request, {
      first: this.pageObject.request.start + this.pageObject.request.length,
    });
    this.dashboardManagerService.getTodaysAppointments(this.pageObject);
    (event as InfiniteScrollCustomEvent).target.complete();
  }
  viewBalance() {
    this.router.navigate([RoutesConstants.balance]);
  }
}
