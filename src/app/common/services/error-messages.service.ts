import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagesService {
  hairSalon = $localize`:@@salon-type.hairSalon: Hair salon`;
  nailSalon = $localize`:@@salon-type.nailSalon: Nail salon`;
  barbershop = $localize`:@@salon-type.barbershop: Barbershop`;
  beautySalon = $localize`:@@salon-type.beautySalon: Beauty salon`;
  astheticq = $localize`:@@salon-type.astheticq: Astheticq`;
  spa = $localize`:@@salon-type.spa: Spa`;
  massage = $localize`:@@salon-type.massage: Massage`;
  waxingSalon = $localize`:@@salon-type.waxingSalon: Waxing salon`;
  eyebrowsLashes = $localize`:@@salon-type.eyebrowsLashes: Eyebrows lashes`;
  tanningStudio = $localize`:@@salon-type.tanningStudio: Tanning studio`;
  tatooPiercing = $localize`:@@salon-type.tatooPiercing: Tatoo piercing`;
  therapyCcenter = $localize`:@@salon-type.therapyCcenter: Therapy ccenter`;
  weightLoss = $localize`:@@salon-type.weightLoss: Weight loss`;
  personalTrainer = $localize`:@@salon-type.personalTrainer: Personal trainer`;
  gymFitness = $localize`:@@salon-type.gymFitness: Gym fitness`;
  other = $localize`:@@salon-type.other: Autre`;

  UploadSalonImage = $localize`:@@complete-profile.uploadSalonImage:Upload salon image`;
  EnterSalonName = $localize`:@@complete-profile.enterSalonName:Enter salon name`;
  EnterSalonLeagalName = $localize`:@@complete-profile.enterSalonLeagalName:Enter salon leagal name`;
  EnterSalonAddress = $localize`:@@complete-profile.enterSalonAddress:Enter salon address`;
  EnterSalonPhoneNumber = $localize`:@@complete-profile.enterSalonPhoneNumber:Enter salon phone number`;
  EnterSalonEmail = $localize`:@@complete-profile.enterSalonEmail:Enter salon email`;
  EnterSalonWorkingTime = $localize`:@@complete-profile.enterSalonWorkingTime:Enter salon working time`;
  EnterSalonGender = $localize`:@@complete-profile.enterSalonGender:Enter salon gender`;
  EnterSalonFacebookPage = $localize`:@@complete-profile.enterSalonFacebookPage:Enter salon facebook page`;
  EnterSalonInstagramPage = $localize`:@@complete-profile.enterSalonInstagramPage:Enter salon instagram page`;
  AddCategories = $localize`:@@complete-profile.addCategories:Add categories`;
  AddServices = $localize`:@@complete-profile.addServices:Add services`;
  AddMembers = $localize`:@@complete-profile.addMembers:Add members`;
  AddBankAccount = $localize`:@@complete-profile.addBankAccount:Add bank account`;
  AddImages = $localize`:@@complete-profile.addImages:Add images`;
  AddVideos = $localize`:@@complete-profile.addVideos:Add videos`;

  success = $localize`:@@global.success:Success`;
  info = $localize`:@@global.info:Information`;
  warning = $localize`:@@global.warning:Warning`;
  error = $localize`:@@global.error:Error`;
  error0 = $localize`:@@global.error500:Server not reachable!`;
  error401 = $localize`:@@global.error401:Session time out`;
  error403 = $localize`:@@global.error403:Unauthorized`;
  error500 = $localize`:@@global.error500:Internal Server Error!`;
  error504 = $localize`:@@global.error504:Gateway Timeout!`;
  UnknownUser = $localize`:@@global.error401:Session time out`;

  //#region Security
  PasswordMustContainNumber = $localize`:@@error-messages.passwordMustContainNumber:Password must contain a number`;
  PasswordMustContainSymbol = $localize`:@@error-messages.passwordMustContainSymbol:Password must contain a symbol`;
  PasswordMustContainUpperCase = $localize`:@@error-messages.passwordMustContainUpperCase:password must contain uppercase letters`;
  PasswordMustContainLowerCase = $localize`:@@error-messages.passwordMustContainLowerCase:password must contain lowercase letters`;
  PasswordLengthInvalid = $localize`:@@error-messages.passwordLengthInvalid:Password length must exceed {0} characters`;
  EmailNotFound = $localize`:@@error-messages.emailNotFound:Email address not found`;
  UserNameMustBeUnique = $localize`:@@error-messages.userNameMustBeUnique:User name must be unique`;
  EmailMustBeUnique = $localize`:@@error-messages.emailMustBeUnique:Email must be unique`;
  ItemAlreadyUsed = $localize`:@@error-messages.itemAlreadyUsed:Item already used`;
  UserNotFound = $localize`:@@error-messages.usernotfound:User not found`;
  UserLocked = $localize`:@@login.compteBloque:Ce compte est temporairement bloqué`;
  BadRefreshTokenRequest = $localize`:@@global.badRefreshTokenRequest:Votre session a expiré. Merci de vous reconnecter.`;
  InvalidUserOrPassword = $localize`:@@login.nomUtilisateurOuMotDepasseInvalides:Nom d'utilisateur ou mot de passe invalides !`;
  ErrorLoginUserBlocked = $localize`:@@login.compteBloque:Ce compte est temporairement bloqué`;
  InvalidUserNameCombination = $localize`:@@user.invalidUserNameCombination:Le nom d’utilisateur ne peut contenir que des caractères alphanumériques, des points et des traits de soulignement`;
  InvalidUserNameFirstChar = $localize`:@@user.invalidUserNameFirstChar:Le premier caractère du nom d’utilisateur doit être un caractère alphabétique`;
  UserRoleNotFound = $localize`:@@user.userRoleNotFound:User role is invalid`;
  UserRuoIsRequired = $localize`:@@user.userRuoIsRequired:User RUO is required`;
  UserRuoNotFound = $localize`:@@user.userRuoNotFound:User RUO is invalid`;

  // Changer mot de passe
  ChangePasswordInvalidLogin = $localize`:@@changer-mot-de-passe.changePasswordInvalidLogin:Invalid login`;
  OldPasswordIsWrong = $localize`:@@changer-mot-de-passe.oldPasswordIsWrong:The current password is wrong`;
  ErrorChangePassword = $localize`:@@changer-mot-de-passe.errorChangePassword:Error while changing password`;
  PasswordFormatIsWrrong = $localize`:@@changer-mot-de-passe.passwordFormatIsWrong:Password format is wrrong`;

  //#endregion

  AnotherBankAccountIsDefault = $localize`:@@bank-account.anotherBankAccountIsAlreadyDefault: Another bank account is default`;
  DefaultBankAccountIsRequired = $localize`:@@bank-account.aDefaultBankAccountIsAlwaysRequired: A default bank account is always required`;
}
