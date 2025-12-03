import { StatusBar} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles'
import { EntryScreen } from '@screens';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'default'} />
        <EntryScreen />
    </SafeAreaProvider>
  );
}

export default App;
