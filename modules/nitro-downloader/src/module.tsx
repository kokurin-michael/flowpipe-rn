import {NitroModules} from 'react-native-nitro-modules';

import type {NitroDownloader} from './NitroDownloader.nitro';

const NitroDownloaderHybridObject =
  NitroModules.createHybridObject<NitroDownloader>('NitroDownloader');

export function download(url: string, headers: Record<string, string>) {
  return NitroDownloaderHybridObject.download(url, headers);
}

export function multiply(a: number, b: number): number {
  return NitroDownloaderHybridObject.multiply(a, b);
}
