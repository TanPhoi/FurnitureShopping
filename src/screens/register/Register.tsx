import {CustomButton, HeaderDivider, TextWithInput} from '@/components';
import {RootStackParamsList} from '@/routers/AppNavigation';

import {colors} from '@/themes/colors';
import {commonStyles} from '@/utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Register'>;
};
const Register = ({navigation}: RegisterProps): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const saveUserDataToAsyncStorage = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      navigation.goBack();
    } catch (err) {
      console.error('Error saving user data:', err);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 && /[A-Z!@#$%^&*]/.test(password);
  };

  const handleRegister = async () => {
    // if (!name || !email || !password || !confirmPassword) {
    //   Alert.alert('Please, fill in all the fields');
    //   return;
    // }

    // if (!validateEmail(email)) {
    //   Alert.alert('Please, enter a valid email');
    //   return;
    // }

    // if (!validatePassword(password)) {
    //   Alert.alert(
    //     'Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character',
    //   );
    //   return;
    // }

    // if (confirmPassword !== password) {
    //   Alert.alert('Passwords do not match');
    //   return;
    // }

    const userData: User = {name, email, password, confirmPassword};

    saveUserDataToAsyncStorage(userData);
  };

  const handleBackLogin = () => {
    navigation.goBack();
  };

  const inputFields = [
    {
      label: 'Name',
      isShowPassword: false,
      value: false,
      changeText: setName,
    },
    {
      label: 'Email',
      isShowPassword: false,
      value: false,
      changeText: setEmail,
    },
    {
      label: 'Password',
      isShowPassword: true,
      value: false,
      changeText: setPassword,
    },
    {
      label: 'Confirm Password',
      isShowPassword: true,
      value: false,
      changeText: setConfirmPassword,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerDivider}>
          <HeaderDivider />
        </View>

        <View style={styles.txtContainer}>
          <Text style={[commonStyles.txtHeader, styles.txtWelcome]}>
            WELCOME
          </Text>
        </View>
      </View>

      <View style={styles.formBottom}>
        <View style={styles.formLogin}>
          {inputFields.map((input, index) => (
            <TextWithInput
              key={index}
              label={input.label}
              isShowPassword={input.isShowPassword}
              onChangeText={input.changeText}
            />
          ))}

          <View style={styles.button}>
            <CustomButton title="SIGN UP" onPress={handleRegister} />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.txtHaveAccount}>Already have account? </Text>
            <TouchableOpacity
              style={styles.tcbSignUp}
              onPress={handleBackLogin}>
              <Text style={styles.txtSignUp}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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

  button: {marginTop: 20},

  signUpContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtHaveAccount: {
    color: colors.label,
    fontSize: 14,
  },
  tcbSignUp: {
    alignSelf: 'center',
  },
  txtSignUp: {
    color: colors.label,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
