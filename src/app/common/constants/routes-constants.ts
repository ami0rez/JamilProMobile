export class RoutesConstants {
  //home
  public static readonly home = '/';

  //auth
  public static readonly auth = 'auth';
  public static readonly register = `${RoutesConstants.auth}/register`;
  public static readonly login = 'login';
  public static readonly securrityUrl = ''
  public static readonly logout = `${RoutesConstants.securrityUrl}/logout`
  public static readonly updatePasswor = `${RoutesConstants.securrityUrl}/update-password`

  //starter
  public static readonly starter = 'starter';

  //#region Dashboard
  public static readonly dashboard = 'home/dashboard';
  //#endregion

  //#region Dashboard
  public static readonly payments = 'payments';
  public static readonly balance = `${RoutesConstants.payments}/balance`;
  public static readonly paymentDetails = `${RoutesConstants.payments}/details`;
  public static readonly withdrawl = `${RoutesConstants.payments}/withdrawl`;
  //#endregion

  //#region Settings
  public static readonly settings = 'settings';

  public static readonly teamList = 'settings/team';
  public static readonly memeberEdit = 'settings/member';
  public static readonly onlineBookingManagement = `${RoutesConstants.settings}/online-booking-management`;
  public static readonly gallery = `${RoutesConstants.settings}/gallery`;
  public static readonly bankAccounts = `${RoutesConstants.settings}/bank-account-list`;
  public static readonly bankAccountsEdit = `${RoutesConstants.settings}/bank-account-edit`;
  public static readonly otherSettings = `${RoutesConstants.settings}/other-settings`;
  public static readonly barberSalonSettingsUrl = `${RoutesConstants.settings}/salon`;
  public static readonly memberProfileUrl = `${RoutesConstants.settings}/member-profile`;
  //#endregion

  //#region Appointments
  public static readonly appointment = 'appointments';

  public static readonly appointmentDetails = `${RoutesConstants.appointment}/details`;
  //#endregion

  //#region Notifications
  public static readonly notification = 'notifications';

  public static readonly notificationList = `${RoutesConstants.notification}/list`;
  public static readonly notificationDetails = `${RoutesConstants.notification}/details`;
  //#endregion

  //#region Services
  public static readonly barberSalonServicessUrl = 'services';

  public static readonly salonServicePackageAdd = 'barber/servicePackage';
  public static readonly salonServiceCategory = 'services/category';
  public static readonly salonEditionService = 'services/edition';
  //#endregion
}

export class RoutesKeys {
  public static readonly Appointments = RoutesConstants.appointmentDetails;
}
