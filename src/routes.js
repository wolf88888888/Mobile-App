import { StackNavigator } from 'react-navigation';

import Welcome from './components/login/Welcome';

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
    Welcome: { screen: Welcome }
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none',
  }
);
