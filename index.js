import {AppRegistry, TextInput, Text} from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import i18n from './src/assets/i18n';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
  includeFontPadding: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
  includeFontPadding: false,
};

AppRegistry.registerComponent(appName, () => App);
