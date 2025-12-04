import '@assets/unistyles.ts';
import { StatusBar} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { EntryScreen } from '@screens';
import { KeyboardProvider } from 'react-native-keyboard-controller';

function App() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <StatusBar barStyle={'default'} />
        <EntryScreen />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

export default App;
