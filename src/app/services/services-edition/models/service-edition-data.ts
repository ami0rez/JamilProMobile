import { PriceTypes } from './../../../common/enums/price-types';
export class ServiceEditionData {
  id: string;
  name: string;
  onlineBooking: boolean = true;
  onSite: boolean = true;
  categoryId: string;
  members: string[] = [];
  targetGeneder: number;
  duration: number;
  priceType: number = PriceTypes.Fixed;
  price: number;
  extraTime: number;
}
