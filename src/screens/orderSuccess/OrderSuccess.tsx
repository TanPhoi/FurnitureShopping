import {ic_background_success, ic_checkMark, ic_success} from '@/assets/icons';
import {ButtonMain} from '@/commons';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useEffect} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type OrderSuccessProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'OrderSuccess'>;
};
const OrderSuccess = ({navigation}: OrderSuccessProps): JSX.Element => {
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //TODO: implement later
  const handleTrackOrder = (): void => {};

  const handleBackHome = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'TabNavigation'}],
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.txtSuccess}> SUCCESS!</Text>

        <View style={styles.boxSuccess}>
          <Image
            style={styles.icon_background}
            source={ic_background_success}
          />
          <Image style={styles.icon_success} source={ic_success} />
          <Image style={styles.icon} source={ic_checkMark} />
        </View>

        <Text style={styles.txtDesc}>
          Your order will be delivered soon.{'\n'}Thank you for choosing our
          app!
        </Text>
      </View>
      <View style={styles.button}>
        <ButtonMain title={'Track your orders'} onPress={handleTrackOrder} />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleBackHome}>
        <Text style={styles.txt}>BACK TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: 'center',
  },
  txtSuccess: {
    color: colors.black_font,
    fontFamily: 'Merriweather',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 35,
    letterSpacing: 1.8,
  },

  boxSuccess: {
    marginTop: spacing.xxl,
  },
  icon_background: {
    width: 268,
    height: 230,
    resizeMode: 'center',
  },
  icon_success: {
    position: 'absolute',
    left: 35,
    right: 35,
    top: 24,
    bottom: 24,
    width: 200,
    height: 180,
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
    bottom: -25,
    right: 108,
    left: 108,
    width: 50,
    height: 50,
  },
  txtDesc: {
    marginTop: spacing.xxxl,
    color: colors.black_3,
    fontFamily: 'NunitoSans',
    fontSize: 18,
    lineHeight: 27,
  },

  button: {
    marginTop: spacing.xxxl,
    marginHorizontal: spacing.lg,
  },

  buttonContainer: {
    marginTop: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  txt: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'NunitoSans',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default OrderSuccess;
