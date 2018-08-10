import React, { Component } from 'react';
import { AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import PropTypes from 'prop-types';
import SplashScreen from 'react-native-smart-splash-screen';
import { domainPrefix } from '../../config';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DA7B61'
    }
});

class AppLoading extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

    constructor(props) {
        super(props);
        this.bootstrapAsync();
    }

    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 150,
            delay: 100
        });
    }

    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
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

export default AppLoading;
