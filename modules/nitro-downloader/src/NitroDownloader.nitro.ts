import type {HybridObject} from 'react-native-nitro-modules';

export interface NitroDownloader extends HybridObject<{ios: 'swift'; android: 'kotlin'}> {
  download(url: string): void;
}
