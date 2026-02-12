declare module 'react-native-config' {
  export const Config: NativeConfig;

  export interface NativeConfig {
    API_BASE_URL?: string;
  }
  export default Config;
}
