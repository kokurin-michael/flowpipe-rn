import {Pressable} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

import {CloseIcon} from '@assets';
import {useAppTextInput} from '@components/AppTextInput/useAppTextInput.tsx';

export const Clear = () => {
  const {text, clear} = useAppTextInput();
  const isTextNotEmpty = text !== '';

  return isTextNotEmpty ? (
    <Pressable style={styles.clearContainer} onPress={clear}>
      <CloseIcon height={24} width={24} />
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  clearContainer: {
    justifyContent: 'center',
  },
});
