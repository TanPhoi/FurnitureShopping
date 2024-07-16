import React, {JSX} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamsList} from '../../routers/AppNavigation';
import {colors} from '@/themes/colors';
import useStatusBarEffect from '@/hook/useHook';
import {commonStyles} from '@/utils/styles';

type BoardingProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Boarding'>;
};

const Boarding = ({navigation}: BoardingProps): JSX.Element => {
  useStatusBarEffect();

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/img_background_boarding.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[commonStyles.txtHeader, styles.txtMakeYour]}>
            MAKE YOUR
          </Text>
          <Text style={[commonStyles.txtHeader, styles.txtHomeBeautiful]}>
            HOME BEAUTIFUL
          </Text>
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
    padding: 20,
    justifyContent: 'space-around',
  },

  titleContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  txtMakeYour: {
    color: colors.text,
  },
  txtHomeBeautiful: {
    marginTop: 10,
    color: colors.textTitle,
  },
  txtContent: {
    marginTop: 40,
    fontSize: 16,
    color: colors.text,
    alignSelf: 'flex-end',
    lineHeight: 24,
    letterSpacing: 1.4,
  },

  viewButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.button,
    paddingVertical: 14,
    paddingHorizontal: 38,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    elevation: 4,
  },
  txtButton: {
    color: colors.textButton,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Boarding;
