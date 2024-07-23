import {NavigationContainer} from '@react-navigation/native';
import React, {JSX, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, StyleSheet, ImageSourcePropType} from 'react-native';
import MainNavigator from '@/routers/MainNavigator';
import AuthNavigator from '@/routers/AuthNavigator';
import {colors} from '@/themes';

export type RootStackParamsList = {
  Boarding: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigation: undefined;
  MainNavigator: undefined;
  AuthNavigator: undefined;
  Product: {
    id: number;
    image: ImageSourcePropType;
    label: string;
    price: number;
    rate: number;
    review: number;
    desc: string;
    quantity: number;
  };
  MyCart: undefined;
};
type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppNavigation = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser');
        if (userData) {
          const parsedUserData: User = JSON.parse(userData);
          setUser(parsedUserData);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
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
