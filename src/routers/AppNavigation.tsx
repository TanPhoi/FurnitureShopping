import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Boarding from '../screens/boarding/Boarding';
import TabNavigation from './TabNavigation';
import Login from '../screens/login/Login';
import SignUp from '../screens/signUp/SignUp';

export type RootStackParamsList = {
  Boarding: undefined;
  Login: undefined;
  SignUp: undefined;
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
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
