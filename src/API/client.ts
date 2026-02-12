import NetInfo from '@react-native-community/netinfo';
import {onlineManager, QueryClient} from '@tanstack/react-query';
import Config from 'react-native-config';

const DEFAULT_BASE_URL = 'http://127.0.0.1:8000';

export const baseUrl = (Config.API_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '') as string;

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
