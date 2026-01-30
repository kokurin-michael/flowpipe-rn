import {View} from 'react-native';

import type {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native-unistyles';

import {useAppTextInput} from '../useAppTextInput';

export const Container = ({children}: PropsWithChildren) => {
  const {state, isFocused} = useAppTextInput();

  return <View style={styles.container(isFocused, state === 'error')}>{children}</View>;
};

const styles = StyleSheet.create(theme => ({
  container: (isFocused: boolean, isError: boolean) => ({
    flexDirection: 'row',
    minHeight: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: isFocused
      ? isError
        ? theme.colors.error[500]
        : theme.colors.neutral[500]
      : theme.colors.neutral[100],
    justifyContent: 'center',
  }),
}));
