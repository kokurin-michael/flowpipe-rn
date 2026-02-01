import {useCallback, useState} from 'react';

export const useDownload = () => {
  const [url, setUrl] = useState<string>('');
  const onDownloadPress = useCallback(() => {}, []);

  return {
    setUrl,
    onDownloadPress,
  };
};
