import { PageBase } from 'src/app/common/models/page-base';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationUtils } from '../../utils/application-utils';
import { ModalOptionsComponent } from '../modal-options/modal-options.component';
import { ModalOptionItem } from '../../models/modal-option-item';
import { LanguagesOptions } from '../../constants/languages';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-lang-supp',
  templateUrl: './lang-supp.component.html',
  styleUrls: ['./lang-supp.component.scss'],
})
export class LangSuppComponent extends PageBase implements OnInit {
  @ViewChild(ModalOptionsComponent) modal: ModalOptionsComponent;
  languageOptions: ModalOptionItem[] = [
    { id: '', name: '', options: LanguagesOptions },
  ];
  constructor(private readonly languageService: LanguageService) {
    super();
  }

  ngOnInit() {}

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
    this.languageService.onLanguageChange();
  }
}
