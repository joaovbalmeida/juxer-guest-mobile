import { createSwitchNavigator } from 'react-navigation';

import EventStack from './event';
import HomeScreen from '../screens/home';

const AppStack = createSwitchNavigator({
  Home: HomeScreen,
  Event: EventStack,
}, {
  initialRouteName: 'Home',
});

export default AppStack;
