import React, { Component } from 'react';
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
import AvailableRoomsView from '../components/molecules/AvailableRoomsView'
import UserProfile from '../components/screens/UserProfile';
import SimpleUserProfile from '../components/screens/SimpleUserProfile';
import EditUserProfile from '../components/screens/EditUserProfile';
import UpdateProfileInfo from '../components/screens/UpdateProfileInfo';

import PropertyList from '../components/screens/PropertyList';
import SingleWishlist from '../components/screens/Favorites/SingleWishlist';
import Debug from '../components/screens/Debug';
import Calendar from '../components/screens/Calendar';

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const MainNavigator = createBottomTabNavigator(
    {
        PROFILE: { screen: Profile },
        MESSAGES: { screen: Inbox },
        MY_TRIPS: { screen: MyTrips },
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
        UserMyTrips : { screen: UserMyTrips},
        ReviewHouseScreen: { screen: ReviewHouse },
        ReviewPayScreen: { screen: ReviewPay },
        ReviewSendScreen: { screen: ReviewSend },//issue needs debugging by developer of this screen
        ReviewTripScreen: { screen: ReviewTrip },
        RequestAcceptedScreen: { screen: RequestAccepted },
        FilterScreen: { screen: Filters },
        AvailableRoomsView: { screen: AvailableRoomsView},
        Notifications: { screen: Notifications},
        CreditCard :  { screen: CreditCard},
        CreditCardFilled : { screen: CreditCardFilled},
        PaymentMethods :{ screen:PaymentMethods},
        AddPaymentMethod :{screen:AddPaymentMethod},
        UserProfile: { screen: UserProfile },
        EditUserProfile: { screen: EditUserProfile },
        UpdateProfileInfo: { screen: UpdateProfileInfo },
        SimpleUserProfile: {screen: SimpleUserProfile},
        SingleWishlist: {screen: SingleWishlist},
        Debug : {screen: Debug},
        Chat: {screen: Chat}
    },
    {
        initialRouteName: 'AppLoading',
        headerMode: 'none'
    }
);

const mapStateToProps = state => ({
    state: state.nav,
});

// const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');
// const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

class ReduxNavigation extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };

    constructor (props) {
      super(props)
      console.log("ReduxNavigation", props);
    //   this.onBackPress = this.onBackPress.bind(this)
    }

    componentWillMount () {
        console.log("ReduxNavigation componentWillMount");
        Platform.OS !== 'ios' ? BackHandler.addEventListener('hardwareBackPress', this.onBackPress) : void 0 ;
    }

    componentWillUnmount () {
        console.log("ReduxNavigation componentWillUnmount");
        Platform.OS !== 'ios' ? BackHandler.removeEventListener('hardwareBackPress', this.onBackPress) : void 0 ;
    }
  
    onBackPress = () => {
        console.log("onBackPress ----------");
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }

        dispatch(NavigationActions.back());
        return true;
    };
  
    render() {
      /* more setup code here! this is not a runnable snippet */ 
      console.log("-------2", this.props.nav);
        return (
            <RootNavigator
                ref={nav => { this.navigator = nav; }}
            />
        );
    }
}
const AppNavigator = connect(mapStateToProps)(ReduxNavigation);

export { RootNavigator, AppNavigator, middleware };