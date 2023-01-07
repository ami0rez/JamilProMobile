import { SalonProfile } from 'src/app/common/models/salon-profile';
import { RegisterQuery } from './register-query';
import { SalonTypeResponse } from './salon-type-response';

export class RegisterData {
  userAccount: RegisterQuery = new RegisterQuery();
  salonProfile: SalonProfile = new SalonProfile();
  salonTypes: SalonTypeResponse[] = [];
  verificationCode: string;
}
