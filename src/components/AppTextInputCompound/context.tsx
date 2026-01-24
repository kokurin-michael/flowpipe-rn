import {createContext} from 'react';

import type {AppTextInputState} from './types';

interface AppTextInputContextType {
  type: AppTextInputState;
  setType: (value: AppTextInputState) => void;

  clear: () => void;
}

const AppTextInputContext = createContext<AppTextInputContextType>(null!);

export {AppTextInputContext, type AppTextInputContextType};
