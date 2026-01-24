import type {RootStackParamList} from '@navigation';

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
