import { ProfileAdvanceResponse } from './profile-advance';
import { UserProfile } from 'src/app/common/models/user-profile';
import { AppointmentListItem } from 'src/app/appointments/models/appointment-list-item';
export class HomeData {
  userProfile: UserProfile = new UserProfile();
  notificationCount: number;
  advance: ProfileAdvanceResponse = new ProfileAdvanceResponse();
  appointments: AppointmentListItem[] = [];
}
