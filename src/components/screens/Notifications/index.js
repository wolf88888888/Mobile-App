import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import GoBack from '../../atoms/GoBack';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import Switch from 'react-native-customisable-switch';
import { connect } from 'react-redux';

class Notifications extends Component {
    state = {
        recieveEmailMessage: false,
        recieveTextMessage: true,
        recievePushNotificationMessages: true,
        recieveEmail: true,
        recieveText: true,
        recievePushNotification: true,
        checkZIndex: 1, // zIndex of switchCheckView
    }
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        const {
            recieveEmailMessage, recieveTextMessage, recievePushNotificationMessages, recieveEmail, recieveText,
            recievePushNotification, checkZIndex
        } = this.state;
        return (
            <View style={styles.container}>

                <View style={styles.heading}>

                    <TouchableOpacity onPress={() => navigate('PROFILE')}>
                        <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-black.png')} />
                    </TouchableOpacity>


                    <View><Text style={styles.titleText}>Notifications</Text></View>

                </View>

                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>

                    <View>

                        <TouchableOpacity style={styles.navItem}>
                            <View>
                                <Text style={styles.navItemText}>Messages</Text>
                                <Text style={styles.navText}>Recieves messages from holtels and guests</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.navItem}>
                            <Text style={styles.navItemText}>Email</Text>

                            <View>
                                {recieveEmailMessage ?
                                    <View style={[styles.switchCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.switchCheckText}>
                                            <FontAwesome>{Icons.check}</FontAwesome>
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.switchUnCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.unSwitchCheckText}>
                                            <FontAwesome>{Icons.times}</FontAwesome>
                                        </Text>
                                    </View>
                                    }
                                <Switch
                                    value={recieveEmailMessage}
                                    onChangeValue={() => {
                                        this.setState({ recieveEmailMessage: !recieveEmailMessage, checkZIndex: 0 });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recieveEmailMessage ? "#e4a193" : "#cccccc"}
                                    switchBorderWidth={1}
                                    buttonWidth={30}
                                    buttonHeight={30}
                                    buttonBorderRadius={15}
                                    buttonBorderColor="#fff"
                                    buttonBorderWidth={0}
                                    animationTime={this.animationTime}
                                    padding={false}
                                />
                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.navItem}>
                            <Text style={styles.navItemText}>Text Message</Text>
                            <View>
                                {recieveTextMessage ?
                                    <View style={[styles.switchCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.switchCheckText}>
                                            <FontAwesome>{Icons.check}</FontAwesome>
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.switchUnCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.unSwitchCheckText}>
                                            <FontAwesome>{Icons.times}</FontAwesome>
                                        </Text>
                                    </View>
                                    }
                                <Switch
                                    value={recieveTextMessage}
                                    onChangeValue={() => {
                                        this.setState({ recieveTextMessage: !recieveTextMessage, checkZIndex: 0 });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recieveTextMessage ? "#e4a193" : "#cccccc"}
                                    switchBorderWidth={1}
                                    buttonWidth={30}
                                    buttonHeight={30}
                                    buttonBorderRadius={15}
                                    buttonBorderColor="#fff"
                                    buttonBorderWidth={0}
                                    animationTime={this.animationTime}
                                    padding={false}
                                />
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.navItem}>


                            <Text style={styles.navItemText}>Push Notifications{"\n"}{"\n"}<Text style={styles.navText}>To your mobile or tablet device </Text></Text>

                            <View>
                                {recievePushNotificationMessages ?
                                    <View style={[styles.switchCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.switchCheckText}>
                                            <FontAwesome>{Icons.check}</FontAwesome>
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.switchUnCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.unSwitchCheckText}>
                                            <FontAwesome>{Icons.times}</FontAwesome>
                                        </Text>
                                    </View>
                                    }
                                <Switch
                                    value={recievePushNotificationMessages}
                                    onChangeValue={() => {
                                        this.setState({ recievePushNotificationMessages: !recievePushNotificationMessages, checkZIndex: 0 });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recievePushNotificationMessages ? "#e4a193" : "#cccccc"}
                                    switchBorderWidth={1}
                                    buttonWidth={30}
                                    buttonHeight={30}
                                    buttonBorderRadius={15}
                                    buttonBorderColor="#fff"
                                    buttonBorderWidth={0}
                                    animationTime={this.animationTime}
                                    padding={false}
                                />
                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.navItem}>
                            <View>
                                <Text style={styles.navItemText}>Reminder & Suggestions</Text>
                                <Text style={styles.navText}>Recieve reminders,helpful tips to improve your trip and other messages related to your activites on LockChain.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <Text style={styles.navItemText}>Email</Text>
                            <View>
                                {recieveEmail ?
                                    <View style={[styles.switchCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.switchCheckText}>
                                            <FontAwesome>{Icons.check}</FontAwesome>
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.switchUnCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.unSwitchCheckText}>
                                            <FontAwesome>{Icons.times}</FontAwesome>
                                        </Text>
                                    </View>
                                    }
                                <Switch
                                    value={recieveEmail}
                                    onChangeValue={() => {
                                        this.setState({ recieveEmail: !recieveEmail, checkZIndex: 0 });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recieveEmail ? "#e4a193" : "#cccccc"}
                                    switchBorderWidth={1}
                                    buttonWidth={30}
                                    buttonHeight={30}
                                    buttonBorderRadius={15}
                                    buttonBorderColor="#fff"
                                    buttonBorderWidth={0}
                                    animationTime={this.animationTime}
                                    padding={false}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.navItem}>
                            <Text style={styles.navItemText}>Text Message</Text>
                            <View>
                                {recieveText ?
                                    <View style={[styles.switchCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.switchCheckText}>
                                            <FontAwesome>{Icons.check}</FontAwesome>
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.switchUnCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.unSwitchCheckText}>
                                            <FontAwesome>{Icons.times}</FontAwesome>
                                        </Text>
                                    </View>
                                    }
                                <Switch
                                    value={recieveText}
                                    onChangeValue={() => {
                                        this.setState({ recieveText: !recieveText, checkZIndex: 0 });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recieveText ? "#e4a193" : "#cccccc"}
                                    switchBorderWidth={1}
                                    buttonWidth={30}
                                    buttonHeight={30}
                                    buttonBorderRadius={15}
                                    buttonBorderColor="#fff"
                                    buttonBorderWidth={0}
                                    animationTime={this.animationTime}
                                    padding={false}
                                />
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.navItem}>


                            <Text style={styles.navItemText}>Push Notifications{"\n"}<Text style={styles.navText}> To your mobile or tablet device </Text></Text>

                            <View>
                                {recievePushNotification ?
                                    <View style={[styles.switchCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.switchCheckText}>
                                            <FontAwesome>{Icons.check}</FontAwesome>
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.switchUnCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.unSwitchCheckText}>
                                            <FontAwesome>{Icons.times}</FontAwesome>
                                        </Text>
                                    </View>
                                    }
                                <Switch
                                    value={recievePushNotification}
                                    onChangeValue={() => {
                                        this.setState({ recievePushNotification: !recievePushNotification, checkZIndex: 0 });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recievePushNotification ? "#e4a193" : "#cccccc"}
                                    switchBorderWidth={1}
                                    buttonWidth={30}
                                    buttonHeight={30}
                                    buttonBorderRadius={15}
                                    buttonBorderColor="#fff"
                                    buttonBorderWidth={0}
                                    animationTime={this.animationTime}
                                    padding={false}
                                />
                            </View>

                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

Notifications.propTypes = {
    // start react-navigation props
    navigation: PropTypes.object.isRequired
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f1f3'
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 20,
        marginLeft: 10,
        marginTop: 20
    },
    text: {
        color: '#000'
    },
    cardBox: {
        backgroundColor: '#da7b60',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 15
    },
    walletAddres: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 11.5,
        margin: 20,
        marginTop: 10,
        marginBottom: 30
    },
    logo: {
        width: 80,
        height: 55,
        borderRadius: 10,
        marginLeft: 10
    },
    logoBackground: {
        position: 'absolute',
        bottom: -5,
        left: -35,
        opacity: 0.1,
        width: '60%',
        height: '60%'
    },

    titleText: {
        color: '#000',
        fontSize: 22,
        fontFamily: 'FuturaStd-Light',
        marginLeft: 20
    },

    titleView: {
        display: 'flex',
        width: '100%',
        marginTop: 26
    },
    btn_backImage: {
        height: 28,
        width: 28,
    },

    balanceLabel: {
        fontSize: 10,
        color: '#fff',
        marginLeft: 20,
        fontFamily: 'FuturaStd-Light'
    },
    balanceText: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 20,
        fontFamily: 'FuturaStd-Light'
    },
    addMore: {
        position: 'absolute',
        bottom: 15,
        right: 20,
        width: 43,
        height: 43,
        borderRadius: 50,
        backgroundColor: '#213742',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addMorePlus: {
        color: '#fff',
        fontSize: 16
    },
    copyBox: {
        backgroundColor: '#fff',
        marginLeft: 40,
        marginRight: 40,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    copyText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        color: '#000'
    },
    navItem: {
        borderBottomWidth: 0.5,
        borderColor: '#e2e4e3',
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    navIcon: {
        width: 20,
        height: 23
    },
    navItemText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 21,
        color: '#000'
    },
    navText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
    },
    navCurrency: {
        color: '#da7b60',
        fontFamily: 'FuturaStd-Light',
        fontSize: 18
    },
    switchCheckView: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    switchUnCheckView: {
        position: 'absolute',
        top: 10,
        right: 10,
        justifyContent: 'flex-end'
    },
    switchCheckText: {
        color: '#FFF',
        fontSize: 10.5
    },
    unSwitchCheckText: {
        color: '#cccccc',
        fontSize: 10.5
    },
});
