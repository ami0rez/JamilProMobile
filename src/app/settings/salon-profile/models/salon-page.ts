import { GendersOptions } from 'src/app/common/enums/geneder';
import { SalonProfile } from '../../../common/models/salon-profile';

export class BarberSalonPage {
  data: SalonProfile = new SalonProfile();
  inputsDisabled: boolean = false;
  genderOptions = GendersOptions;
  base64Image: string= 'https://ionicframework.com/docs/img/demos/avatar.svg';
}