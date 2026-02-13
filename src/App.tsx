import '@assets/unistyles';
import '@assets/i18n';

import {useState} from 'react';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useMMKVDevTools} from '@rozenite/mmkv-plugin';
import {useNetworkActivityDevTools} from '@rozenite/network-activity-plugin';
import {RozeniteOverlay} from '@rozenite/overlay-plugin';
import {useTanStackQueryDevTools} from '@rozenite/tanstack-query-plugin';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {mmkvDevToolsOptions, persistOptions, queryClient} from '@api';
import {AnimatedBootSplash} from '@components';
import {AppNavigationContainer} from '@navigation';

function App() {
  useNetworkActivityDevTools();
  useTanStackQueryDevTools(queryClient);
  useMMKVDevTools(mmkvDevToolsOptions);

  const [isNavigationReady, setIsNavigationReady] = useState(false);

  return (
    <>
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <KeyboardProvider>
              <BottomSheetModalProvider>
                <AppNavigationContainer onReady={() => setIsNavigationReady(true)} />
              </BottomSheetModalProvider>
            </KeyboardProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistQueryClientProvider>
      <RozeniteOverlay />
      <AnimatedBootSplash isReady={isNavigationReady} />
    </>
  );
}

export default App;
