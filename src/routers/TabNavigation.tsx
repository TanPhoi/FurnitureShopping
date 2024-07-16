import {Favorites, Home, Notification, Profile} from '@/screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, ImageSourcePropType} from 'react-native';
import {ic_home, ic_save, ic_notification, ic_user} from '@/assets/icons/index';

const Tab = createBottomTabNavigator();

const icons: Record<string, ImageSourcePropType> = {
  Home: ic_home,
  Favorites: ic_save,
  Notification: ic_notification,
  Profile: ic_user,
};

const TabNavigation = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const iconSource = icons[route.name];

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? 'black' : undefined,
              }}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigation;