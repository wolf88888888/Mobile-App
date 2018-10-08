import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import BackButton from '../../atoms/BackButton';
import Image from 'react-native-remote-svg';
import ProfileHistoryItem from '../../atoms/ProfileHistoryItem';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import { imgHost, PUBLIC_URL } from '../../../config.js';
import moment from 'moment'
import { userInstance } from '../../../utils/userInstance';
import styles from './styles';

class SimpleUserProfile extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => { }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            birthdayDisplay: '',
            city: {},
            country: {},
            email: '',
            firstName: '',
            lastName: '',
            gender: '',
            image: '',
            locAddress: '',
            phoneNumber: '',
            preferredCurrency: {},
            preferredLanguage: '',
            day: '',
            month: '',
            year: '',
            showProgress: false,
            loadMessage: 'loading...',
        }
    }

     async componentDidMount() {
        let email = await userInstance.getEmail();
        let firstName = await userInstance.getFirstName();
        let lastName = await userInstance.getLastName();
        let phoneNumber = await userInstance.getPhoneNumber();
        let preferredLanguage = await userInstance.getLanguage();
        let preferredCurrency = await userInstance.getCurrency();
        let gender = await userInstance.getGender();
        let country = await userInstance.getCountry();
        let city = await userInstance.getCity();
        let locAddress = await userInstance.getLocAddress();
        let profileImage = await userInstance.getProfileImage();
        let day = '01';
        let month = '01';
        let year = '1970';
        let birth = await userInstance.getBirthday();
        if (birth !== null) {
            let birthday = moment.utc(parseInt(birth, 10));
            day = birthday.format('DD');
            month = birthday.format('MM');
            year = birthday.format('YYYY');
        }
        this.setState({
            birthdayDisplay: month + '/' + day + '/' + year,
            city: city,
            country: country,
            email: email,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            image: profileImage==null ? '' : profileImage,
            locAddress: locAddress,
            phoneNumber: phoneNumber,
            preferredCurrency: preferredCurrency,
            preferredLanguage: preferredLanguage,
        });

    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        let gender = '';
        if (this.state.gender === 'men') {
            gender = 'M';
        }else if (this.state.gender === 'women') {
            gender = 'F';
        }else{
            gender = '?';
        }

        let image = '';
        if (this.state.image != '') {
            if (this.state.image.indexOf("images/default.png".toLowerCase()) != -1){ 
                image = { uri: PUBLIC_URL + 'images/default.png' };
            }
            else {
                image = { uri: imgHost + this.state.image }
            }
        }
        console.log("simple profile image", image);

        return (
            <View style={styles.container}>
                <View style={styles.navContainer}>
                    <View style={styles.titleConatiner}>
                        <BackButton style={styles.closeButton} onPress={() => goBack()} />
                        <Text style={styles.title}>Profile</Text>
                    </View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <View style={styles.body}>
                        <View style={styles.topContainer}>
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatarView}>
                                    {
                                        this.state.image == '' ?
                                            <Image style={styles.avatar} source={require('../../../assets/temple/user_profile_avatar.png')} />
                                            :
                                            <Image style={styles.avatar} source={image} />
                                    }
                                </View>
                                <Text style={styles.gender}>{gender}</Text>
                            </View>
                            <Text style={styles.name}>{this.state.firstName} {this.state.lastName}</Text>
                            {
                                this.state.city == '' ?
                                    <Text style={styles.location}>{this.state.country==null? '' : this.state.country.name}</Text>
                                    :
                                    <Text style={styles.location}>{this.state.city==null? '' : this.state.city.name} {this.state.country==null? '' : this.state.country.name}</Text>
                            }
                        </View>

                        <View style={[styles.lineStyle, { marginLeft: 0, marginRight: 0 }]} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Birthdate"}
                            detail={this.state.birthdayDisplay} />

                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Email"}
                            detail={this.state.email} />

                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Phone number"}
                            detail={this.state.phoneNumber} />

                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"ETH/LOC address"}
                            detail={this.state.locAddress} />


                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Preferred language"}
                            detail={this.state.preferredLanguage} />

                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Preferred currency"}
                            detail={this.state.preferredCurrency.code} />
                    </View>
                </ScrollView>
                <ProgressDialog
                    visible={this.state.showProgress}
                    title=""
                    message={this.state.loadMessage}
                    animationType="fade"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black" />
            </View>
        );
    }
}

export default SimpleUserProfile;
