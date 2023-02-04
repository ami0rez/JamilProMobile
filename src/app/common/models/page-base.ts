import { Roles } from './../enums/roles';
import { UserConfig } from './user-config';
import { Constants } from './constants';
import { UserConfigUtils } from '../utils/user-config-utils';

export class PageBase {
  protected readonly appConstants = Constants;
  protected userConfig: UserConfig = new UserConfig();

  roles = Roles;

  constructor() {
    // UserConfigUtils.getUserConfig().then(data => {
    //   this.userConfig = data
    // }).catch(error => {
    //   console.log('error loading user config: '+ JSON.stringify(error));
    // });
  }

  async updateConfig() {
    await UserConfigUtils.saveUserConfig(this.userConfig);
  }

  async loadConfig() {
    return await UserConfigUtils.getUserConfig();
  }
}
