import { Keyboard, Pressable, PressableProps } from 'react-native';

export const KeyboardDismissPressable = (props: PressableProps) => {
  return (<Pressable onPress={Keyboard.dismiss} {...props}>{props.children}</Pressable>)
}