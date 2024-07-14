import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamsList} from '../../routers/AppNavigation';

type BoardingProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Boarding'>;
};
const Boarding = ({navigation}: BoardingProps): React.JSX.Element => {
  return (
    <View>
      <Text>Boarding</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Boarding;
