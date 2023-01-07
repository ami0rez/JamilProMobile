import { AccountType } from "src/app/common/models/account-type";

export class RegisterQuery {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  privacyPolicyAgreement: boolean;
  accountType: AccountType = AccountType.PARTNER;
}
