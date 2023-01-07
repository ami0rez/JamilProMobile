import { PageBase } from 'src/app/common/models/page-base';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

import { NewCategoryPage } from './../../models/category-page';
import { ServiceCategoryManagerService } from '../../services/service-category-manager.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class NewCategoryComponent extends PageBase implements OnInit {

  pageObject: NewCategoryPage = new NewCategoryPage();
  sub: Subscription;
  constructor(
    private location: Location,
    private serviceCategoryManagerService: ServiceCategoryManagerService,
    private route: ActivatedRoute
  ) { 
    super()
  }

  async ngOnInit() {
    await this.serviceCategoryManagerService.getSalonTreatments(this.pageObject);
    this.sub = this.route.params.subscribe(async params => {
      this.pageObject.data.id = params['id'];
      if (this.pageObject.data.id) {
        await this.serviceCategoryManagerService.getSalonServices(this.pageObject);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  async saveCategory() {
    await this.serviceCategoryManagerService.saveCategory(this.pageObject);
  }
}
