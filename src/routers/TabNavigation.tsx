import {Favorites, Home, Notification, Profile} from '@/screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigation = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../assets/icons/ic_home.png');
          } else if (route.name === 'Favorites') {
            iconSource = require('../assets/icons/ic_save.png');
          } else if (route.name === 'Notification') {
            iconSource = require('../assets/icons/ic_notification.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/icons/ic_user.png');
          }

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
