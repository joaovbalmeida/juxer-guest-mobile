import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default AuthStack;
