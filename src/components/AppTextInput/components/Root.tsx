import {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';

import type {PropsWithChildren} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

import {AppTextInputContext} from '../context';
import type {AppTextInputState} from '../types';

export const Root = ({
  children,
  containerStyle,
  initialState = 'none',
  initialText = '',
}: PropsWithChildren & {
  containerStyle?: StyleProp<ViewStyle>;
  initialState?: AppTextInputState;
  initialText?: string;
}) => {
  const [state, setState] = useState<AppTextInputState>(initialState);
  const [text, setText] = useState<string>(initialText);
  const [isFocused, setFocused] = useState<boolean>(false);
  const clear = useCallback(() => {
    setText('');
    setState('none');
  }, []);
  const value = useMemo(
    () => ({state, setState, text, setText, isFocused, setFocused, clear}),
    [clear, isFocused, state, text],
  );

  return (
    <AppTextInputContext.Provider value={value}>
      <View style={[containerStyle, styles.container]}>{children}</View>
    </AppTextInputContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {alignSelf: 'stretch', rowGap: 8},
});
