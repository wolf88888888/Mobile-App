import { StackNavigator } from 'react-navigation';

import Welcome from './components/login/Welcome';
import Login from './components/login/Login';

// export const RootNavigator = StackNavigator(
//   {
//     Home: { screen: HomeScreen }
//   },
//   {
//     headerMode: 'none'
//   }
// );

export const LoginNavigator = StackNavigator(
  {
    Welcome: { screen: Welcome },
    Login: { screen: Login }
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none',
  }
);
