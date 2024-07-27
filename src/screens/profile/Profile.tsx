import {ic_exit, ic_search, ic_user_one} from '@/assets/icons';
import LabelWithImage from '@/components/profiles/LabelWithImage';
import {User} from '@/model/user.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {getDataLocalStorage} from '@/utils';
import removeDataLocalStorage from '@/utils/removeDataLocalStorage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type ProfileProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};
const Profile = ({navigation}: ProfileProps): JSX.Element => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getData = (): void => {
      getDataLocalStorage<User>('user')
        .then(user => {
          if (user) {
            setUser(user);
          }
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
        });
    };
    getData();
  }, []);

  const handleOnMyReviews = (): void => {
    navigation.navigate('MyReviews');
  };

  //TODO: implement later
  const handleShipAddress = (): void => {};

  //TODO: implement later
  const handleMyOrder = (): void => {};

  //TODO: implement later
  const handlePaymentMethod = (): void => {};

  //TODO: implement later
  const handleSetting = (): void => {};

  const handleLogoutUser = (): void => {
    removeDataLocalStorage('loggedInUser')
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthNavigator'}],
        });
      })
      .catch(error => {
        console.error('Failed to remove user from AsyncStorage:', error);
      });
  };

  const labelWithImageData = [
    {
      label: 'My orders',
      content: 'Already have 10 orders',
      onPress: handleMyOrder,
    },
    {
      label: 'Shipping Addresses',
      content: 'Already have 10 orders',
      onPress: handleShipAddress,
    },
    {
      label: 'Payment Method',
      content: 'You have 2 cards',
      onPress: handlePaymentMethod,
    },
    {
      label: 'My reviews',
      content: 'Reviews for 5 items',
      onPress: handleOnMyReviews,
    },
    {
      label: 'Setting',
      content: 'Notification, Password, FAQ, Contact',
      onPress: handleSetting,
    },
  ];

  return (
    <View>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity>
          <Image style={styles.icon} source={ic_search} />
        </TouchableOpacity>
        <Text style={styles.txtNotification}>Profile</Text>
        <TouchableOpacity onPress={handleLogoutUser}>
          <Image style={styles.icon} source={ic_exit} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.imgUser} source={ic_user_one} />
          <View style={styles.boxInformation}>
            <Text style={styles.txtName}>{user?.name}</Text>
            <Text style={styles.txtEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.boxContainer}>
          {labelWithImageData.map((item, index) => (
            <LabelWithImage
              key={index}
              label={item.label}
              content={item.content}
              onPress={item.onPress}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },

  tabBarContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    columnGap: 24,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  txtNotification: {
    flex: 1,
    textAlign: 'center',
    color: colors.black_font,
    fontFamily: 'Merriweather',
    fontSize: 16,
    fontWeight: '700',
  },

  profileContainer: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  imgUser: {
    width: 80,
    height: 80,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  boxInformation: {
    rowGap: 5,
    flex: 1,
  },
  txtName: {
    color: colors.black_font,
    fontFamily: 'NunitoSans',
    fontSize: 20,
    fontWeight: '700',
  },
  txtEmail: {
    color: colors.grey,
    fontFamily: 'NunitoSans',
    lineHeight: 15,
  },

  boxContainer: {
    marginTop: spacing.xxl,
  },
});

export default Profile;
