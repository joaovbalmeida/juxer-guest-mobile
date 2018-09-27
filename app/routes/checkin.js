import { createStackNavigator } from 'react-navigation';

import CheckinScreen from '../screens/checkin';
import SettingsScreen from '../screens/settings';

const CheckinStack = createStackNavigator({
  Home: CheckinScreen,
  Settings: SettingsScreen,
}, {
  initialRouteName: 'Home',
});

export default CheckinStack;
