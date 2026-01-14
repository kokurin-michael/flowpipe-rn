import '@assets/unistyles.ts';

import {StatusBar} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {EntryScreen} from '@screens';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <KeyboardProvider>
          <StatusBar barStyle={'default'} />
          <EntryScreen />
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
