import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.chatfully.push',
  appName: 'push-app',
  webDir: 'dist/spa',
  server: {
    androidScheme: 'https'
  }
};

export default config;
