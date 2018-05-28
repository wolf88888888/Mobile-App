import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';

import AppLoading from '../components/app/AppLoading';

import Welcome from '../components/screens/Welcome';
import Login from '../components/screens/Login';
import CreateAccount from '../components/screens/CreateAccount';
import CreatePassword from '../components/screens/CreatePassword';
import Terms from '../components/templates/Terms';

import Explore from '../components/screens/Explore';
import NavTabBar from '../components/organisms/NavTabBar/container';
import Profile from '../components/screens/Profile';
import Inbox from '../components/screens/Message/Inbox';
import MyTrips from '../components/screens/MyTrips';
import Favourites from '../components/screens/Favorites';

import Guests from '../components/screens/Guests';

import Property from '../components/screens/Property';
import PropertyFacilites from '../components/screens/PropertyFacilites';
import PropertyRules from '../components/screens/PropertyRules';
import PropertyPrices from '../components/screens/PropertyPrices';

import ReviewHouse from '../components/screens/Booking/ReviewHouse';
import ReviewPay from '../components/screens/Booking/ReviewPay';
import ReviewSend from '../components/screens/Booking/ReviewSend';
import ReviewTrip from '../components/screens/Booking/ReviewTrip';
import RequestAccepted from '../components/screens/Booking/RequestAccepted';

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
        PROFILE: { screen: Profile },
        MESSAGES: { screen: Inbox },
        MY_TRIPS: { screen: MyTrips },
        FAVORITES: { screen: Favourites },
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
        PropertyRulesScreen: { screen: PropertyRules },
        PropertyPricesScreen: { screen: PropertyPrices },

        ReviewHouseScreen: { screen: ReviewHouse },
        ReviewPayScreen: { screen: ReviewPay },
        ReviewSendScreen: { screen: ReviewSend },
        ReviewTripScreen: { screen: ReviewTrip },
        RequestAcceptedScreen: { screen: RequestAccepted }

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
