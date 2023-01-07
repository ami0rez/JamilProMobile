import { ListItem } from './../models/list-item';
export enum Genders{
  Men,
  Women,
  Unisex
}

export const GendersOptions: ListItem[] = [
  {
    label: $localize`:@@global.evrybody:Evrybody`,
    value: Genders.Unisex
  },
  {
    label: $localize`:@@global.men:Men`,
    value: Genders.Men
  },
  {
    label: $localize`:@@global.women:Women`,
    value: Genders.Women
  }
]