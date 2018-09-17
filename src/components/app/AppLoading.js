import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NativeModules, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { setCurrency, setLocRate, setPreferCurrency, setPreferLocRate } from '../../redux/action/Currency'

import SplashScreen from 'react-native-smart-splash-screen';
import { domainPrefix } from '../../config';
import { bindActionCreators } from 'redux';

import * as countryActions from '../../redux/action/Country'
import { socketHost } from '../../config';

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
        this.props.actions.getCountries();
        this.bootstrapAsync();
    }

    async componentDidMount() {
        console.log("AppLoading - componentDidMount")
        
    }

    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
        let currency = await AsyncStorage.getItem('currency');
        let locRate = await AsyncStorage.getItem('locRate');
        locRate = JSON.parse(locRate)

        let preferCurrency = await AsyncStorage.getItem('preferCurrency');
        let preferLocRate = await AsyncStorage.getItem('preferLocRate');

        if (currency != undefined && currency != null) {
            console.log("currency--------------", currency);
            this.props.navigation.dispatch(setCurrency({currency}));
        }

        if (locRate != undefined && locRate != null) {
            this.props.navigation.dispatch(setLocRate({locRate}));
        }

        if (preferCurrency != undefined && preferCurrency != null) {
            console.log("preferCurrency--------------", preferCurrency);
            this.props.navigation.dispatch(setPreferCurrency({preferCurrency}));
        }

        if (preferLocRate != undefined && preferLocRate != null) {
            this.props.navigation.dispatch(setPreferLocRate({preferLocRate}));
        }

        console.log("currency", currency);
        console.log("locRate", locRate);
        console.log("preferCurrency", preferCurrency);
        console.log("preferLocRate", preferLocRate);

        const keys = await AsyncStorage.getAllKeys();
        const isLoggedIn = keys.includes(`${domainPrefix}.auth.locktrip`) &&
                        keys.includes(`${domainPrefix}.auth.username`);

        androidStomp.connect(socketHost);
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
    actions: bindActionCreators(countryActions, dispatch)
})


export default connect(undefined, mapDispatchToProps)(AppLoading);
// export default AppLoading;
