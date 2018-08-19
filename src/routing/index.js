import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    createStackNavigator,
    createBottomTabNavigator,
    NavigationActions
} from 'react-navigation';

import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {Platform, BackHandler} from 'react-native';

import AppLoading from '../components/app/AppLoading';

import Welcome from '../components/screens/Welcome';
import Login from '../components/screens/Login';
import CreateAccount from '../components/screens/CreateAccount';
import CreatePassword from '../components/screens/CreatePassword';
import Terms from '../components/templates/Terms';

import Explore from '../components/screens/Explore';
import Profile from '../components/screens/Profile'
import CreateWallet from '../components/screens/CreateWallet';
import SaveWallet from '../components/screens/SaveWallet';
import WalletKeywordValidation from '../components/screens/WalletKeywordValidation';
import CongratsWallet from '../components/screens/CongratsWallet'
import NavTabBar from '../components/organisms/NavTabBar';
import Inbox from '../components/screens/Message/Inbox';
import Chat from '../components/screens/Message/Chat';

import MyTrips from '../components/screens/MyTrips';
import UserMyTrips from '../components/screens/MyTrips/UserMyTrips';
import Favourites from '../components/screens/Favorites';

import Notifications from '../components/screens/Notifications';

import CreditCard from '../components/screens/CreditCard';
import CreditCardFilled from '../components/screens/CreditCard';

import PaymentMethods from '../components/screens/PaymentMethods';

import AddPaymentMethod from '../components/screens/AddPaymentMethod';

import Guests from '../components/screens/Guests';

import PropertyFacilites from '../components/screens/PropertyFacilites';
import PropertyRules from '../components/screens/PropertyRules';
import PropertyPrices from '../components/screens/PropertyPrices';

import ReviewHouse from '../components/screens/Booking/ReviewHouse';
import ReviewPay from '../components/screens/Booking/ReviewPay';
import ReviewSend from '../components/screens/Booking/ReviewSend';
import ReviewTrip from '../components/screens/Booking/ReviewTrip';
import RequestAccepted from '../components/screens/Booking/RequestAccepted';

import RoomDetailsReview from '../components/screens/RoomDetailsReview';
import GuestInfoForm from '../components/screens/GuestInfoForm';

import PropertyScreen from '../components/screens/Property';
import HotelDetails from '../components/screens/HotelDetails'
import Filters from '../components/screens/Filters';
import HotelFilters from '../components/screens/HotelFilters';
import AvailableRoomsView from '../components/molecules/AvailableRoomsView'
import UserProfile from '../components/screens/UserProfile';
import SimpleUserProfile from '../components/screens/SimpleUserProfile';
import EditUserProfile from '../components/screens/EditUserProfile';
import UpdateProfileInfo from '../components/screens/UpdateProfileInfo';
import CongratsCreditCard from '../components/screens/CongratsCreditCard';

import PropertyList from '../components/screens/PropertyList';
import SingleWishlist from '../components/screens/Favorites/SingleWishlist';
import Debug from '../components/screens/Debug';
import Calendar from '../components/screens/Calendar';

import PropertySock from '../components/screens/PropertySock';

export const MyTripNavigator = createStackNavigator(
    {
        WELCOME_TRIPS: { screen: MyTrips },
        UserMyTrips : { screen: UserMyTrips},
    },
    {
        initialRouteName: 'WELCOME_TRIPS',
        headerMode: 'none'
    }
);

const MainNavigator = createBottomTabNavigator(
    {
        PROFILE: { screen: Profile },
        MESSAGES: { screen: Inbox },
        MY_TRIPS: { screen: MyTripNavigator },
        FAVORITES: { screen: Favourites},
        EXPLORE: { screen: Explore }
    },
    {
        initialRouteName: 'EXPLORE',
        tabBarComponent: NavTabBar,
        tabBarPosition: 'bottom'
    }
);

const RootNavigator = createStackNavigator(
    {
        AppLoading,
        Welcome: { screen: Welcome },
        Login: { screen: Login },
        CreateAccount: { screen: CreateAccount },
        CreatePassword: { screen: CreatePassword },
        Terms: { screen: Terms },
        CreateWallet: { screen: CreateWallet },
        SaveWallet: { screen: SaveWallet },
        WalletKeywordValidation: {screen: WalletKeywordValidation},
        CongratsWallet: { screen: CongratsWallet },
        MainScreen: { screen: MainNavigator },
        GuestsScreen: { screen: Guests },
        CalendarScreen: {screen: Calendar},
        RoomDetailsReview: { screen: RoomDetailsReview},
        GuestInfoForm: { screen: GuestInfoForm},
        PropertyScreen: {screen: PropertyScreen},
        PropertyList : {screen: PropertyList},
        HotelDetails:{ screen: HotelDetails},
        PropertyFacilitesScreen: { screen: PropertyFacilites },
        PropertyRulesScreen: { screen: PropertyRules },
        PropertyPricesScreen: { screen: PropertyPrices },
        ReviewHouseScreen: { screen: ReviewHouse },
        ReviewPayScreen: { screen: ReviewPay },
        ReviewSendScreen: { screen: ReviewSend },//issue needs debugging by developer of this screen
        ReviewTripScreen: { screen: ReviewTrip },
        RequestAcceptedScreen: { screen: RequestAccepted },
        FilterScreen: { screen: Filters },
        HotelFilterScreen: { screen: HotelFilters },
        AvailableRoomsView: { screen: AvailableRoomsView},
        Notifications: { screen: Notifications},
        CreditCard :  { screen: CreditCard},
        CreditCardFilled : { screen: CreditCardFilled},
        CongratsCreditCard: {screen: CongratsCreditCard},
        PaymentMethods :{ screen:PaymentMethods},
        AddPaymentMethod :{screen:AddPaymentMethod},
        UserProfile: { screen: UserProfile },
        EditUserProfile: { screen: EditUserProfile },
        UpdateProfileInfo: { screen: UpdateProfileInfo },
        SimpleUserProfile: {screen: SimpleUserProfile},
        SingleWishlist: {screen: SingleWishlist},
        Debug : {screen: Debug},
        Chat: {screen: Chat},
        PropertySock: {screen: PropertySock},
    },
    {
        initialRouteName: 'AppLoading',
        headerMode: 'none'
    }
);

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

// create nav component
class ReduxNavigation extends PureComponent {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
  
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
  
    onBackPress = () => {
         const { dispatch, navigation } = this.props;
        if (navigation.index === 0) {
            return false;
        }
    
        dispatch(NavigationActions.back());
        return true;
    };
  
    render() {
        const { dispatch, navigation } = this.props;
        return <AppWithNavigationState dispatch={dispatch} state={navigation}/>;
    }
}

const mapNavStateProps = state => ({
    navigation: state.nav
});

const AppNavigator = connect(mapNavStateProps)(ReduxNavigation);
  
export { RootNavigator, AppNavigator, middleware };