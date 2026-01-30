import {createContext} from 'react';

import type {AppTextInputState} from './types';

interface AppTextInputContextType {
  state: AppTextInputState;
  setState: (value: AppTextInputState) => void;

  isFocused: boolean;
  setFocused: (value: boolean) => void;

  text: string;
  setText: (value: string) => void;

  clear: () => void;
}

const AppTextInputContext = createContext<AppTextInputContextType>(null!);

export {AppTextInputContext, type AppTextInputContextType};
