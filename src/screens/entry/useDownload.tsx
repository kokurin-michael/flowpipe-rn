import {useCallback, useState} from 'react';

import {download} from 'react-native-nitro-downloader';

export const useDownload = () => {
  const [url, setUrl] = useState<string>(
    'http://192.168.1.57:8000/download/file/eb1a92f80cb64cf2828bb623bbf09d0f',
  );

  const onDownloadPress = useCallback(() => {
    download(url);
  }, [url]);

  return {
    setUrl,
    onDownloadPress,
  };
};
