import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Boarding, Login, Register} from '@/screens';
import {RootStackParamsList} from './AppNavigation';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '@/themes';
import {getDataLocalStorage, setDataLocalStorage} from '@/utils';
import {GET_DATA_ERROR} from '@/constants/message.constant';

const AuthStack = createNativeStackNavigator<RootStackParamsList>();

const AuthNavigator = (): JSX.Element => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAppState = (): void => {
      getDataLocalStorage('isFirstLaunch')
        .then(firstLaunch => {
          if (!firstLaunch) {
            setDataLocalStorage('isFirstLaunch', 'true');
            setIsFirstLaunch(false);
          } else {
            setIsFirstLaunch(true);
          }
        })
        .catch(error => {
          console.error(GET_DATA_ERROR, error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    checkAppState();
  }, []);

  if (loading) {
    return <View style={styles.loadingContainer}></View>;
  }
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {!isFirstLaunch && (
        <AuthStack.Screen name="Boarding" component={Boarding} />
      )}
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default AuthNavigator;
