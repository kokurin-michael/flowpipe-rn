import { StyleProp, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { ComponentRef } from 'react';

type AppTextInputRef = {clear: () => void} & Partial<ComponentRef<typeof TextInput>>;

interface AppTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  placeholderContainerStyle?: StyleProp<ViewStyle>;

  error?: string;
  success?: string;

  onClear?: () => void;
}

export { type AppTextInputRef, type AppTextInputProps };