import {QueryClient} from '@tanstack/react-query';

const DEFAULT_STALE_TIME_MS = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME_MS,
      networkMode: 'online',
      retry: 1,
    },
  },
});

export {queryClient};
