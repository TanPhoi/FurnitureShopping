import {CustomButton, HeaderDivider, TextWithInput} from '@/components';
import {
  useDisabled,
  useFormValues,
  useIsCheck,
  usePasswordVisibility,
} from '@/hook';
import {CheckValues} from '@/hook/useIsCheck';
import {colors} from '@/themes/colors';
import {commonStyles} from '@/utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Register = (): JSX.Element => {
  const {disabled, setDisabled} = useDisabled();
  const {formValues, handleChange} = useFormValues();
  const {name, email, password, confirmPassword} = formValues;
  const {isCheck, setIsCheck} = useIsCheck();
  const {passwordVisibility, togglePasswordVisibility} =
    usePasswordVisibility();

  useEffect(() => {
    if (!name || !email || !password || !confirmPassword) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [formValues]);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = () => {
    const newIsCheck: CheckValues = {
      name: !name,
      email: !validateEmail(email),
      password: !(password.length >= 6 && /[A-Z!@#$%^&*]/.test(password)),
      confirmPassword: password !== confirmPassword,
    };

    setIsCheck(newIsCheck);

    if (Object.values(newIsCheck).some(value => value)) {
      setDisabled(true);
      return;
    }

    storeData();
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(formValues));
    } catch (error) {
      console.error('Error storing data to AsyncStorage:', error);
    }
  };

  const inputFields = [
    {
      label: 'Name',
      isShow: false,
      isCheck: isCheck.name,
      value: formValues.name,
      onChangeText: (text: string) => handleChange('name', text),
    },
    {
      label: 'Email',
      isShow: false,
      isCheck: isCheck.email,
      value: formValues.email,
      onChangeText: (text: string) => handleChange('email', text),
    },
    {
      label: 'Password',
      isShow: true,
      isCheck: isCheck.password,
      value: formValues.password,
      onChangeText: (text: string) => handleChange('password', text),
    },
    {
      label: 'Confirm Password',
      isShow: true,
      isCheck: isCheck.confirmPassword,
      value: formValues.confirmPassword,
      onChangeText: (text: string) => handleChange('confirmPassword', text),
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

      <View style={styles.formLogin}>
        {inputFields.map((input, index) => (
          <TextWithInput
            key={index}
            label={input.label}
            isShow={input.isShow}
            isCheck={input.isCheck}
            onChangeText={input.onChangeText}
            togglePasswordVisibility={() =>
              togglePasswordVisibility(
                input.label as keyof typeof passwordVisibility,
              )
            }
          />
        ))}

        <View style={styles.button}>
          <CustomButton
            title="SIGN UP"
            onPress={handleSignUp}
            disabled={disabled}
          />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.txtHaveAccount}>Already have account? </Text>
          <TouchableOpacity style={styles.tcbSignUp}>
            <Text style={styles.txtSignUp}>SIGN IN</Text>
          </TouchableOpacity>
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
