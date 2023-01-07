import { Roles } from './../enums/roles';
/**
 *  @description user profile information
 */
export class UserProfile {
  id: string;
  nom: string;
  login: string;
  prenom: string;
  admin: boolean;
  role: Roles;
  emailConfirmed: boolean;
  phoneNumberConfirmed: boolean;
  email: string;
  accessToken: string;
  tokenType: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  privacyPolicyAgreement: boolean;
  accountCreationCurrentStep: number = 0;
  accountCreationInitStep: number = 0;
  avatar: string;
}
