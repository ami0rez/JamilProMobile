import { UserProfile } from "src/app/common/models/user-profile";

export class AuthenticationResponse {
  profile: UserProfile;
  accessToken: string;
  accessTokenType: string;
  refreshToken: string;
}
