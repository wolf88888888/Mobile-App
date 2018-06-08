import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import BackButton from '../../atoms/BackButton';
import UserProfileSummary from '../../organisms/UserProfileSummary'
import ProfileHistoryItem from '../../atoms/ProfileHistoryItem';
import UserProfileReviews from '../../organisms/UserProfileReviews'
import UserProfileHomes from '../../organisms/UserProfileHomes'
import UserPropertyItemTypeInfo from '../../atoms/UserPropertyItemTypeInfo'
import UserPropertyItemTypeAction from '../../atoms/UserPropertyItemTypeAction'
import Footer from '../../atoms/Footer';
import styles from './styles';

class EditUserProfile extends Component {

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

        this.onGender = this.onGender.bind(this);
        this.onBirthDate = this.onBirthDate.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.onPhone = this.onPhone.bind(this);
        this.onGovernmentID = this.onGovernmentID.bind(this);
        this.onLocation = this.onLocation.bind(this);
        this.onSchool = this.onSchool.bind(this);
        this.onWork = this.onWork.bind(this);
        this.onLanguage = this.onLanguage.bind(this);
        this.state = {
        }
    }

    componentDidMount() {
    }

    onGender() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"Gender" },
        );
    }

    onBirthDate() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"Birth Date" },
        );
    }

    onEmail() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"Email" },
        );
    }

    onPhone() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"Phone" },
        );
    }

    onGovernmentID() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"Government ID" },
        );
    }

    onLocation() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"Location" },
        );
    }

    onSchool() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"School" },
        );
    }

    onWork() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"Work" },
        );
    }

    onLanguage() {
        this.props.navigation.navigate(
            'UpdateProfileInfo',
            { title:"Language" },
        );
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        // const { locAddress } = this.props.userInfo;
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.titleConatiner}>
                        <BackButton style={styles.closeButton} onPress={() => goBack()}/>
                        <Text style={styles.title}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity style={styles.cameraContainer} >
                        <Image style={styles.cameraButton} source={require('../../../assets/svg/camera.svg')}/>
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={{width: '100%'}}>
                    <View style={styles.body}>
                        <Image style={styles.avatar} source={require('../../../assets/temple/user_profile_avatar.png')} />
                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:0, marginBottom:15}]} />
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>Vaselina Poryazova</Text>
                            <TouchableOpacity>
                                <Text style={styles.editButton}>Edit Name</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:15, marginBottom:15}]} />
                        <View style={styles.aboutContainer}>
                            <Text style={styles.aboutText}>About me</Text>
                            <TouchableOpacity>
                                <Text style={[styles.editButton, {marginTop:20}]}>Edit about me</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:15, marginBottom:20}]} />
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitleText}>Private Details</Text>
                        </View>

                        <UserPropertyItemTypeAction
                            title="Gender"
                            onPress={this.onGender}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Birth date"
                            info ="15/02/1988"
                            onPress={this.onBirthDate}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Email Address"
                            info ="veselina@gmail.com"
                            onPress={this.onEmail}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Phone"
                            info ="+359 88 788 99 88"
                            onPress={this.onPhone}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Government ID"
                            info ="Provide"
                            onPress={this.onGovernmentID}/>
                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:0, marginBottom:15}]} />

                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitleText}>Optional Details</Text>
                        </View>

                        <UserPropertyItemTypeInfo
                            title="Location"
                            info ="Plovdiv, Bulgaria"
                            onPress={this.onLocation}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeAction
                            title="School"
                            onPress={this.onSchool}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeAction
                            title="Work"
                            onPress={this.onWork}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeAction
                            style={{marginBottom:15}}
                            title="Languages"
                            onPress={this.onLanguage}/>
                    </View>
                </ScrollView>
                    <Footer style={styles.footer} button={'Save'} fullButton={true} onClick={()=>{}}/>
            </View>
        );
    }
}

export default EditUserProfile;
