import {View} from 'react-native';

import type {PropsWithChildren} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

import {useAppTextInput} from '../useAppTextInput';

export const Container = ({
  children,
  containerStyle,
}: PropsWithChildren & {containerStyle?: StyleProp<ViewStyle>}) => {
  const {state, isFocused} = useAppTextInput();
  const isError = state === 'error';

  return <View style={[styles.container(isFocused, isError), containerStyle]}>{children}</View>;
};

const styles = StyleSheet.create(theme => ({
  container: (isFocused: boolean, isError: boolean) => ({
    flexDirection: 'row',
    minHeight: 48,
    borderWidth: 1,
    paddingStart: 16,
    paddingEnd: 16,
    borderColor: isFocused
      ? isError
        ? theme.colors.error[500]
        : theme.colors.neutral[500]
      : theme.colors.neutral[100],
    justifyContent: 'center',
  }),
}));
