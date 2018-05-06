import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';

import AppLoading from '../components/app/AppLoading';

import Welcome from '../components/screens/Welcome';
import Login from '../components/screens/Login';
import CreateAccount from '../components/screens/CreateAccount';
import CreatePassword from '../components/screens/CreatePassword';
import Terms from '../components/screens/Terms';

import Explore from '../components/screens/Explore';
import NavTabBar from './tabs/NavTabBar';
import Guests from '../components/screens/Guests';

import Property from '../components/screens/Property';
import PropertyFacilites from '../components/screens/PropertyFacilites';
import AdditionalPrices from '../components/screens/AdditionalPrices';
import HouseRules from '../components/screens/HouseRules';


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

export const FullNavigator = StackNavigator(
    {
        MainScreen: { screen: MainNavigator },
        GuestsScreen: { screen: Guests },
        PropertyScreen: { screen: Property },
        PropertyFacilitesScreen: { screen: PropertyFacilites },
        AdditionalPricesScreen: { screen: AdditionalPrices },
        HouseRulesScreen: { screen: HouseRules }
    },
    {
        initialRouteName: 'MainScreen',
        headerMode: 'none'
    }
);

export const AppNavigator = SwitchNavigator(
    {
        AppLoading,
        Login: LoginNavigator,
        App: FullNavigator
    },
    {
        initialRouteName: 'AppLoading'
    }
);
