import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, NativeModules, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { setCurrency } from '../../redux/action/Currency'

import SplashScreen from 'react-native-smart-splash-screen';
import { domainPrefix } from '../../config';
import { bindActionCreators } from 'redux';

import { getCountries } from '../../redux/action/Country'
import { getCurrencyRates, getLocRate } from '../../redux/action/exchangeRates'
import { socketHost, ROOMS_XML_CURRENCY } from '../../config';

const androidStomp = NativeModules.StompModule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DA7B61'
    }
});

class AppLoading extends Component {

    constructor(props) {
        super(props);
        console.log("AppLoading - constructor")
        this.props.getCountries();
        this.props.getCurrencyRates();
        this.props.getLocRate(ROOMS_XML_CURRENCY);
        this.bootstrapAsync();
    }

    async componentDidMount() {
        console.log("AppLoading - componentDidMount")
    }

    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
        console.log("AppLoading - bootstrapAsync")
        let currency = await AsyncStorage.getItem('currency');

        if (currency != undefined && currency != null) {
            console.log("currency--------------", currency);
            this.props.setCurrency({currency});
            // this.props.navigation.dispatch(setCurrency({currency}));
        }

        console.log("currency", currency);

        const keys = await AsyncStorage.getAllKeys();
        const isLoggedIn = keys.includes(`${domainPrefix}.auth.locktrip`) &&
                        keys.includes(`${domainPrefix}.auth.username`);

        if (Platform.OS === 'ios') {
        } else if (Platform.OS === 'android') {
            androidStomp.connect(socketHost);
        }
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 0,
            delay: 0
        });

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: isLoggedIn ? 'MainScreen' : 'Welcome' })],
            // actions: [NavigationActions.navigate({ routeName: isLoggedIn ? 'HomeRequestConfirm' : 'Welcome' })],
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="light-content"
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getCountries: bindActionCreators(getCountries, dispatch),
    getCurrencyRates: bindActionCreators(getCurrencyRates, dispatch),
    getLocRate: bindActionCreators(getLocRate, dispatch),
    setCurrency: bindActionCreators(setCurrency, dispatch)
})

export default connect(undefined, mapDispatchToProps)(AppLoading);
// export default AppLoading;
