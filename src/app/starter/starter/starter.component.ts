import { ApplicationUtils } from './../../common/utils/application-utils';
import { StarterPage } from './../models/starter-page';
import { StarterItem } from './../models/starter-item';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { ModalOptionsComponent } from 'src/app/common/components/modal-options/modal-options.component';
import { PageBase } from 'src/app/common/models/page-base';
import { StarterManagerService } from '../services/starter-manager.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
})
export class StarterComponent extends PageBase implements OnInit {
  pageObject = new StarterPage();
  @ViewChild('swiper') swiper: SwiperComponent;
  @ViewChild(ModalOptionsComponent) modal: ModalOptionsComponent;
  constructor(private readonly starterManagerService: StarterManagerService) {
    super();
  }

  async ngOnInit() {
    // await this.starterManagerService.getStories(
    //   this.pageObject,
    //   this.userConfig.language
    // );
    this.starterManagerService.startStoryLoop(this.pageObject, this.swiper);
  }

  sliderMove(e) {
    this.starterManagerService.refreshStories(this.pageObject, this.swiper, e);
  }

  /*
   *  @description Change language
   */
  changeLanguage() {
    this.modal.openModal();
  }

  /*
   *  @description On language change
   */
  onLanguageChange() {
    this.updateConfig();
    ApplicationUtils.reloadApplication();
  }

  /*
   *  @description Redirect to login
   */
  redirectToLogin() {
    this.userConfig.visitedStarter = true;
    this.updateConfig();
    this.starterManagerService.redirectToLoging();
  }

  touching(val) {
    console.log('ssss', val);
  }
}
