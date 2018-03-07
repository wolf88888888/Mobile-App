import { StackNavigator } from 'react-navigation';

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
    Login: { screen: Login }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      header: {
        style: {
          shadowOpacity: 0,
          elevation: 0
        }
      }
    }
  }
);
