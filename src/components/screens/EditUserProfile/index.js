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
        this.onLanguage = this.onLanguage.bind(this);
        this.state = {
        }
    }

    componentDidMount() {
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
                            onPress={()=>{console.log("test test")}}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Birth date"
                            info ="15/02/1988"/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Email Address"
                            info ="veselina@gmail.com"/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Phone"
                            info ="+359 88 788 99 88"/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Government ID"
                            info ="Provide"/>
                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:0, marginBottom:15}]} />

                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitleText}>Optional Details</Text>
                        </View>

                        <UserPropertyItemTypeInfo
                            title="Location"
                            info ="Plovdiv, Bulgaria"/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeAction
                            title="School"
                            onPress={()=>{}}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeAction
                            title="Work"
                            onPress={()=>{}}/>
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
