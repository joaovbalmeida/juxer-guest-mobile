import { createStackNavigator } from 'react-navigation';

import QueueScreen from '../screens/queue';

const EventsStack = createStackNavigator({
  Queue: QueueScreen,
}, {
  initialRouteName: 'Queue',
});

export default EventsStack;
