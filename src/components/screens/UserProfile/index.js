import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import Image from 'react-native-remote-svg';
import ProfileHistoryItem from '../../atoms/ProfileHistoryItem';
import PropTypes from 'prop-types';
import UserProfileHomes from '../../organisms/UserProfileHomes'
import UserProfileReviews from '../../organisms/UserProfileReviews'
import UserProfileSummary from '../../organisms/UserProfileSummary'
import WhiteBackButton from '../../atoms/WhiteBackButton';
import { connect } from 'react-redux';
import styles from './styles';

class UserProfile extends Component {

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
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        // const { locAddress } = this.props.userInfo;
        return (
            <View style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false} style={{width: '100%'}}>
                    <WhiteBackButton style={styles.closeButton} onPress={() => goBack()}/>
                    <View style={styles.body}>
                        <UserProfileSummary
                            logo = {require('../../../assets/temple/profile.png')}
                            username = {'Garden Loft Apartment'}
                            place = {"Plovdiv, Bulgaria"}
                            member_date={'March 2012'}
                            reviews = {124}
                            references = {5}
                            isVerified = {true}
                            description = {"Hi there. Welcome to my home. I enjoy meeting people from all over the world and I enjoy showing others why I love living in Central London.  the museums and art galleries are just a walk or ride away from me and Camden Lock is 8 minutes walk from my home. I know an awful lot about London as I have been lucky enough to film in most places over 15 years as a Location Manager."}
                        />

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:5, marginBottom:15}]} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title = {"School"}
                            detail = {"University of Wales Swansea"}/>

                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title = {"Work"}
                            detail = {"Event Planning, Hospitality and Estate Management"}/>

                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title = {"Spoken Languages"}
                            detail = {"English, Deutsch"}/>

                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title = {"Verified Info"}
                            detail = {"Goverment ID, Phone Number, Email Address"}/>

                        <View style={styles.lineStyle} />
                        <UserProfileReviews
                            reviews = {124}
                            avatar={require('../../../assets/temple/avatar.png')}
                            name={"Jesse"}
                            date={"October 2017"}
                            clientRate={4.2}
                            clientDescription={"The apartment was in a good location and we were able to park our car a 5 minute walk away for a fair price! The apartment was clean and had everything.The apartment was in a good location and we were ableto park our car a 5 minute walk away for a fair price!The apartment was clean and had everything.The apartment was in a good location and we were ableto park our car a 5 minute walk away for a fair price!"}/>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />
                        <UserProfileHomes/>

                        <TouchableOpacity>
                            <Text style={styles.report}>Report this User</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default UserProfile;
