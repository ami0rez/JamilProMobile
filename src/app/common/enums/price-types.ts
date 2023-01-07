import { ListItem } from "../models/list-item";

export enum PriceTypes{
  Fixed,
  From,
  Free
}


export const PriceTypesOptions: ListItem[] = [
  {
    label: $localize`:@@global.fixed:Fixed`,
    value: PriceTypes.Fixed
  },
  {
    label: $localize`:@@global.from:From`,
    value: PriceTypes.From
  },
  {
    label: $localize`:@@global.free:Free`,
    value: PriceTypes.Free
  }
]