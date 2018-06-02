import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { register, login } from '../../../utils/requester';
import { domainPrefix } from '../../../config';

// Will disable eslint on this file due to required refactoring
/* eslint-disable */
const Terms = (props) => {
    const { navigate, pop } = props.navigation;
    const { params } = props.navigation.state;

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                translucent
                barStyle="dark-content"
            />

            <Text style={styles.title}>Before continuing</Text>
            <Text style={styles.paragraph}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</Text>
            <Text style={styles.paragraph}>I agree many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>

            <View style={styles.buttonsView}>
                <TouchableOpacity onPress={() => navigate('CreateWallet', { ...params })}>
                    <View style={styles.acceptButtonView}>
                        <Text style={styles.acceptButtonText}>Accept</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => pop(3)}>
                    <View style={styles.declineButtonView}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

Terms.propTypes = {
    // start react-navigation props
    navigation: PropTypes.object.isRequired
};

export default Terms;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
        padding: 15
    },
    title: {
        color: '#000',
        fontFamily: 'FuturaStd-Light',
        fontSize: 22,
        marginTop: 90
    },
    paragraph: {
        color: '#444',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17,
        lineHeight: 20,
        marginTop: 25
    },
    buttonsView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 40
    },
    acceptButtonView: {
        display: 'flex',
        flexDirection: 'row',
        width: 158,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#DA7B61'
    },
    declineButtonView: {
        display: 'flex',
        flexDirection: 'row',
        width: 158,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 25,
        borderColor: '#DA7B61',
        borderWidth: 1.5,
        backgroundColor: '#f0f1f3'
    },
    acceptButtonText: {
        color: '#fcf9f8',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17
    },
    declineButtonText: {
        color: '#DA7B61',
        fontFamily: 'FuturaStd-Light',
        fontSize: 17
    }
});
