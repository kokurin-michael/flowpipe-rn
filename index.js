import {AppRegistry, Text, TextInput} from 'react-native';

import App from './src/App';
import {name as appName} from './app.json';

Text.defaultProps = {
  ...Text.defaultProps,
  allowFontScaling: false,
  includeFontPadding: false,
};
TextInput.defaultProps = {
  ...TextInput.defaultProps,
  allowFontScaling: false,
  includeFontPadding: false,
};

AppRegistry.registerComponent(appName, () => App);
