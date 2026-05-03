import {View} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

export const Divider = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create(theme => ({
  container: {
    color: theme.colors.neutral[50],
    height: 1,
  },
}));
