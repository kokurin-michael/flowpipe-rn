import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {EntryScreen} from '@screens';

type ParamList = {
  Entry: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Entry" component={EntryScreen} />
    </Stack.Navigator>
  );
};

export {RootStack, type ParamList as RootStackParamList};
