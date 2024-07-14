import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Favorites from '../screens/favorites/Favorites';
import Notification from '../screens/notification/Notification';
import Profile from '../screens/profile/Profile';

const Tab = createBottomTabNavigator();

const TabNavigation = (): React.JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
