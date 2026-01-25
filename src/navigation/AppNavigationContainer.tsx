import {useRef} from 'react';
import {StatusBar} from 'react-native';

import type {NavigationContainerProps, NavigationContainerRef} from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';
import {useReactNavigationDevTools} from '@rozenite/react-navigation-plugin';

import {RootStack} from './RootStack.tsx';

export const AppNavigationContainer = ({onReady}: Pick<NavigationContainerProps, 'onReady'>) => {
  const ref = useRef<NavigationContainerRef<any>>(null);

  useReactNavigationDevTools({ref: ref});

  return (
    <NavigationContainer ref={ref} onReady={onReady}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <RootStack />
    </NavigationContainer>
  );
};
