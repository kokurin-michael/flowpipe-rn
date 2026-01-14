import {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {images} from '@assets';

export const AppActivityIndicator = ({
  size = 30,
  duration = 900,
}: {
  size?: number;
  duration?: number;
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
    <Animated.Image
      style={[styles.container, {width: size, height: size}, animatedStyle]}
      source={images.spinner}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
