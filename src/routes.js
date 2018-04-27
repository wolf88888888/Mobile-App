import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';

import AppLoading from './components/app/AppLoading';

import Welcome from './components/login/Welcome';
import Login from './components/login/Login';
import CreateAccount from './components/login/CreateAccount';
import CreatePassword from './components/login/CreatePassword';
import Terms from './components/login/Terms';

import Explore from './components/explore/Explore';
import NavTabBar from './components/tabs/NavTabBar';

export const LoginNavigator = StackNavigator(
    {
        Welcome: { screen: Welcome },
        Login: { screen: Login },
        CreateAccount: { screen: CreateAccount },
        CreatePassword: { screen: CreatePassword },
        Terms: { screen: Terms }
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none'
    }
);

export const MainNavigator = TabNavigator(
    {
        PROFILE: { screen: Explore },
        MESSAGES: { screen: Explore },
        MY_TRIPS: { screen: Explore },
        FAVORITES: { screen: Explore },
        EXPLORE: { screen: Explore }
    },
    {
        initialRouteName: 'EXPLORE',
        tabBarComponent: NavTabBar,
        tabBarPosition: 'bottom'
    }
);

export const AppNavigator = SwitchNavigator(
    {
        AppLoading,
        Login: LoginNavigator,
        App: MainNavigator
    },
    {
        initialRouteName: 'AppLoading'
    }
);
