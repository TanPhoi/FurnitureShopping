import {NavigationContainer} from '@react-navigation/native';
import React, {JSX, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, StyleSheet, ImageSourcePropType} from 'react-native';
import MainNavigator from '@/routers/MainNavigator';
import AuthNavigator from '@/routers/AuthNavigator';
import {colors} from '@/themes';
import {Product} from '@/model/production.model';
import {User} from '@/model/user.model';
import {getDataLocalStorage} from '@/utils';

export type RootStackParamsList = {
  Boarding: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigation: undefined;
  MainNavigator: undefined;
  AuthNavigator: undefined;
  Product: {product: Product};
  MyCart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppNavigation = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = (): void => {
      //   try {
      //     const userData = await getDataLocalStorage<User>('loggedInUser');
      //     if (userData) {
      //       // const parsedUserData: User = JSON.parse(userData);
      //       setUser(userData);
      //     }
      //   } catch (err) {
      //     console.error('Error fetching user data:', err);
      //   } finally {
      //     setLoading(false);
      //   }
      // };

      getDataLocalStorage<User>('loggedInUser')
        .then(user => {
          setUser(user);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchUser();
  }, []);

  if (loading) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
        ) : (
          <>
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default AppNavigation;
