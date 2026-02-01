import {Pressable} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

import {AppActivityIndicator} from '@components/AppActivityIndicator.tsx';

export const ActivityOverlay = ({
  isVisible,
  messages,
  onCancelPress,
}: {
  isVisible?: boolean;
  messages?: string[];
  onCancelPress?: () => void;
}) => {
  return isVisible ? (
    <Pressable onPress={onCancelPress} style={styles.container} pointerEvents={'auto'}>
      <AppActivityIndicator messages={messages} />
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
