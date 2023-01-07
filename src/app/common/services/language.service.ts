import { Injectable } from '@angular/core';
import { ApplicationUtils } from '../utils/application-utils';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  /*
   *  @description On language change
   */
  onLanguageChange() {
    ApplicationUtils.reloadApplication();
  }
}
