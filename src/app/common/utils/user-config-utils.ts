import { UserProfile } from '../models/user-profile';
import { SalonProfile } from './../models/salon-profile';
import { UserConfig } from './../models/user-config';
import { StorageUtils } from './storage-utils';

export class UserConfigUtils {
  private static configKey: string = 'USER-CONFIG';

  /*
   *  @description Get initial user config
   */
  private static getInitUserConfig(): UserConfig {
    return {
      language: 'en',
      visitedStarter: true,
      profile: new UserProfile(),
      salonProfile: new SalonProfile(),
    };
  }
  /*
   *  @description Init user config
   */
  public static async initUserConfig(): Promise<UserConfig> {
    // var oldConfig = await this.getUserConfig();
    const config = this.getInitUserConfig();
    //config.language = oldConfig?.language ?? config.language;
    // config.visitedStarter = oldConfig.visitedStarter;
    this.saveUserConfig(config);
    return config;
  }

  /*
   *  @description Get user config
   */
  static async getUserConfig(): Promise<UserConfig> {
    const config = await StorageUtils.getItem(this.configKey);
    try {
      if (config) {
        return config;
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
  static async saveUserConfig(config: UserConfig) {
    try {
      var configStr = config;
      await StorageUtils.setItem(this.configKey, configStr);
    } catch (error) {
      var configStr = this.getInitUserConfig();
      await StorageUtils.setItem(this.configKey, configStr);
    }
  }

  /*
   *  @description Save user config
   */
  static async saveUserProfile(profile: UserProfile) {
    const userConfig = await UserConfigUtils.getUserConfig();
    userConfig.profile = profile;
    await UserConfigUtils.saveUserConfig(userConfig);
  }

  /*
   *  @description Save user config
   */
  static async saveUserProfileProperties(profile: UserProfile) {
    const userConfig = await UserConfigUtils.getUserConfig();
    userConfig.profile = { ...userConfig.profile, ...profile };
    await UserConfigUtils.saveUserConfig(userConfig);
  }

  /*
   *  @description Save user config
   */
  static async removeUserProfile() {
    const userConfig = await UserConfigUtils.getUserConfig();
    userConfig.profile = null;
    await UserConfigUtils.saveUserConfig(userConfig);
  }
}
