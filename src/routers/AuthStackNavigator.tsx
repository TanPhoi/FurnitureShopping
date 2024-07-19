import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {JSX, useEffect, useState} from 'react';
import {Boarding, Login, Register} from '@/screens';
import TabNavigation from './TabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootAuthStackParamsList = {
  Boarding: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootAuthStackParamsList>();
const AuthStackNavigator = (): JSX.Element => {
  const [initialRoute, setInitialRoute] = useState<boolean | undefined>(
    undefined,
  );

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
      {!initialRoute ? (
        <Stack.Screen name="Boarding" component={Boarding} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
