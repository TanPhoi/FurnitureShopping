import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {JSX} from 'react';
import TabNavigation from '@/routers/TabNavigation';
import {Product} from '@/screens';
import {ImageSourcePropType} from 'react-native';

export type RootMainStackParamsList = {
  TabNavigation: undefined;
  Product: {
    id: number;
    image: ImageSourcePropType;
    label: string;
    price: number;
    rate: number;
    review: number;
    desc: string;
  };
};

const Stack = createNativeStackNavigator<RootMainStackParamsList>();
const MainStackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
