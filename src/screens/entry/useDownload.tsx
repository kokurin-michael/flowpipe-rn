import {useState} from 'react';

export const useDownload = () => {
  const [url, setUrl] = useState<string>('');
  const onDownloadPress = () => {
    url;
  };

  return {
    setUrl,
    onDownloadPress,
  };
};
