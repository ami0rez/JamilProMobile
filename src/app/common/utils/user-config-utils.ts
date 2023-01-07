import { UserProfile } from '../models/user-profile';
import { SalonProfile } from './../models/salon-profile';
import { UserConfig } from './../models/user-config';
export class UserConfigUtils {
  private static configKey: string = 'USER-CONFIG';

  /*
   *  @description Get initial user config
   */
  private static getInitUserConfig(): UserConfig {
    return {
      language: 'en',
      visitedStarter: false,
      profile: new UserProfile(),
      salonProfile: new SalonProfile(),
    };
  }
  /*
   *  @description Init user config
   */
  public static initUserConfig(): UserConfig {
    var oldConfig = this.getUserConfig();
    const config = this.getInitUserConfig();
    config.language = oldConfig.language;
    config.visitedStarter = oldConfig.visitedStarter;
    this.saveUserConfig(config);
    return config;
  }

  /*
   *  @description Get user config
   */
  static getUserConfig(): UserConfig {
    const config = localStorage.getItem(this.configKey);
    try {
      const configObj = JSON.parse(config);
      if (configObj) {
        return configObj;
      } else {
        return this.initUserConfig();
      }
    } catch (error) {
      return this.initUserConfig();
    }
  }

  /*
   *  @description Save user config
   */
  static saveUserConfig(config: UserConfig) {
    try {
      var configStr = JSON.stringify(config);
      localStorage.setItem(this.configKey, configStr);
    } catch (error) {
      var configStr = JSON.stringify(this.getInitUserConfig());
      localStorage.setItem(this.configKey, configStr);
    }
  }

  /*
   *  @description Save user config
   */
  static saveUserProfile(profile: UserProfile) {
    const userConfig = UserConfigUtils.getUserConfig();
    userConfig.profile = profile;
    UserConfigUtils.saveUserConfig(userConfig);
  }

  /*
   *  @description Save user config
   */
  static saveUserProfileProperties(profile: UserProfile) {
    const userConfig = UserConfigUtils.getUserConfig();
    userConfig.profile = {...userConfig.profile, ...profile};
    UserConfigUtils.saveUserConfig(userConfig);
  }

  /*
   *  @description Save user config
   */
  static removeUserProfile() {
    const userConfig = UserConfigUtils.getUserConfig();
    userConfig.profile = null;
    UserConfigUtils.saveUserConfig(userConfig);
  }
}
