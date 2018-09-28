import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import Switch from 'react-native-customisable-switch';
import styles from './styles';
import { userInstance } from '../../../utils/userInstance';

class Notifications extends Component {
    state = {
        recieveEmailMessage: false,
        recieveTextMessage: true,
        recievePushNotificationMessages: true,
        recieveEmail: true,
        recieveText: true,
        recievePushNotification: true,
        checkZIndex: 1 // zIndex of switchCheckView
    }

    async componentDidMount(){
        let messageEmail = await userInstance.getMessageEmailNotification();
        let messageText = await userInstance.getMessageTextNotification();
        let messagePush = await userInstance.getMessagePushNotification();

        let reminderEmail = await userInstance.getReminderEmailNotification();
        let reminderText = await userInstance.getReminderTextNotification();
        let reminderPush = await userInstance.getReminderPushNotification();
        
        this.setState({
            recieveEmailMessage: messageEmail,
            recieveTextMessage: messageText,
            recievePushNotificationMessages: messagePush,
            recieveEmail: reminderEmail,
            recieveText: reminderText,
            recievePushNotification: reminderPush,
        });
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

                        <View style={styles.navItem}>
                            <View>
                                <Text style={styles.navItemText}>Messages</Text>
                                <Text style={styles.navText}>Recieves messages from holtels and guests</Text>
                            </View>
                        </View>


                        <View style={styles.navItem}>
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
                                {/* if you want to solve cross appearing above switch you need to set checkZIndex to 0 */}
                                <Switch
                                    value={recieveEmailMessage}
                                    onChangeValue={() => {
                                        userInstance.setMessageEmailNotification(!recieveEmailMessage)
                                        this.setState({ recieveEmailMessage: !recieveEmailMessage });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recieveEmailMessage ? '#e4a193' : '#cccccc'}
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

                        </View>


                        <View style={styles.navItem}>
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
                                        userInstance.setMessageTextNotification(!recieveTextMessage)
                                        this.setState({ recieveTextMessage: !recieveTextMessage });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recieveTextMessage ? '#e4a193' : '#cccccc'}
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
                        </View>


                        <View style={styles.navItem}>


                            <Text style={styles.navItemText}>Push Notifications{'\n'}{'\n'}<Text style={styles.navText}>To your mobile or tablet device </Text></Text>

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
                                        userInstance.setMessagePushNotification(!recievePushNotificationMessages)
                                        this.setState({ recievePushNotificationMessages: !recievePushNotificationMessages });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recievePushNotificationMessages ? '#e4a193' : '#cccccc'}
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

                        </View>


                        <View style={styles.navItem}>
                            <View>
                                <Text style={styles.navItemText}>Reminder & Suggestions</Text>
                                <Text style={styles.navText}>
                                    Recieve reminders, helpful tips to improve your trip and other messages
                                    related to your activites on LockChain.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.navItem}>
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
                                        userInstance.setReminderEmailNotification(!recieveEmail)
                                        this.setState({ recieveEmail: !recieveEmail });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recieveEmail ? '#e4a193' : '#cccccc'}
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
                        </View>

                        <View style={styles.navItem}>
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
                                        userInstance.setReminderTextNotification(!recieveText)
                                        this.setState({ recieveText: !recieveText });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recieveText ? '#e4a193' : '#cccccc'}
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
                        </View>


                        <View style={styles.navItem}>


                            <Text style={styles.navItemText}>Push Notifications{'\n'}{'\n'}<Text style={styles.navText}>To your mobile or tablet device </Text></Text>

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
                                        userInstance.setReminderPushNotification(!recievePushNotification)
                                        this.setState({ recievePushNotification: !recievePushNotification });
                                        setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                    }}
                                    activeTextColor="#FFF"
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#f0f1f3"
                                    switchWidth={62}
                                    switchBorderColor={recievePushNotification ? '#e4a193' : '#cccccc'}
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

                        </View>

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
