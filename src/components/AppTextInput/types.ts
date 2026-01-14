import type {ComponentRef} from 'react';
import type {StyleProp, TextInput, TextInputProps, ViewStyle} from 'react-native';

type AppTextInputRef = {clear: () => void} & Partial<ComponentRef<typeof TextInput>>;

interface AppTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  placeholderContainerStyle?: StyleProp<ViewStyle>;

  error?: string;
  success?: string;

  onClear?: () => void;
}

export {type AppTextInputProps, type AppTextInputRef};
