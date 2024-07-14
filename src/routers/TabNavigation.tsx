import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Favorites from '../screens/favorites/Favorites';
import Notification from '../screens/notification/Notification';
import Profile from '../screens/profile/Profile';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigation = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/icons/ic_home_active.png')
              : require('../assets/icons/ic_home_inactive.png');
          } else if (route.name === 'Favorites') {
            iconSource = focused
              ? require('../assets/icons/ic_save_active.png')
              : require('../assets/icons/ic_save_inactive.png');
          } else if (route.name === 'Notification') {
            iconSource = focused
              ? require('../assets/icons/ic_notification_active.png')
              : require('../assets/icons/ic_notification_inactive.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../assets/icons/ic_user_active.png')
              : require('../assets/icons/ic_user_inactive.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
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
