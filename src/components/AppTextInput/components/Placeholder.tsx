import {useMemo} from 'react';
import {Text, View} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

import {useAppTextInput} from '../useAppTextInput';

export const Placeholder = ({text}: {text: string}) => {
  const {isFocused, text: inputText} = useAppTextInput();
  const isHidden = useMemo(() => isFocused || inputText !== '', [inputText, isFocused]);

  return isHidden ? null : (
    <View style={[styles.container, styles.paddingVertical]} pointerEvents={'none'}>
      <Text style={[styles.font, styles.text]} pointerEvents={'none'}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  paddingVertical: {
    paddingVertical: 16,
  },
  font: {
    ...theme.fonts.s14w400,
    lineHeight: 17,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 16,
    right: 16,
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.neutral[200],
  },
}));
