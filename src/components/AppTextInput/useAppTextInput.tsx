import {useContext} from 'react';

import {AppTextInputContext} from './context';

export const useAppTextInput = () => {
  const ctx = useContext(AppTextInputContext);
  if (!ctx) throw new Error('useAuth must be used within <AppTextInputCompound.Root />');
  return ctx;
};
