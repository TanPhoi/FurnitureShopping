import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {JSX, useEffect, useState} from 'react';
import {Boarding, Login, Register} from '@/screens';
import TabNavigation from './TabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStackNavigator from './MainStackNavigator';

export type RootAuthStackParamsList = {
  Boarding: undefined;
  Login: undefined;
  Register: undefined;
  MainStackNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootAuthStackParamsList>();
const AuthStackNavigator = (): JSX.Element => {
  const [initialRoute, setInitialRoute] = useState<boolean | undefined>(false);

  useEffect(() => {
    AsyncStorage.getItem('hasSeenBoarding')
      .then(hasSeenBoarding => {
        if (hasSeenBoarding === 'true') {
          setInitialRoute(true);
        } else {
          setInitialRoute(false);
        }
      })
      .catch(err => {
        console.log(`${err}`);
      });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!initialRoute && <Stack.Screen name="Boarding" component={Boarding} />}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MainStackNavigator" component={MainStackNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
