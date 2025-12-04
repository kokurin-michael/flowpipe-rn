import {
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BlurEvent, FocusEvent, TextInput } from 'react-native';
import {
  AppTextInputProps,
  AppTextInputRef,
} from './types';
import { isEmpty } from 'lodash';

export const useAppTextInput = (ref: ForwardedRef<AppTextInputRef>, props: AppTextInputProps) => {
  const localRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);

  const [text, setText] = useState(props.defaultValue ?? props.value ?? '');

  const isPlaceholderVisible = useMemo(
    () => props.placeholder && !isFocused && isEmpty(text),
    [isFocused, props.placeholder, text],
  );

  const onChangeText = useCallback(
    (t: string) => {
      setText(t);
      props.onChangeText ? props.onChangeText(t) : null;
    },
    [props],
  );

  const onFocus = useCallback(
    (e: FocusEvent) => {
      setIsFocused(true);
      props.onFocus ? props.onFocus(e) : null;
    },
    [props],
  );

  const onBlur = useCallback(
    (e: BlurEvent) => {
      setIsFocused(false);
      props.onBlur ? props.onBlur(e) : null;
    },
    [props],
  );

  const clear = useCallback(() => {
    const current = localRef.current!;
    current.clear();
    current.blur();
    setText('');
    props.onChangeText ? props.onChangeText('') : null;
    props.onClear ? props.onClear() : null;
  }, [props]);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
    blur: () => localRef.current?.blur?.(),
    clear,
    isFocused: () => !!localRef.current?.isFocused?.(),
  }));

  return {
    localRef,
    isPlaceholderVisible,
    isFocused,
    onChangeText,
    onFocus,
    onBlur,
  };
};
