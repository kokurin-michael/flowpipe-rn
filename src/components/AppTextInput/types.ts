import type {ComponentRef} from 'react';
import type {TextInput, TextInputProps} from 'react-native';

type AppTextInputState = 'none' | 'success' | 'error';

type AppTextInputRef = {clear: () => void; getText(): string} & Partial<
  ComponentRef<typeof TextInput>
>;

type AppTextInputProps = TextInputProps & {onClear?: () => void};

export type {AppTextInputProps, AppTextInputRef, AppTextInputState};
