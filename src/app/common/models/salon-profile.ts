// import { SalonReachQuery } from 'src/app/authentification/register/models/salon-reach-query';
import { Address } from 'src/app/common/models/address';
// import { SalonTimeDto } from '../../settings/salon-profile/models/salon-time';

export class SalonProfile {
  id?: string;
  image?: string;
  name?: string;
  leagalName?: string;
  address?: Address = new Address();
  phoneNumber?: string;
  email?: string;
  salonGender?: string;
  salonTime?: any;
  // salonTime?: SalonTimeDto = new SalonTimeDto();
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  mainType?: string;
  relatedTypes?: string[];
  salonReach?: any;
  // salonReach?: SalonReachQuery = new SalonReachQuery();
}
