declare module 'react-native-config' {
  export const Config: NativeConfig;

  export interface NativeConfig {
    BASE_URL?: string;
  }
  export default Config;
}
