import { LanguagesOptions } from 'src/app/common/constants/languages';
import { ModalOptionItem } from 'src/app/common/models/modal-option-item';
import { StarterData } from './starter-data';

export class StarterPage {
  data: StarterData = new StarterData();
  languageOptions: ModalOptionItem[] = [
    { id: '', name: '', options: LanguagesOptions },
  ];
  storyIndex: number = 0;
  storyTimeouts = [];
  initialstoryDuration = 3;
  touchStart = false;
}
