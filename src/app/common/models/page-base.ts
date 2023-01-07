import { Roles } from './../enums/roles';
import { UserConfig } from './user-config';
import { Constants } from './constants';
import { UserConfigUtils } from '../utils/user-config-utils';

export class PageBase {
  protected readonly appConstants = Constants;
  protected readonly userConfig: UserConfig;

  roles = Roles;

  constructor() {
    this.userConfig = UserConfigUtils.getUserConfig();
  }

  updateConfig() {
    UserConfigUtils.saveUserConfig(this.userConfig);
  }
}
