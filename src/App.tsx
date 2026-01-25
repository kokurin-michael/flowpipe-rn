import '@assets/unistyles';
import '@assets/i18n';

import {useState} from 'react';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNetworkActivityDevTools} from '@rozenite/network-activity-plugin';
import {RozeniteOverlay} from '@rozenite/overlay-plugin';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AnimatedBootSplash} from '@components';
import {AppNavigationContainer} from '@navigation';

function App() {
  useNetworkActivityDevTools();

  const [isNavigationReady, setIsNavigationReady] = useState(false);

  return (
    <>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <KeyboardProvider>
            <BottomSheetModalProvider>
              <AppNavigationContainer onReady={() => setIsNavigationReady(true)} />
            </BottomSheetModalProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <RozeniteOverlay />
      <AnimatedBootSplash isReady={isNavigationReady} />
    </>
  );
}

export default App;
