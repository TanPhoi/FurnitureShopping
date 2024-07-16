import {CustomButton, HeaderDivider, TextWithInput} from '@/components';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors} from '@/themes/colors';
import {commonStyles} from '@/utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, JSX} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type LoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Login'>;
};

const Login = ({navigation}: LoginProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedValues = await AsyncStorage.getItem('user');
      if (!email || !password) {
        Alert.alert('Please fill in the blanks');
        return;
      }

      if (storedValues) {
        const userData = JSON.parse(storedValues);
        if (userData.email === email && userData.password === password) {
          navigation.navigate('TabNavigation');
        } else {
          Alert.alert('Email or password incorrect');
        }
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  const handleForgotPassword = () => {};

  const handleRegister = () => {
    navigation.navigate('Register');
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

      <View style={styles.formLogin}>
        <TextWithInput
          label={'Email'}
          isShow={false}
          onChangeText={setEmail}
          isCheck={false}
        />

        <TextWithInput
          label={'Password'}
          isShow={true}
          onChangeText={setPassword}
          isCheck={false}
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
