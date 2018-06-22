import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Image from 'react-native-remote-svg';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import BackButton from '../../atoms/BackButton';
import UserProfileSummary from '../../organisms/UserProfileSummary'
import ProfileHistoryItem from '../../atoms/ProfileHistoryItem';
import UserProfileReviews from '../../organisms/UserProfileReviews'
import UserProfileHomes from '../../organisms/UserProfileHomes'
import EditNameModal from '../../atoms/EditNameModal';
import EditGenderModal from '../../atoms/EditGenderModal';
import EditAboutModal from '../../atoms/EditAboutModal';
import EditPhoneModal from '../../atoms/EditPhoneModal';
import EditGovernmentModal from '../../atoms/EditGovenmentModal';
import EditLocationModal from '../../atoms/EditLocationModal';
import UserPropertyItemTypeInfo from '../../atoms/UserPropertyItemTypeInfo'
import UserPropertyItemTypeAction from '../../atoms/UserPropertyItemTypeAction'
import Footer from '../../atoms/Footer';
import { getUserInfo } from '../../../utils/requester';
import { imgHost } from '../../../config.js'
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
        this.state = {
            birthday:'',
            city:{},
            country:{},
            email:'',
            firstName:'',
            lastName:'',
            about: '',
            gender:'Male',
            governmentId: '',
            countryId: null,
            image:'',
            locAddress:'',
            phoneNumber:'',
            preferredCurrency:{},
            preferredLanguage:'',
            modalVisible: false,
            isDateTimePickerVisible: false,
        }
        this.onEditName = this.onEditName.bind(this);
        this.onAbout = this.onAbout.bind(this);
        this.onGender = this.onGender.bind(this);
        this.onBirthDate = this.onBirthDate.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.onPhone = this.onPhone.bind(this);
        this.onGovernmentID = this.onGovernmentID.bind(this);
        this.onLocation = this.onLocation.bind(this);
        this.onSchool = this.onSchool.bind(this);
        this.onWork = this.onWork.bind(this);
        this.onLanguage = this.onLanguage.bind(this);
        this.onSaveName = this.onSaveName.bind(this);
        this.onSaveAbout = this.onSaveAbout.bind(this);
        this.onSaveGender = this.onSaveGender.bind(this);
        this.onSavePhone = this.onSavePhone.bind(this);
        this.onSaveGovernmentId = this.onSaveGovernmentId.bind(this);
        this.onSaveLocation = this.onSaveLocation.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind(this);
        this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
        this.handleDatePicked = this.handleDatePicked.bind(this);
    }

    componentDidMount() {
        getUserInfo()
        .then(res => res.response.json())
        .then(parsedResp => {
            this.setState({
                birthday : parsedResp.birthday == null? '': parsedResp.birthday,
                city : parsedResp.city == null? '': parsedResp.city,
                countries: parsedResp.countries == null? []: parsedResp.countries,
                country : parsedResp.country == null? parsedResp.countries[0]: parsedResp.country,
                email : parsedResp.email == null? '': parsedResp.email,
                firstName : parsedResp.firstName == null? '': parsedResp.firstName,
                lastName : parsedResp.lastName == null? '': parsedResp.lastName,
                gender : parsedResp.gender == null? 'Male': parsedResp.gender,
                image : parsedResp.image == null? '': parsedResp.image,
                locAddress : parsedResp.locAddress == null? '': parsedResp.locAddress,
                phoneNumber : parsedResp.phoneNumber == null? '': parsedResp.phoneNumber,
                preferredCurrency: parsedResp.preferredCurrency == null? parsedResp.currencies[0] : parsedResp.preferredCurrency,
                preferredLanguage: parsedResp.preferredLanguage == null? 'English': parsedResp.preferredLanguage,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    showModal() {
        return this.state.modalView
    }

    onEditName() {
        this.setState({
            modalVisible: true,
            modalView: <EditNameModal 
                            onSave={(firstName, lastName) => this.onSaveName(firstName, lastName)} 
                            onCancel={() => this.onCancel()} 
                            firstName={this.state.firstName} 
                            lastName={this.state.lastName}
                        />
        });
        this.showModal();
    }

    onAbout() {
        this.setState({
            modalVisible: true,
            modalView: <EditAboutModal
                            onSave={(about) => this.onSaveAbout(about)} 
                            onCancel={() => this.onCancel()} 
                            about={this.state.about}
                        />
        });
        this.showModal();
    }
    
    onGender() {
        this.setState({
            modalVisible: true,
            modalView: <EditGenderModal 
                            onSave={(isFemale) => this.onSaveGender(isFemale)} 
                            onCancel={() => this.onCancel()} 
                            isFemale={this.state.gender=='Female'? true: false}
                        />
        });
        this.showModal();
    }

    onBirthDate() {
        console.log('datepicker');
        this.showDateTimePicker();
    }

    onEmail() {
        
    }

    onPhone() {
        this.setState({
            modalVisible: true,
            modalView: <EditPhoneModal 
                            onSave={(pickerData) => this.onSavePhone(pickerData)} 
                            onCancel={() => this.onCancel()} 
                            phone={this.state.phoneNumber}
                        />
        });
        this.showModal();
    }

    onGovernmentID() {
        this.setState({
            modalVisible: true,
            modalView: <EditGovernmentModal
                            onSave={(governmentId) => this.onSaveGovernmentId(governmentId)} 
                            onCancel={() => this.onCancel()} 
                            governmentId={this.state.governmentId}
                        />
        });
        this.showModal();
    }

    onLocation() {
        console.log('onLocation....', this.state.countries);
        this.setState({
            modalVisible: true,
            modalView: <EditLocationModal
                            onSave={(countryId) => this.onSaveLocation(countryId)} 
                            onCancel={() => this.onCancel()} 
                            countries={this.state.countries}
                            countryId={0}
                        />
        });
        this.showModal();
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

    onSaveName(firstName, lastName) {
        this.setState({
            modalVisible: false,
        });
        this.setState({
            firstName: firstName,
            lastName: lastName
        });
    }

    onSaveAbout(about) {
        this.setState({
            modalVisible: false,
        });
        this.setState({
            about: about,
        });
    }

    onSaveGender(isFemale) {
        this.setState({
            modalVisible: false,
        });
        gender = isFemale? 'Female': 'Male';
        this.setState({
            gender: gender,
        });
    }

    onSavePhone(phone) {
        this.setState({
            modalVisible: false,
        });
        this.setState({
            phoneNumber: phone,
        });
    }

    onSaveGovernmentId(governmentId){
        this.setState({
            modalVisible: false,
            governmentId: governmentId,
        });
    }

    onSaveLocation(countryId) {
        index = _.findIndex(this.state.countries, function(o){
            return o.id == countryId;
        })
        this.setState({
            modalVisible: false,
            countryId: countryId,
            location: this.state.countries[index].name,
        })
    }

    onCancel() {
        this.setState({
            modalVisible: false,
        });
    }

    showDateTimePicker() {
        this.setState({ isDateTimePickerVisible: true });
    }

    hideDateTimePicker() {
        this.setState({ isDateTimePickerVisible: false });
    }

    handleDatePicked(date) {
        formatted = moment(date).format('D MMMM YYYY');
        console.log('A date has been picked: ', date);
        this.setState({ birthday: formatted});
        this.hideDateTimePicker();
    }

    render() {
        const { navigate, goBack } = this.props.navigation;

        let imageAvatar = '';
        if (this.state.image != '') {
            if (this.state.image == 'https://staging.locktrip.com/images/default.png' || this.state.image == 'images/default.png') {
                imageAvatar = {uri:'https://staging.locktrip.com/images/default.png'};
            }
            else {
                imageAvatar ={uri:imgHost+this.state.image}
            }
        }
        
        let location = '';
        if (this.state.city == '') {
            location = this.state.country.name;
        }
        else {
            location = this.state.city.name + " " + this.state.country.name;
        }

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.titleConatiner}>
                        <BackButton style={styles.closeButton} onPress={() => goBack()}/>
                        <Text style={styles.title}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity style={styles.cameraContainer} >
                        <Image style={styles.cameraButton} source={require('../../../assets/png/camera.png')}/>
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={{width: '100%'}}>
                    <View style={styles.body}>
                        <View>
                    {
                        imageAvatar == '' ?
                            <Image style={styles.avatar} source={require('../../../assets/temple/user_profile_avatar.png')} />
                        :
                            <Image style={styles.avatar} source={imageAvatar} />
                    }   
                        </View>

                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:0, marginBottom:15}]} />
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>{this.state.firstName} {this.state.lastName}</Text>
                            <TouchableOpacity
                                onPress={this.onEditName}>
                                <Text style={styles.editButton}>Edit Name</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:15, marginBottom:15}]} />
                        <View style={styles.aboutContainer}>
                            <Text style={styles.aboutText}>About me</Text>
                            <Text style={styles.aboutText}>{this.state.about}</Text>
                            <TouchableOpacity
                                onPress={this.onAbout}>
                                <Text style={[styles.editButton, {marginTop:20}]}>Edit about me</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:15, marginBottom:20}]} />
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitleText}>Private Details</Text>
                        </View>

                        <UserPropertyItemTypeInfo
                            title = "Gender"
                            info = {this.state.gender}
                            onPress={this.onGender}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title = "Birth date"
                            info = {this.state.birthday}
                            onPress={this.onBirthDate}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title = "Email Address"
                            info = {this.state.email}
                            onPress={this.onEmail}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title = "Phone"
                            info = {this.state.phoneNumber}
                            onPress={this.onPhone}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title = "Government ID"
                            info = {this.state.governmentId}
                            onPress={this.onGovernmentID}/>
                        <View style={[styles.lineStyle, {marginLeft:0, marginRight:0, marginTop:0, marginBottom:15}]} />

                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitleText}>Optional Details</Text>
                        </View>

                        <UserPropertyItemTypeInfo
                            title = "Location"
                            info = {this.state.location}
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
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        fullScreen={false}
                        onRequestClose={() => {}}>
                        {this.showModal()}
                    </Modal>
                    <DateTimePicker
                        datePickerModeAndroid={'default'}
                        date={this.state.birthday==''? new Date(): moment(this.state.birthday).toDate()}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
            </View>
        );
    }
}

export default EditUserProfile;
