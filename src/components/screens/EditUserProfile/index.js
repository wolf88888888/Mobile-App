import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, Text, TouchableOpacity, View, Modal } from 'react-native';
import Image from 'react-native-remote-svg';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import moment, { lang } from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import BackButton from '../../atoms/BackButton';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
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
import EditSchoolModal from '../../atoms/EditSchoolModal';
import EditWorkModal from '../../atoms/EditWorkModal';
import EditLanguageModal from '../../atoms/EditLanguageModal';
import UserPropertyItemTypeInfo from '../../atoms/UserPropertyItemTypeInfo'
import UserPropertyItemTypeAction from '../../atoms/UserPropertyItemTypeAction'
import Footer from '../../atoms/Footer';
import { getUserInfo, upperFirst, updateUserInfo, uploadPhoto } from '../../../utils/requester';
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
            avatarSource: null,
            birthday:'',
            month: '',
            day: '',
            year: '',
            city:{},
            country:{},
            email:'',
            firstName:'',
            lastName:'',
            about: '',
            gender:'',
            governmentId: '',
            countryId: 1,
            school: '',
            work: '',
            image:'',
            locAddress:'',
            phoneNumber:'',
            preferredCurrency:'',
            preferredLanguage:'',
            modalVisible: false,
            isDateTimePickerVisible: false,
            jsonFile: '',
            showProgress: false,
        }
        this.onPhoto = this.onPhoto.bind(this);
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
        this.onSaveSchool = this.onSaveSchool.bind(this);
        this.onSaveWork = this.onSaveWork.bind(this);
        this.onSaveLanguage = this.onSaveLanguage.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind(this);
        this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
        this.handleDatePicked = this.handleDatePicked.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
    }

    async componentDidMount() {
        let about = await AsyncStorage.getItem('aboutme');
        let governmentId = await AsyncStorage.getItem('governmentId');
        let school = await AsyncStorage.getItem('school');
        let work = await AsyncStorage.getItem('work');
        
        this.setState({
            about: about,
            governmentId: governmentId,
            school: school,
            work: work,
        })

        getUserInfo()
        .then(res => res.response.json())
        .then(parsedResp => {

            let day = '00';
            let month = '00';
            let year = '0000';

            if (parsedResp.birthday !== null) {
                let birthday = moment.utc(parsedResp.birthday);
                day = birthday.format('DD');
                month = birthday.format('MM');
                year = birthday.format('YYYY');
            }

            this.setState({
                city : parsedResp.city == null? '': parsedResp.city,
                countries: parsedResp.countries == null? []: parsedResp.countries,
                country : parsedResp.country == null? parsedResp.countries[0]: parsedResp.country,
                email : parsedResp.email == null? '': parsedResp.email,
                firstName : parsedResp.firstName == null? '': parsedResp.firstName,
                lastName : parsedResp.lastName == null? '': parsedResp.lastName,
                gender : parsedResp.gender == null? 'men': parsedResp.gender,
                image : parsedResp.image == null? '': parsedResp.image,
                locAddress : parsedResp.locAddress == null? '': parsedResp.locAddress,
                phoneNumber : parsedResp.phoneNumber == null? '': parsedResp.phoneNumber,
                preferredCurrency: parsedResp.preferredCurrency == null? parsedResp.currencies[0].id : parsedResp.preferredCurrency.id,
                preferredLanguage: parsedResp.preferredLanguage == null? 'English': parsedResp.preferredLanguage,
                jsonFile: parsedResp.jsonFile == null? '': parsedResp.jsonFile,
                day: day,
                month: month,
                year: year,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    showModal() {
        return this.state.modalView
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    onPhoto() {
        let options = {
            title: 'Select profile image',
            storageOptions: {
              skipBackup: true,
              path: '/'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    showProgress: true,
                })

                uploadPhoto(response.uri).then(res => {
                    if (res.ok){
                        console.log('upload result', res.data.thumbnail)
                        this.setState({
                            image: res.data.thumbnail
                        })
                    }
                    this.setState({
                        showProgress: false,
                    })
                })
            }
          });
    }

    onEditName() {
        this.setState({
            modalVisible: true,
            modalView: <EditNameModal 
                            onSave={(firstName, lastName) => this.onSaveName(firstName, lastName)} 
                            onCancel={() => this.onCancel()} 
                            firstName={this.state.firstName} 
                            lastName={this.state.lastName}
                            onRequestClose={() => {this.onCancel()}}
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
                            onRequestClose={() => {this.onCancel()}}
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
                            isFemale={this.state.gender=='women'? true: false}
                            onRequestClose={() => {this.onCancel()}}
                        />
        });
        this.showModal();
    }

    onBirthDate() {
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
                            onRequestClose={() => {this.onCancel()}}
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
                            onRequestClose={() => {this.onCancel()}}
                        />
        });
        this.showModal();
    }

    onLocation() {
        this.setState({
            modalVisible: true,
            modalView: <EditLocationModal
                            onSave={(country, city) => this.onSaveLocation(country, city)} 
                            onCancel={() => this.onCancel()} 
                            countries={this.state.countries}
                            country={this.state.country}
                            city={this.state.city}
                        />
        });
        this.showModal();
    }

    onSchool() {
        this.setState({
            modalVisible: true,
            modalView: <EditSchoolModal
                            onSave={(school) => this.onSaveSchool(school)} 
                            onCancel={() => this.onCancel()} 
                            school={this.state.school}
                            onRequestClose={() => {this.onCancel()}}
                        />
        });
        this.showModal();
    }

    onWork() {
        this.setState({
            modalVisible: true,
            modalView: <EditWorkModal
                            onSave={(work) => this.onSaveWork(work)} 
                            onCancel={() => this.onCancel()} 
                            work={this.state.work}
                            onRequestClose={() => {this.onCancel()}}
                        />
        });
        this.showModal();
    }

    onLanguage() {
        this.setState({
            modalVisible: true,
            modalView: <EditLanguageModal
                            onSave={(language) => this.onSaveLanguage(language)} 
                            onCancel={() => this.onCancel()} 
                            languageValue={this.state.preferredLanguage}
                            onRequestClose={() => {this.onCancel()}}
                        />
        });
        this.showModal();
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
            about: about,
        });
    }

    onSaveGender(isFemale) {
        this.setState({
            modalVisible: false,
        });
        gender = isFemale? 'women': 'men';
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

    onSaveLocation(country, city) {
        index = _.findIndex(this.state.countries, function(o){
            return o.id == country.id;
        })
        country.name = this.state.countries[index].name
        this.setState({
            modalVisible: false,
            country: country,
            city: city,
        })
    }

    onSaveSchool(school){
        this.setState({
            modalVisible: false,
            school: school,
        });
    }

    onSaveWork(work){
        this.setState({
            modalVisible: false,
            work: work,
        });
    }

    onSaveLanguage(language){
        this.setState({
            modalVisible: false,
            preferredLanguage: language,
        });
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
        date = moment(date);
        this.setState({
            month: date.format('MM'),
            day: date.format('DD'),
            year: date.format('YYYY'),
        })
        this.hideDateTimePicker();
    }

    updateProfile() {
        this.setState({
            showProgress: true
        });

        AsyncStorage.setItem('aboutme', this.state.about);
        AsyncStorage.setItem('governmentId', this.state.governmentId);
        AsyncStorage.setItem('school', this.state.school);
        AsyncStorage.setItem('work', this.state.work);


        let userInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            preferredLanguage: this.state.preferredLanguage,
            preferredCurrency: parseInt(this.state.preferredCurrency, 10),
            gender: this.state.gender,
            country: parseInt(this.state.country.id, 10),
            city: parseInt(this.state.city.id, 10),
            birthday: `${this.state.day}/${this.state.month}/${this.state.year}`,
            locAddress: this.state.locAddress,
            jsonFile: this.state.jsonFile
        };

        Object.keys(userInfo).forEach((key) => (userInfo[key] === null || userInfo[key] === '') && delete userInfo[key]);

        updateUserInfo(userInfo, null).then((res) => {
            if (res.success) {
                this.setState({
                    showProgress: false
                });
            }
            else {
                this.setState({
                    showProgress: false
                });
            }
        });

    }

    onBackPress = () => {
        this.props.navigation.goBack();
        this.props.navigation.state.params.updateGender(this.state.gender);
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
                        <BackButton style={styles.closeButton} onPress={() => this.onBackPress()}/>
                        <Text style={styles.title}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity style={styles.cameraContainer} onPress={this.onPhoto}>
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
                            info = { upperFirst(this.state.gender=='men'? 'Male': 'Female') }
                            onPress={this.onGender}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title = "Birth date"
                            info = { this.state.month + '/' + this.state.day + '/' + this.state.year }
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
                            info = {this.state.country.name + ', ' + this.state.city.name}
                            onPress={this.onLocation}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="School"
                            info = {this.state.school}
                            onPress={this.onSchool}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Work"
                            info = {this.state.work}
                            onPress={this.onWork}/>
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            style={{marginBottom:15}}
                            info = {this.state.preferredLanguage}
                            title="Languages"
                            onPress={this.onLanguage}/>
                    </View>
                </ScrollView>
                    <Footer style={styles.footer} button={'Save'} fullButton={true} onClick={this.updateProfile}/>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        fullScreen={false}
                        onRequestClose={() => {this.onCancel()}}>
                        {this.showModal()}
                    </Modal>
                    <DateTimePicker
                        datePickerModeAndroid={'default'}
                        date={this.state.year=='0000'? new Date(): moment(this.state.month + '/' + this.state.day + '/' + this.state.year, 'MM/DD/YYYY').toDate()}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                    
                    <ProgressDialog
                        visible={this.state.showProgress}
                        title=""
                        message="Saving Profile info..."
                        animationType="fade"
                        activityIndicatorSize="large"
                        activityIndicatorColor="black"/>
                
            </View>
        );
    }
}

export default EditUserProfile;
