module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    'babel-plugin-react-compiler',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@types': './src/@types',
          '@types/*': './src/@types/*',
          '@api': './src/API',
          '@api/*': './src/API/*',
          '@assets': './src/assets',
          '@assets/*': './src/assets/*',
          '@components': './src/components',
          '@components/*': './src/components/*',
          '@hooks': './src/hooks',
          '@hooks/*': './src/hooks/*',
          '@navigation': './src/navigation',
          '@navigation/*': './src/navigation/*',
          '@redux': './src/redux',
          '@redux/*': './src/redux/*',
          '@schema': './src/schema',
          '@schema/*': './src/schema/*',
          '@screens': './src/screens',
          '@screens/*': './src/screens/*',
          '@utils': './src/utils',
          '@utils/*': './src/utils/*',
        },
      },
    ],
    [
      'react-native-unistyles/plugin',
      {
        root: 'src',
      },
    ],
    'react-native-worklets/plugin',
  ],
};
