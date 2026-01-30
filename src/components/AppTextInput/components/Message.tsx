import {Text} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

import type {AppTextInputState} from '../types';
import {useAppTextInput} from '../useAppTextInput';

export const Message = ({message}: {message: string}) => {
  const {state} = useAppTextInput();

  return message ? (
    <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.message(state)}>
      {message}
    </Text>
  ) : null;
};

const styles = StyleSheet.create(theme => ({
  message: (state: AppTextInputState) => {
    let color: string | undefined;

    switch (state) {
      case 'success': {
        color = theme.colors.primary[500];
        break;
      }

      case 'error': {
        color = theme.colors.error[500];
        break;
      }
    }

    return {
      ...theme.fonts.s12w400,
      color: color,
    };
  },
}));
