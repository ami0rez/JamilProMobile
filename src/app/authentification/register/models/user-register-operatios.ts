import { UserRegisterSteps } from './user-register-steps';
export class UserRegisterOperatios {
  // Required
  static AccountCreation = [
    UserRegisterSteps.Email,
    UserRegisterSteps.BusinessAcccount,
  ];

  //Essentail
  static AccountValidation = [
    UserRegisterSteps.PhoneNumberCheck,
    UserRegisterSteps.PhoneNumberVerificationCode,
  ];

  //Needed but not essential
  static ProfileFilling = [
    UserRegisterSteps.BusinessName,
    UserRegisterSteps.Websiet,
    UserRegisterSteps.MainBusinessType,
    UserRegisterSteps.RelatedBusinessType,
    UserRegisterSteps.Address,
    UserRegisterSteps.SalonReach,
  ];
}
