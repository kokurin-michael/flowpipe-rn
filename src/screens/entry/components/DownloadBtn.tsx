import {useTranslation} from 'react-i18next';

import {AppButton} from '@components/AppButton';
import {useAppTextInput} from '@components/AppTextInput/useAppTextInput.tsx';

export const DownloadBtn = ({onPress}: {onPress?: () => void}) => {
  const {t} = useTranslation('entry');
  const {clear} = useAppTextInput();

  return (
    <AppButton
      buttonType={'transparent'}
      onPress={() => {
        onPress?.();
        clear();
      }}
      CenterComponent={t('download')}
    />
  );
};
