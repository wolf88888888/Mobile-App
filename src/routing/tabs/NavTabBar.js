import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLocRate } from '../../redux/common/actions';
import { getLocRateInUserSelectedCurrency, getCurrencyRates } from '../../utils/requester';

// TODO: Separate component from container in the new containers dir
// components dir should contain only stateless components
// connected should be kept in containers dir.
// Will disable eslint on this file due to required refactoring
/* eslint-disable */
class NavTabBar extends Component {
    componentDidMount() {
        const { currency } = this.props.paymentInfo;
        console.log("begin");
        console.log(this.props.paymentInfo);

        getLocRateInUserSelectedCurrency(currency).then((data) => {
            this.props.dispatch(setLocRate(data[0][`price_${currency.toLowerCase()}`]));
        });

        getCurrencyRates().then((data) => {
            AsyncStorage.setItem('currencyRates', JSON.stringify(data));
        });
    }

    render() {
        const { navigate, state } = this.props.navigation;
        const { index, routes } = state;
        const active = routes[index].key;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => navigate('PROFILE')}>
                    <View style={styles.tab}>
                        <Text style={active === 'PROFILE' ? styles.activeIconStyle : styles.inactiveIconStyle}>
                            <FontAwesome>{Icons.userO}</FontAwesome>
                        </Text>
                        <Text style={active === 'PROFILE' ? styles.activeTextStyle : styles.inactiveTextStyle}>
              PROFILE
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigate('MESSAGES')}>
                    <View style={styles.tab}>
                        <Text style={active === 'MESSAGES' ? styles.activeIconStyle : styles.inactiveIconStyle}>
                            <FontAwesome>{Icons.commentingO}</FontAwesome>
                        </Text>
                        <Text style={active === 'MESSAGES' ? styles.activeTextStyle : styles.inactiveTextStyle}>
              MESSAGES
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigate('MY_TRIPS')}>
                    <View style={styles.tab}>
                        <Text style={active === 'MY_TRIPS' ? styles.activeIconStyle : styles.inactiveIconStyle}>
                            <FontAwesome>{Icons.suitcase}</FontAwesome>
                        </Text>
                        <Text style={active === 'MY_TRIPS' ? styles.activeTextStyle : styles.inactiveTextStyle}>
              MY TRIPS
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigate('FAVORITES')}>
                    <View style={styles.tab}>
                        <Text style={active === 'FAVORITES' ? styles.activeIconStyle : styles.inactiveIconStyle}>
                            <FontAwesome>{Icons.heartO}</FontAwesome>
                        </Text>
                        <Text style={active === 'FAVORITES' ? styles.activeTextStyle : styles.inactiveTextStyle}>
            FAVORITES
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigate('EXPLORE')}>
                    <View style={styles.tab}>
                        <Text style={active === 'EXPLORE' ? styles.activeIconStyle : styles.inactiveIconStyle}>
                            <FontAwesome>{Icons.search}</FontAwesome>
                        </Text>
                        <Text style={active === 'EXPLORE' ? styles.activeTextStyle : styles.inactiveTextStyle}>
              EXPLORE
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

NavTabBar.propTypes = {
    // start react-navigation props
    navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    //const { paymentInfo } = state;
    return {
        paymentInfo: state
    };
}

export default connect(mapStateToProps)(NavTabBar);


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 55,
        width: '100%',
        backgroundColor: '#fff'
    },
    tab: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    activeIconStyle: {
        fontSize: 25,
        color: '#DA7B61'
    },
    inactiveIconStyle: {
        fontSize: 25,
        color: '#646467'
    },

    activeTextStyle: {
        fontSize: 8.5,
        fontFamily: 'FuturaStd-Light',
        color: '#DA7B61',
        marginTop: 6
    },
    inactiveTextStyle: {
        fontSize: 8.5,
        fontFamily: 'FuturaStd-Light',
        color: '#646467',
        marginTop: 6
    }

});
