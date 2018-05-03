import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { register, login } from '../../../utils/requester';
import { domainPrefix } from '../../../config';


// TODO: Fix nested promise chains
// TODO: Component styling to be kept as a separate file

// Will disable eslint on this file due to required refactoring
/* eslint-disable */
const Terms = (props) => {
    const { navigate, pop } = props.navigation;
    const { params } = props.navigation.state;

    const onClickAccept = async () => {
        const user = { ...params };

        // TODO: Need a way to generate a Google ReCAPTCHA token

        register(user, null).then((res) => {
            if (res.success) {
                console.log('~~~res:', res);
                login(user, null).then((res) => {
                    if (res.success) {
                        res.response.json().then((data) => {
                            AsyncStorage.setItem(`${domainPrefix}.auth.lockchain`, data.Authorization);
                            // TODO: Get first name + last name from response included with Authorization token (Backend)
                            AsyncStorage.setItem(`${domainPrefix}.auth.username`, user.email);
                            navigate('App');
                        });
                    } else {
                        res.response.then((res) => {
                            const errors = res.errors;
                            for (const key in errors) {
                                if (typeof errors[key] !== 'function') {
                                    console.log('Error logging in:', errors[key].message);
                                    // TODO: give user feedback about having and error logging in
                                }
                            }
                        });
                    }
                });
            } else {
                res.response.then((res) => {
                    const errors = res.errors;
                    for (const key in errors) {
                        if (typeof errors[key] !== 'function') {
                            console.log('Error registering new user:', errors[key].message);
                            // TODO: give user feedback about having and error registering
                        }
                    }
                });
            }
        });
    };

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
                <TouchableOpacity onPress={() => onClickAccept()}>
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
