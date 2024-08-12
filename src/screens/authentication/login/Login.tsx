import {ButtonMain, HeaderDivider, TextInputMain} from '@/commons';
import {
  FIELDS_REQUIRED,
  GET_DATA_ERROR,
  INVALID_CREDENTIALS_ERROR,
} from '@/constants/message.constant';
import {User} from '@/model/user.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {getDataLocalStorage, setDataLocalStorage} from '@/utils';
import {CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type LoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Login'>;
};

const Login = ({navigation}: LoginProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //TODO: implement later
  const handleForgotPassword = (): void => {};

  const handleRegister = (): void => {
    navigation.navigate('Register');
  };

  const handleLogin = (): void => {
    if (!email || !password) {
      Alert.alert(FIELDS_REQUIRED);
      return;
    }

    getDataLocalStorage<User>('user')
      .then(user => {
        if (user) {
          if (user.email === email && user.password === password) {
            setDataLocalStorage('loggedInUser', user);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'MainNavigator'}],
              }),
            );
          } else {
            Alert.alert(INVALID_CREDENTIALS_ERROR);
          }
        }
      })
      .catch(error => {
        console.error(GET_DATA_ERROR, error);
      });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerDivider}>
          <HeaderDivider />
        </View>

        <View style={styles.txtContainer}>
          <Text style={styles.txtHello}>Hello !</Text>
          <Text style={styles.txtWelcome}>WELCOME BACK</Text>
        </View>
      </View>

      <View style={styles.formBottom}>
        <View style={styles.formLogin}>
          <TextInputMain
            label="Email"
            isShowPassword={false}
            onChangeText={setEmail}
          />

          <TextInputMain
            label="Password"
            isShowPassword
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.tcbForgotPassword}
            onPress={handleForgotPassword}>
            <Text style={styles.txtForgotPassword}>Forgot Password</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <ButtonMain title="Log in" onPress={handleLogin} />
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
    padding: spacing.lg,
  },

  headerDivider: {
    marginTop: spacing.sm,
  },

  txtContainer: {
    marginTop: spacing.xl,
  },
  txtHello: {
    color: colors.grey_2,
    fontSize: 30,
    fontFamily: 'Merriweather',
    lineHeight: 45,
  },
  txtWelcome: {
    color: colors.black_font,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1.2,
    lineHeight: 45,
  },

  formBottom: {
    alignItems: 'center',
  },
  formLogin: {
    backgroundColor: colors.secondary,
    width: '92%',
    paddingVertical: spacing.xl,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    rowGap: spacing.sm,
  },

  tcbForgotPassword: {
    marginTop: spacing.md,
    alignSelf: 'center',
  },
  txtForgotPassword: {
    color: colors.black_font,
    fontSize: 18,
    fontFamily: 'NunitoSans',
    fontWeight: '600',
  },

  button: {
    marginTop: spacing.md,
    marginHorizontal: spacing.lg,
  },

  tcbSignUp: {
    marginTop: spacing.md,
    alignSelf: 'center',
  },
  txtSignUp: {
    color: colors.black_font,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'NunitoSans',
  },
});

export default Login;
