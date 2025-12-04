import { Text, TextInput, View } from 'react-native';
import { AppTextInputProps, AppTextInputRef } from './types';
import { useAppTextInput } from './useAppTextInput';
import { StyleSheet } from 'react-native-unistyles';
import { forwardRef } from 'react';

export const AppTextInput = forwardRef<AppTextInputRef, AppTextInputProps>(
  (props, ref) => {
    const {
      localRef,
      isPlaceholderVisible,
      isFocused,
      onChangeText,
      onFocus,
      onBlur,
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
          ref={localRef}
          placeholder={undefined}
          style={[
            styles.flex,
            styles.font,
            styles.input,
            props.style,
            props.error && styles.inputError,
          ]}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          selectionColor={styles.selection.color}
        />
        {isPlaceholderVisible ? (
          <View
            style={[
              styles.placeholderContainer,
              props.placeholderContainerStyle,
            ]}
            pointerEvents={'none'}>
            <Text
              style={[styles.font, styles.placeholderText]}
              pointerEvents={'none'}>
              {props.placeholder}
            </Text>
          </View>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create(
  (theme) => ({
    flex: {flex: 1},
    container:(isFocused: boolean) => ({
      minHeight: 48,
      borderWidth: 1,
      paddingHorizontal: 16,
      borderColor: isFocused
        ? theme.colors.neutral[500]
        : theme.colors.neutral[100],
    }),
    font: {
      ...theme.fonts.s14w400,
      lineHeight: 17,
    },
    input: {
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
    selection: {
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
  })
);