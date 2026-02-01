import {forwardRef, useImperativeHandle, useRef} from 'react';
import {TextInput} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

import type {AppTextInputProps, AppTextInputRef, AppTextInputState} from '../types';
import {useAppTextInput} from '../useAppTextInput';

export const Input = forwardRef<AppTextInputRef, AppTextInputProps>((props, ref) => {
  const {
    state,
    clear: clearAppTextInput,
    setFocused,
    text: defaultValue,
    setText,
  } = useAppTextInput();
  const localRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    ...localRef?.current,
    focus: () => {
      setFocused(true);
      localRef.current?.focus();
    },
    blur: () => {
      setFocused(false);
      localRef.current?.blur();
    },
    clear: () => {
      localRef.current?.clear();
      clearAppTextInput();
      props?.onClear?.();
    },
  }));

  return (
    <TextInput
      {...props}
      ref={localRef}
      defaultValue={defaultValue}
      onFocus={e => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={e => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      onChangeText={setText}
      cursorColor={styles.cursor.color}
      placeholder={undefined}
      style={[styles.font, styles.input(state), styles.paddingVertical, props.style]}
      selectionColor={styles.cursor.color}
    />
  );
});

const styles = StyleSheet.create(theme => ({
  paddingVertical: {
    paddingVertical: 16,
  },
  font: {
    ...theme.fonts.s14w400,
    lineHeight: 17,
  },
  input: (state: AppTextInputState) => ({
    flex: 1,
    textAlignVertical: 'center',
    color: state === 'error' ? theme.colors.error[500] : theme.colors.neutral[500],
  }),
  cursor: {
    color: theme.colors.primary[500],
  },
}));
