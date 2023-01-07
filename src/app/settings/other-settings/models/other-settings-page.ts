import { LanguagesOptions } from './../../../common/constants/languages';
import { ModalOptionItem } from './../../../common/models/modal-option-item';
import { OtherSettingsData } from "./other-settings-data";

export class OtherSettingsPage {
  data: OtherSettingsData = new OtherSettingsData();
  languageOptions:ModalOptionItem[] = [{id: '', name: '', options: LanguagesOptions}]
}
