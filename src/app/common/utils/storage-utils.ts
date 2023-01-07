import { Preferences } from '@capacitor/preferences';

export class StorageUtils{
  static async setItem(key, obj) {
    await Preferences.set({
      key: key,
      value: JSON.stringify(obj)
    });
  }
  
  // JSON "get" example
  static async getItem(key):Promise<any>{
    const ret = await Preferences.get({ key: key });
    const value = JSON.parse(ret.value);
    return value;
  }
}