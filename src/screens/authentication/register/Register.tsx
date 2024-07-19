import {ButtonMain, HeaderDivider, TextInputMain} from '@/commons';
import {RootAuthStackParamsList} from '@/routers/AuthStackNavigator';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useState} from 'react';
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
  navigation: NativeStackNavigationProp<RootAuthStackParamsList, 'Register'>;
};

const Register = ({navigation}: RegisterProps): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const saveUserDataToAsyncStorage = async (userData: User): Promise<void> => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      navigation.goBack();
    } catch (err) {
      console.error('Error saving user data:', err);
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6 && /[A-Z!@#$%^&*]/.test(password);
  };

  const handleRegister = async (): Promise<void> => {
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

  const handleBackLogin = (): void => {
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
          <Text style={styles.txtWelcome}>WELCOME</Text>
        </View>
      </View>

      <View style={styles.formBottom}>
        <View style={styles.formLogin}>
          {inputFields.map((input, index) => (
            <TextInputMain
              key={index}
              label={input.label}
              isShowPassword={input.isShowPassword}
              onChangeText={input.changeText}
            />
          ))}

          <View style={styles.button}>
            <ButtonMain title="SIGN UP" onPress={handleRegister} />
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
    padding: spacing.lg,
  },

  headerDivider: {
    marginTop: spacing.sm,
  },

  txtContainer: {
    marginTop: spacing.xl,
  },
  txtHello: {
    color: colors.text,
  },
  txtWelcome: {
    color: colors.black_font,
    fontFamily: 'Merriweather',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  formBottom: {
    alignItems: 'center',
  },
  formLogin: {
    backgroundColor: colors.secondary,
    width: '92%',
    paddingVertical: spacing.lg,
    shadowColor: colors.black_3,
    shadowOffset: {width: 0, height: spacing.xs},
    shadowOpacity: 0.2,
    shadowRadius: spacing.xs,
    elevation: 4,
  },

  button: {
    marginTop: spacing.md,
  },

  signUpContainer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtHaveAccount: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: 'NunitoSans',
    fontWeight: '600',
  },
  tcbSignUp: {
    alignSelf: 'center',
  },
  txtSignUp: {
    color: colors.black_font,
    fontWeight: '700',
  },
});

export default Register;
