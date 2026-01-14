import {Pressable, StyleSheet} from 'react-native';

import {AppActivityIndicator} from '@components/AppActivityIndicator.tsx';

export const ActivityOverlay = ({
  isVisible,
  onCancelPress,
}: {
  isVisible?: boolean;
  onCancelPress?: () => void;
}) => {
  return isVisible ? (
    <Pressable onPress={onCancelPress} style={styles.container} pointerEvents={'auto'}>
      <AppActivityIndicator />
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
