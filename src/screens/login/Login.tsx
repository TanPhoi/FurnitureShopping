import {CustomButton, HeaderDivider, TextWithInput} from '@/components';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors} from '@/themes/colors';
import {commonStyles} from '@/utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type LoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Login'>;
};

type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Login = ({navigation}: LoginProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleForgotPassword = () => {};

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData !== null) {
        const parsedUserData: User = JSON.parse(userData);
        if (
          parsedUserData.email === email &&
          parsedUserData.password === password
        ) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'TabNavigation'}],
            }),
          );
        } else {
          Alert.alert('Email or password is incorrect');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerDivider}>
          <HeaderDivider />
        </View>

        <View style={styles.txtContainer}>
          <Text style={[commonStyles.txtHeader, styles.txtHello]}>Hello !</Text>
          <Text style={[commonStyles.txtHeader, styles.txtWelcome]}>
            WELCOME BACK
          </Text>
        </View>
      </View>

      <View style={styles.formBottom}>
        <View style={styles.formLogin}>
          <TextWithInput
            label={'Email'}
            isShowPassword={false}
            onChangeText={setEmail}
          />

          <TextWithInput
            label={'Password'}
            isShowPassword={true}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.tcbForgotPassword}
            onPress={handleForgotPassword}>
            <Text style={styles.txtForgotPassword}>Forgot Password</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <CustomButton title="Log in" onPress={handleLogin} />
          </View>

          <TouchableOpacity style={styles.tcbSignUp} onPress={handleRegister}>
            <Text style={styles.txtSignUp}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  headerDivider: {
    marginTop: 10,
  },

  txtContainer: {
    marginTop: 40,
  },
  txtHello: {
    color: colors.text,
  },
  txtWelcome: {
    color: colors.textTitle,
  },

  formBottom: {
    alignItems: 'center',
  },
  formLogin: {
    backgroundColor: colors.primary,
    width: '92%',
    paddingVertical: 40,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    rowGap: 10,
  },

  tcbForgotPassword: {
    marginTop: 20,
    alignSelf: 'center',
  },
  txtForgotPassword: {
    color: colors.label,
    fontSize: 14,
  },

  button: {marginTop: 20},

  tcbSignUp: {
    marginTop: 20,
    alignSelf: 'center',
  },
  txtSignUp: {
    color: colors.label,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
