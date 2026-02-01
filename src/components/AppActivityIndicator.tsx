import {useEffect} from 'react';
import {Text, View} from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native-unistyles';

import {images} from '@assets';

// TODO: Добавить анимацию нескольких сообщений и убрать join(' ')
export const AppActivityIndicator = ({
  size = 30,
  duration = 900,
  messages,
}: {
  size?: number;
  duration?: number;
  messages?: string[];
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [duration, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[{width: size, height: size}, animatedStyle]}
        source={images.spinner}
      />
      {messages && messages.length > 0 ? (
        <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.text}>
          {messages.join(' ')}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  text: {
    ...theme.fonts.s12w400,
    color: theme.colors.primary[500],
    maxWidth: 200,
    textAlign: 'center',
  },
}));
