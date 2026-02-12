import NetInfo from '@react-native-community/netinfo';
import {onlineManager, QueryClient} from '@tanstack/react-query';

export const baseUrl = 'http://127.0.0.1:8000' as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Number.POSITIVE_INFINITY,
      networkMode: 'offlineFirst',
    },
  },
});

function setupNetworkListener(): void {
  NetInfo.fetch()
    .then(state => {
      onlineManager.setOnline(state.isConnected === true);
      return;
    })
    .catch(() => {
      onlineManager.setOnline(false);
    });

  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      setOnline(state.isConnected === true);
    });
  });
}

setupNetworkListener();
