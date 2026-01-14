import {forwardRef} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

import {CloseIcon} from '@assets';

import type {AppTextInputProps, AppTextInputRef} from './types';
import {useAppTextInput} from './useAppTextInput';

export const AppTextInput = forwardRef<AppTextInputRef, AppTextInputProps>((props, ref) => {
  const {
    localRef,
    isPlaceholderVisible,
    isClearVisible,
    isFocused,
    onChangeText,
    onFocus,
    onBlur,
    clear,
  } = useAppTextInput(ref, props);

  return (
    <View
      style={[
        styles.container(isFocused),
        props.containerStyle,
        props.error && styles.containerError,
      ]}>
      <TextInput
        {...props}
        cursorColor={styles.cursor.color}
        ref={localRef}
        placeholder={undefined}
        style={[
          styles.font,
          styles.input,
          styles.paddingVertical,
          props.style,
          props.error && styles.inputError,
        ]}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        selectionColor={styles.cursor.color}
      />

      {isClearVisible && !props.multiline ? (
        <TouchableOpacity style={styles.clear} onPress={clear}>
          <CloseIcon width={24} height={24} />
        </TouchableOpacity>
      ) : null}

      {isPlaceholderVisible ? (
        <View
          style={[
            styles.placeholderContainer,
            styles.paddingVertical,
            props.placeholderContainerStyle,
          ]}
          pointerEvents={'none'}>
          <Text style={[styles.font, styles.placeholderText]} pointerEvents={'none'}>
            {props.placeholder}
          </Text>
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create(theme => ({
  flex: {flex: 1},
  paddingVertical: {
    paddingVertical: 16,
  },
  container: (isFocused: boolean) => ({
    flexDirection: 'row',
    minHeight: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: isFocused ? theme.colors.neutral[500] : theme.colors.neutral[100],
    justifyContent: 'center',
  }),
  font: {
    ...theme.fonts.s14w400,
    lineHeight: 17,
  },
  input: {
    flex: 1,
    textAlignVertical: 'center',
    color: theme.colors.neutral[500],
  },
  placeholderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 16,
    right: 16,
    justifyContent: 'center',
  },
  placeholderText: {
    color: theme.colors.neutral[200],
  },
  cursor: {
    color: theme.colors.primary[500],
  },
  gap: {gap: 8},

  inputError: {
    color: theme.colors.error[500],
  },
  containerError: {
    borderColor: theme.colors.error[500],
  },
  successText: {
    ...theme.fonts.s12w400,
    color: theme.colors.primary[500],
  },
  errorText: {
    ...theme.fonts.s12w400,
    color: theme.colors.error[500],
  },

  clear: {
    justifyContent: 'center',
  },
}));
