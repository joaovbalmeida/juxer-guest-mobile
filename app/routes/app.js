import { createSwitchNavigator } from 'react-navigation';

import CheckinStack from './checkin';
import EventTab from './event';

const AppStack = createSwitchNavigator({
  Checkin: CheckinStack,
  Event: EventTab,
}, {
  initialRouteName: 'Checkin',
});

export default AppStack;
