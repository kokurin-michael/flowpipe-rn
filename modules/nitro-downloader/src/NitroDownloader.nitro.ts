import type {HybridObject} from 'react-native-nitro-modules';

export interface NitroDownloader extends HybridObject<{ios: 'swift'; android: 'kotlin'}> {
  multiply(a: number, b: number): number;
  download(url: string, headers: Record<string, string>): void;
}
