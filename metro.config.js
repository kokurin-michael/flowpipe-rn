const {withRozenite} = require('@rozenite/metro');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = withRozenite(mergeConfig(getDefaultConfig(__dirname), config), {
  enabled: process.env.WITH_ROZENITE === 'true',
  include: [
    '@rozenite/mmkv-plugin',
    '@rozenite/tanstack-query-plugin',
    '@rozenite/network-activity-plugin',
    '@rozenite/react-navigation-plugin',
    '@rozenite/overlay-plugin',
  ],
});
