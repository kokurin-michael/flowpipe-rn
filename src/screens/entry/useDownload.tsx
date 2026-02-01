import {useCallback, useState} from 'react';

import {download} from 'react-native-nitro-downloader';

export const useDownload = () => {
  const [url, setUrl] = useState<string>('');
  const onDownloadPress = useCallback(() => {
    download(
      'https://rr1---sn-xap5-ixak.googlevideo.com/videoplayback?expire=1769977209&ei=GWF_aZyOGfePv_IPicCo4QU&ip=5.61.90.19&id=o-AKp55dvud3-aJ49rB_4Pj0ggVDT5qZ4PUJ9Y5RVUL7ii&itag=394&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=803&met=1769955609%2C&mh=-o&mm=31%2C29&mn=sn-xap5-ixak%2Csn-ixh7yn7e&ms=au%2Crdu&mv=m&mvi=1&pl=22&rms=au%2Cau&initcwndbps=2917500&bui=AW-iu_rcrKKileAl7xlQ2k--s5G6VBVUrgO69eJ0AoOaAFdfEia5s5V3xYS6lxClq1ZLiW0K-6f09zw_&spc=q5xjPPUixa6D&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=7618522&dur=1090.289&lmt=1769952921440686&mt=1769954967&fvip=2&keepalive=yes&fexp=51552689%2C51565115%2C51565682%2C51580968&c=ANDROID_VR&txp=3309224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJEij0EwRQIgA99vh59XXWtuZGbcvriIUogDQ7kDITIsh_NJxmTe2FsCIQCgFCnY_6YxJMS3RXYgVJNVFnooeaeAlK4fKvaKUHfw3Q%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgGjoIxuGBSF8tu3G0UYUlgjQXNYErzB7NUIffgy7_N_sCIDsy0zklNxn45sDO1pQfRvBXiLeo_VAGNawQSsgBZ5vJ',
      {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Sec-Fetch-Mode': 'navigate',
      },
    );
  }, []);

  return {
    setUrl,
    onDownloadPress,
  };
};
