import { LoginData } from './login-data';

export class LoginPage {
  data: LoginData = new LoginData();
  screen: 'signin' | 'signup' | 'forget' = 'signin';
  res: string = '55555555555555555';
}
