import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {JSX} from 'react';
import TabNavigation from '@/routers/TabNavigation';

export type RootMainStackParamsList = {
  TabNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootMainStackParamsList>();
const MainStackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
