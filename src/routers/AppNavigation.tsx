import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Boarding, Login, Register} from '@/screens';
import TabNavigation from '@/routers/TabNavigation';

export type RootStackParamsList = {
  Boarding: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();
const AppNavigation = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="Boarding" component={Boarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
