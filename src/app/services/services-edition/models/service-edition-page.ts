import { PriceTypesOptions } from 'src/app/common/enums/price-types';
import { GendersOptions } from './../../../common/enums/geneder';
import { ModalOptionItem } from './../../../common/models/modal-option-item';
import { ServiceEditionData } from "./service-edition-data";

export class ServiceEditionPage {
  data: ServiceEditionData = new ServiceEditionData();
  options: ModalOptionItem[] = [];
  memberOptions: ModalOptionItem[] = [];
  idParam: string;
  disableGenderEditiong = false;
  genderOptions = GendersOptions;
  priceTypesOptions = PriceTypesOptions;
}