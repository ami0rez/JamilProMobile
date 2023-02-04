import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.inventive.jamil',
  appName: 'Jamil',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '772374373898-qkfngn17t3tj3b314up142oqkv96bpic.apps.googleusercontent.com',
      androidClientId: '772374373898-qkfngn17t3tj3b314up142oqkv96bpic.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
