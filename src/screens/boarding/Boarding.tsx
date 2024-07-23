import React, {JSX} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {colors} from '@/themes/colors';
import {useStatusBarEffect} from '@/hooks';
import {img_background_boarding} from '@/assets/images';
import {spacing} from '@/themes';
import {RootStackParamsList} from '@/routers/AppNavigation';

type BoardingProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Boarding'>;
};

const Boarding = ({navigation}: BoardingProps): JSX.Element => {
  useStatusBarEffect();

  const handleNavigateToLogin = (): void => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={img_background_boarding}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.txtMakeYour}>MAKE YOUR</Text>
          <Text style={styles.txtHomeBeautiful}>HOME BEAUTIFUL</Text>
          <Text style={styles.txtContent}>
            The best simple place where you{'\n'}
            discover most wonderful furnitures{'\n'}
            and make your home beautiful
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNavigateToLogin}>
          <Text style={styles.txtButton}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-around',
  },

  titleContainer: {
    marginTop: spacing.xl,
  },
  txtMakeYour: {
    color: colors.black_3,
    fontFamily: 'Gelasio',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  txtHomeBeautiful: {
    marginTop: spacing.sm,
    color: colors.black_font,
    fontSize: 30,
    fontWeight: '700',
  },
  txtContent: {
    marginTop: spacing.md,
    fontSize: 18,
    color: colors.grey,
    alignSelf: 'flex-end',
    fontFamily: 'NunitoSans',
    lineHeight: 35,
    textAlign: 'justify',
  },

  viewButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.button,
    width: 159,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    elevation: 4,
  },
  txtButton: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Gelasio',
  },
});

export default Boarding;
