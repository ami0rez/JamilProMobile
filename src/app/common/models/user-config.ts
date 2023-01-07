import { SalonProfile } from './salon-profile';
import { UserProfile } from 'src/app/common/models/user-profile';
export class UserConfig {
  language: string;
  visitedStarter: boolean;
  profile: UserProfile;
  salonProfile: SalonProfile;
}
