import {Keyboard, Pressable} from 'react-native';

import type {PressableProps} from 'react-native';

export const KeyboardDismissPressable = (props: PressableProps) => {
  return (
    <Pressable onPress={Keyboard.dismiss} {...props}>
      {props.children}
    </Pressable>
  );
};
