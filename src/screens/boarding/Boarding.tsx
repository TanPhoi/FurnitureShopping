import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamsList} from '../../routers/AppNavigation';

type BoardingProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Boarding'>;
};
const Boarding = ({navigation}: BoardingProps): JSX.Element => {
  return (
    <View>
      <Text>Boarding</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Boarding;
