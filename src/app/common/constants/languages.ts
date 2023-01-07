import { SelectListItem } from "../models/select-liast-item";

export class Langugaes {
  static FR = 'fr';
  static En = 'en';
}

export const LanguagesOptions: SelectListItem[] = [
  {
    label:`Francias`,
    value: Langugaes.FR,
    selected: false
  },
  {
    label: `English`,
    value: Langugaes.En,
    selected: false
  }
]
