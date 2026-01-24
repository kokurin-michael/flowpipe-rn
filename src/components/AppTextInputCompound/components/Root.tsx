import {useCallback, useMemo, useState} from 'react';

import type {PropsWithChildren} from 'react';

import {AppTextInputContext} from '../context';
import type {AppTextInputState} from '../types';

export const Root = ({children}: PropsWithChildren) => {
  const [type, setType] = useState<AppTextInputState>('none');
  const clear = useCallback(() => {
    setType('none');
  }, []);
  const value = useMemo(() => ({type, setType, clear}), [clear, type]);

  return <AppTextInputContext.Provider value={value}>{children}</AppTextInputContext.Provider>;
};
