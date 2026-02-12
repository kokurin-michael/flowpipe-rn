import '@assets/unistyles';
import '@assets/i18n';

import {useState} from 'react';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNetworkActivityDevTools} from '@rozenite/network-activity-plugin';
import {RozeniteOverlay} from '@rozenite/overlay-plugin';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {asyncStoragePersister, queryClient} from '@api';
import {AnimatedBootSplash} from '@components';
import {AppNavigationContainer} from '@navigation';

function App() {
  useNetworkActivityDevTools();

  const [isNavigationReady, setIsNavigationReady] = useState(false);

  return (
    <>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{persister: asyncStoragePersister}}>
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
