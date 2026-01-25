import {useMemo, useState} from 'react';
import {Image, Text, View} from 'react-native';

import BootSplash from 'react-native-bootsplash';
import DeviceInfo from 'react-native-device-info';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {StyleSheet} from 'react-native-unistyles';
import {scheduleOnRN} from 'react-native-worklets';

import {bootsplash} from '@assets';

export function AnimatedBootSplash({isReady}: {isReady: boolean}) {
  const [splashVisible, setSplashVisible] = useState(true);

  const containerOpacity = useSharedValue(1);
  const logoOpacity = useSharedValue(1);
  const logoScale = useSharedValue(1);
  const logoTranslateY = useSharedValue(0);

  const versionLabel = useMemo(() => {
    const v = DeviceInfo.getVersion();
    const b = DeviceInfo.getBuildNumber();
    return `v${v} (${b})`;
  }, []);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{translateY: logoTranslateY.value}, {scale: logoScale.value}],
  }));

  const {container, logo} = BootSplash.useHideAnimation({
    ...bootsplash,
    ready: isReady,

    animate: () => {
      const d = 2500;

      containerOpacity.value = withTiming(0, {duration: d});
      logoOpacity.value = withTiming(0, {duration: d});
      logoScale.value = withTiming(0.92, {duration: d});
      logoTranslateY.value = withTiming(-10, {duration: d}, finished => {
        if (finished) {
          scheduleOnRN(setSplashVisible, false);
        }
      });
    },
  });

  if (!splashVisible) {
    return null;
  }

  return (
    <Animated.View {...container} style={[container.style, containerAnimatedStyle]}>
      <View style={styles.center}>
        <Animated.View style={logoAnimatedStyle}>
          <Image {...logo} />
        </Animated.View>
      </View>

      <View pointerEvents="none" style={styles.version}>
        <Text style={styles.versionText}>{versionLabel}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create(theme => ({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  version: {
    alignItems: 'center',
    bottom: 24,
    left: 0,
    position: 'absolute',
    right: 0,
  },

  versionText: {
    color: theme.colors.black,
    ...theme.fonts.s14w400,
  },
}));
