import {useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react';

import {isEmpty} from 'lodash';
import type {ForwardedRef} from 'react';
import type {BlurEvent, FocusEvent, TextInput} from 'react-native';

import type {AppTextInputProps, AppTextInputRef} from './types';

export const useAppTextInput = (ref: ForwardedRef<AppTextInputRef>, props: AppTextInputProps) => {
  const localRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);

  const [text, setText] = useState(props.defaultValue ?? props.value ?? '');

  const isPlaceholderVisible = useMemo(
    () => props.placeholder && !isFocused && isEmpty(text),
    [isFocused, props.placeholder, text],
  );

  const isClearVisible = useMemo(() => isFocused && !isEmpty(text), [isFocused, text]);

  const onChangeText = useCallback(
    (t: string) => {
      setText(t);
      props.onChangeText?.(t);
    },
    [props],
  );

  const onFocus = useCallback(
    (e: FocusEvent) => {
      setIsFocused(true);
      props.onFocus?.(e);
    },
    [props],
  );

  const onBlur = useCallback(
    (e: BlurEvent) => {
      setIsFocused(false);
      props.onBlur?.(e);
    },
    [props],
  );

  const clear = useCallback(() => {
    const current = localRef.current!;
    current.clear();
    setText('');
    props.onChangeText?.('');
    props.onClear?.();
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
    isClearVisible,
    isFocused,
    onChangeText,
    onFocus,
    onBlur,
    clear,
  };
};
