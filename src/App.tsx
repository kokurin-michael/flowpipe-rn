import '@assets/unistyles';
import '@assets/i18n';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNetworkActivityDevTools} from '@rozenite/network-activity-plugin';
import {RozeniteOverlay} from '@rozenite/overlay-plugin';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigationContainer} from '@navigation';

function App() {
  useNetworkActivityDevTools();

  return (
    <>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <KeyboardProvider>
            <BottomSheetModalProvider>
              <AppNavigationContainer />
            </BottomSheetModalProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <RozeniteOverlay />
    </>
  );
}

export default App;
