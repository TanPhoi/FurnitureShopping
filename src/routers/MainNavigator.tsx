import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {JSX} from 'react';
import TabNavigation from '@/routers/TabNavigation';
import {MyCart, Product} from '@/screens';
import {RootStackParamsList} from './AppNavigation';

const MainStack = createNativeStackNavigator<RootStackParamsList>();
const MainNavigator = (): JSX.Element => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="TabNavigation" component={TabNavigation} />
      <MainStack.Screen name="Product" component={Product} />
      <MainStack.Screen name="MyCart" component={MyCart} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
