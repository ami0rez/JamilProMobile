import { SalonReachTypesOptions } from 'src/app/common/enums/salon-reach-types';
import { ListItem } from 'src/app/common/models/list-item';
import { RegisterData } from './register-data';
import { UserRegisrterStates } from './user-regisrter-states';
export class RegisterPage {
  data: RegisterData = new RegisterData();
  registerStep: number =0;
  passwordRepeat: string;
  initialStep: number = 0;
  invalidVerificationCodeMessage: string;
  codeValid: boolean;
  title: string;
  reachOptions: ListItem[] = SalonReachTypesOptions;
  registerState: UserRegisrterStates = UserRegisrterStates.AccountCreation;
  cancelText: string;
  showCancel: boolean = false;
  saving: boolean = false;
}
