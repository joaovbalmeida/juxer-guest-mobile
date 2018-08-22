import { createSwitchNavigator } from 'react-navigation';

import EventStack from './event';
import CheckinScreen from '../screens/checkin';

const AppStack = createSwitchNavigator({
  Checkin: CheckinScreen,
  Event: EventStack,
}, {
  initialRouteName: 'Checkin',
});

export default AppStack;
