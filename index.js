import {AppRegistry, Text, TextInput} from 'react-native';

import {withOnBootNetworkActivityRecording} from '@rozenite/network-activity-plugin';

import App from './src/App';
import {name as appName} from './app.json';

withOnBootNetworkActivityRecording();

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
