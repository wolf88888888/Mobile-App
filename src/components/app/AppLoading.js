import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { setCurrency, setLocRate } from '../../redux/action/Currency'

import SplashScreen from 'react-native-smart-splash-screen';
import { domainPrefix } from '../../config';
import { bindActionCreators } from 'redux';

import * as countryActions from '../../redux/action/Country'

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
        
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 150,
            delay: 100
        });
    }

    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
        let currency = await AsyncStorage.getItem('currency');
        // this.props.navigation.dispatch(setCurrency(currency));
        let locRate = await AsyncStorage.getItem('locRate');

        if (currency != undefined && currency != null) {
            console.log("currency--------------", currency);
            this.props.navigation.dispatch(setCurrency({currency}));
        }
        if (locRate != undefined && locRate != null) {
            this.props.navigation.dispatch(setLocRate({locRate}));
        }
        console.log("currency", currency);
        console.log("locRate", locRate);

        const keys = await AsyncStorage.getAllKeys();
        const isLoggedIn = keys.includes(`${domainPrefix}.auth.locktrip`) &&
                        keys.includes(`${domainPrefix}.auth.username`);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: isLoggedIn ? 'MainScreen' : 'Welcome' })],
        });
        this.props.navigation.dispatch(resetAction);
        // this.props.navigation.navigate(isLoggedIn ? 'MainScreen' : 'Welcome');
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
