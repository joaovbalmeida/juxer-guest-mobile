import { createStackNavigator } from 'react-navigation';

import QueueScreen from '../screens/queue';
import SettingsScreen from '../screens/settings';

const EventStack = createStackNavigator({
  Queue: QueueScreen,
  screen: SettingsScreen,
}, {
  initialRouteName: 'Queue',
});

export default EventStack;
