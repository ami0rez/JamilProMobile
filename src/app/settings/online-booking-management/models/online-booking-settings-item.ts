export class OnlineBookingSettingsItem {
  cancelBefore: number = 0;
  bookBefore: number = 0;
  bookMax: number;
  canSelectMember: boolean;
  information: string;
  sendMailToMember: boolean;
  sendMailToAddress: boolean;
  mailAddress: string;
  showFeaturedServices: boolean;
  showMemberStarRating: boolean;
  automaticConfirmation: boolean;
  confirmAfter: number = 0;
  recieveAppointmentNotification: boolean;
  resendNotificationBefore: number;
  salonId: string;
}
