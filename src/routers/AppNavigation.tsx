import {NavigationContainer} from '@react-navigation/native';
import React, {JSX, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const AppNavigation = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('loggedInUser')
      .then(userData => {
        if (userData) {
          const parsedUserData: User = JSON.parse(userData);
          setUser(parsedUserData);
        }
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
  }, []);

  return (
    <NavigationContainer>
      {!user ? <AuthStackNavigator /> : <MainStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
