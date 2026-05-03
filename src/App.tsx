import '@assets/unistyles';
import '@assets/i18n';

import {useState} from 'react';
import {Platform} from 'react-native';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useMMKVDevTools} from '@rozenite/mmkv-plugin';
import {useNetworkActivityDevTools} from '@rozenite/network-activity-plugin';
import {RozeniteOverlay} from '@rozenite/overlay-plugin';
import {useTanStackQueryDevTools} from '@rozenite/tanstack-query-plugin';
import {focusManager} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import type {AppStateStatus} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {mmkvDevToolsOptions, persistOptions, queryClient} from '@api';
import {AnimatedBootSplash} from '@components';
import {useAppState, useOnlineManager} from '@hooks';
import {AppNavigationContainer} from '@navigation';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

function App() {
  useNetworkActivityDevTools();
  useTanStackQueryDevTools(queryClient);
  useMMKVDevTools(mmkvDevToolsOptions);

  useOnlineManager();
  useAppState(onAppStateChange);

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
