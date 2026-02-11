import {NitroModules} from 'react-native-nitro-modules';

import type {NitroDownloader} from './NitroDownloader.nitro';

const NitroDownloaderHybridObject =
  NitroModules.createHybridObject<NitroDownloader>('NitroDownloader');

export function download(url: string) {
  return NitroDownloaderHybridObject.download(url);
}
