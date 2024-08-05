import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {JSX} from 'react';
import TabNavigation from '@/routers/TabNavigation';
import {
  AddShippingAddress,
  MyCart,
  MyOrder,
  MyReviews,
  OrderSuccess,
  Product,
  ReviewsProduct,
  Setting,
  ShippingAddress,
} from '@/screens';
import {RootStackParamsList} from './AppNavigation';
import AuthNavigator from './AuthNavigator';
import PaymentMethod from '@/screens/paymentMethod/PaymentMethod';
import AddPaymentMethod from '@/screens/addPaymentMethod/AddPayamentMethod';

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
      <MainStack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen name="AuthNavigator" component={AuthNavigator} />
      <MainStack.Screen name="MyReviews" component={MyReviews} />
      <MainStack.Screen name="ReviewsProduct" component={ReviewsProduct} />
      <MainStack.Screen name="ShippingAddress" component={ShippingAddress} />
      <MainStack.Screen
        name="AddShippingAddress"
        component={AddShippingAddress}
      />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="MyOrder" component={MyOrder} />
      <MainStack.Screen name="PaymentMethod" component={PaymentMethod} />
      <MainStack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
