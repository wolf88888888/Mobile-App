import { AsyncStorage, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment, { lang } from 'moment';

import BackButton from '../../atoms/BackButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import EditAboutModal from '../../atoms/EditAboutModal';
import EditGenderModal from '../../atoms/EditGenderModal';
import EditGovernmentModal from '../../atoms/EditGovenmentModal';
import EditLanguageModal from '../../atoms/EditLanguageModal';
import EditLocationModal from '../../atoms/EditLocationModal';
import EditNameModal from '../../atoms/EditNameModal';
import EditPhoneModal from '../../atoms/EditPhoneModal';
import EditSchoolModal from '../../atoms/EditSchoolModal';
import EditWorkModal from '../../atoms/EditWorkModal';
import Footer from '../../atoms/Footer';
import Image from 'react-native-remote-svg';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import UserPropertyItemTypeInfo from '../../atoms/UserPropertyItemTypeInfo';
import  { userInstance } from '../../../utils/userInstance';
import requester from '../../../initDependencies';
import _ from 'lodash';
import styles from './styles';
import { apiHost, domainPrefix, imgHost, PUBLIC_URL } from '../../../config';

class EditUserProfile extends Component {

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
            avatarSource: null,
            birthday: '',
            month: '',
            day: '',
            year: '',
            city: {},
            country: {},
            email: '',
            firstName: '',
            lastName: '',
            about: '',
            gender: '',
            governmentId: '',
            countryId: 1,
            stateId: '',
            school: '',
            work: '',
            image: '',
            locAddress: '',
            phoneNumber: '',
            preferredCurrency: '',
            preferredLanguage: '',
            modalVisible: false,
            isDateTimePickerVisible: false,
            jsonFile: '',
            showProgress: false,
            countries: this.props.countries,
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
        let firstName = await userInstance.getFirstName();
        let lastName = await userInstance.getLastName();
        let email = await userInstance.getEmail();
        let phoneNumber = await userInstance.getPhoneNumber();
        let preferredLanguage = await userInstance.getLanguage();
        let preferredCurrency = await userInstance.getCurrency();
        let gender = await userInstance.getGender();
        let country = await userInstance.getCountry();
        let countryState = await userInstance.getCountryState();
        let city = await userInstance.getCity();
        let locAddress = await userInstance.getLocAddress();
        let jsonFile = await userInstance.getJsonFile();
        let profileImage = await userInstance.getProfileImage();
        let about = await userInstance.getAbout();
        let governmentId = await userInstance.getGovernmentId();
        let school = await userInstance.getSchool();
        let work = await userInstance.getWork();
        let day = '00';
        let month = '00';
        let year = '0000';
        let birth = await userInstance.getBirthday();
        if (birth !== null) {
            let birthday = moment.utc(parseInt(birth, 10));
            day = birthday.format('DD');
            month = birthday.format('MM');
            year = birthday.format('YYYY');
        }

        this.setState({
            about: about,
            governmentId: governmentId,
            school: school,
            work: work,
            city: city,
            country: country,
            countryState: countryState,
            email: email,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            image: profileImage,
            locAddress: locAddress,
            phoneNumber: phoneNumber,
            preferredCurrency: preferredCurrency == null ? 0 : preferredCurrency.id,
            preferredLanguage: preferredLanguage == null ? 'English' : preferredLanguage,
            jsonFile: jsonFile,
            day: day,
            month: month,
            year: year,
        });
        // requester.getCountries().then(res => {
        //     res.body.then(data => {
        //         this.setState({
        //             countries: data,
        //         })
        //     })
        // }).catch(err => {
        //     console.log('countries--error--', err);
        // });
    }

    
    componentDidUpdate(prevProps) {
        if (this.props.countries != prevProps.countries) {
            this.setState({
                countries: this.props.countries
            })
        }
    }

    upperFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    showModal() {
        return this.state.modalView
    }

    async onPhoto() {
        let options = {
            title: 'Select profile image',
            storageOptions: {
                skipBackup: true,
                path: '/'
            }
        };
        const token_value = await AsyncStorage.getItem(`${domainPrefix}.auth.locktrip`);
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
                });
                const { uri, originalRotation } = response
                let rotation = 0

                if ( originalRotation === 90 ) {
                    rotation = 90
                } else if ( originalRotation === 270 ) {
                    rotation = -90
                }

                ImageResizer.createResizedImage( uri, 500, 500, "JPEG", 80, rotation ).
                then( ( { uri } ) => {
                    var data = new FormData();
                    data.append('image', {
                        uri: uri,
                        name: 'selfie.jpg',
                        type: 'image/jpg'
                    });
                    fetch(`${apiHost}users/me/images/upload`, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data;',
                            'Authorization': token_value
                        },
                        body: data
                    }).then(res => { res.json().
                        then(data => {
                            this.setState({
                                showProgress: false,
                                image: data.thumbnail
                            });
                            userInstance.setProfileImage(data.thumbnail);
                        }).catch(err => {
                            console.log('upload error', err);
                        })
                    }).catch(err => {
                        this.setState({
                            showProgress: false,
                        })
                        console.log('upload error', err);
                    });
                } ).catch( err => {
                    this.setState({
                        showProgress: false,
                    })
                    console.log( err )
                } )

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
                onRequestClose={() => { this.onCancel() }}
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
                onRequestClose={() => { this.onCancel() }}
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
                isFemale={this.state.gender == 'women' ? true : false}
                onRequestClose={() => { this.onCancel() }}
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
                onRequestClose={() => { this.onCancel() }}
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
                onRequestClose={() => { this.onCancel() }}
            />
        });
        this.showModal();
    }

    onLocation() {
        this.setState({
            modalVisible: true,
            modalView: <EditLocationModal
                onSave={(country, countryState) => this.onSaveLocation(country, countryState)}
                onCancel={() => this.onCancel()}
                countries={this.state.countries}
                country={this.state.country}
                countryState={this.state.countryState}
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
                onRequestClose={() => { this.onCancel() }}
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
                onRequestClose={() => { this.onCancel() }}
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
                onRequestClose={() => { this.onCancel() }}
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
        gender = isFemale ? 'women' : 'men';
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

    onSaveGovernmentId(governmentId) {
        this.setState({
            modalVisible: false,
            governmentId: governmentId,
        });
    }

    onSaveLocation(country, countryState) {
        // index = _.findIndex(this.state.countries, function (o) {
        //     return o.id == country.id;
        // })
        // country.name = this.state.countries[index].name
        this.setState({
            modalVisible: false,
            country: country,
            countryState: countryState,
        })
    }

    onSaveSchool(school) {
        this.setState({
            modalVisible: false,
            school: school,
        });
    }

    onSaveWork(work) {
        this.setState({
            modalVisible: false,
            work: work,
        });
    }

    onSaveLanguage(language) {
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
        
        userInstance.setAbout(this.state.about==null? '' : this.state.about);
        userInstance.setGovernmentId(this.state.governmentId==null? '' : this.state.governmentId);
        userInstance.setSchool(this.state.school==null? '' : this.state.school);
        userInstance.setWork(this.state.work==null? '' : this.state.work);

        let userInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            preferredLanguage: this.state.preferredLanguage,
            preferredCurrency: parseInt(this.state.preferredCurrency, 10),
            gender: this.state.gender,
            country: parseInt(this.state.country.id, 10),
            countryState: this.state.countryState !== undefined && this.state.countryState !== null ? parseInt(this.state.countryState.id, 10) : '',
            // city: parseInt(this.state.city.id, 10),
            birthday: `${this.state.day}/${this.state.month}/${this.state.year}`,
            locAddress: this.state.locAddress,
            jsonFile: this.state.jsonFile
        };

        console.log("user info", userInfo);

        Object.keys(userInfo).forEach((key) => (userInfo[key] === null || userInfo[key] === '') && delete userInfo[key]);

        requester.updateUserInfo(userInfo, null).then(res => {
            console.log("------", res)
            if (res.success) {
                userInstance.setFirstName(userInfo.firstName);
                userInstance.setLastName(userInfo.lastName);
                userInstance.setPhoneNumber(userInfo.phoneNumber);
                userInstance.setLanguage(userInfo.preferredLanguage);
                userInstance.setGender(userInfo.gender);
                userInstance.setCountry(this.state.country);
                // userInstance.setCountry(this.state.countryState);
                // userInstance.setCity(this.state.city);
                userInstance.setCountryState(this.state.countryState);
                userInstance.setBirthday(new Date(`${this.state.year}/${this.state.month}/${this.state.day} 00:00:00`).getTime());
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
        let imageAvatar = '';
        if (this.state.image != '') {
            if (this.state.image.indexOf("images/default.png".toLowerCase()) != -1){ 
                imageAvatar = { uri: PUBLIC_URL + 'images/default.png' };
            }
            else {
                imageAvatar = { uri: imgHost + this.state.image }
            }
        }

        let location = '';
        console.log("location city", this.state.city, imageAvatar);
        if (this.state.city == undefined || this.state.city == null || this.state.city == '') {
            location = this.state.country==null? '' : this.state.country.name;
        }
        else {
            let city_name = this.state.city==null? '' : this.state.city.name;
            let country_name = this.state.country==null? '' : this.state.country.name;
            location = city_name + " " + country_name;
        }

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.titleConatiner}>
                        <BackButton style={styles.closeButton} onPress={() => this.onBackPress()} />
                        <Text style={styles.title}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity style={styles.cameraContainer} onPress={this.onPhoto}>
                        <Image style={styles.cameraButton} source={require('../../../assets/png/camera.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <View style={styles.body}>
                        <View style={styles.avatarWrapper}>
                            {
                                imageAvatar == '' ?
                                    <Image style={styles.avatar} source={require('../../../assets/temple/user_profile_avatar.png')} />
                                    :
                                    <Image style={styles.avatar} source={imageAvatar} />
                            }
                        </View>

                        <View style={[styles.lineStyle, { marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 15 }]} />
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>{this.state.firstName} {this.state.lastName}</Text>
                            <TouchableOpacity
                                onPress={this.onEditName}>
                                <Text style={styles.editButton}>Edit Name</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.lineStyle, { marginLeft: 0, marginRight: 0, marginTop: 15, marginBottom: 15 }]} />
                        <View style={styles.aboutContainer}>
                            <Text style={styles.aboutText}>About me</Text>
                            <Text style={styles.aboutText}>{this.state.about}</Text>
                            <TouchableOpacity
                                onPress={this.onAbout}>
                                <Text style={[styles.editButton, { marginTop: 20 }]}>Edit about me</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.lineStyle, { marginLeft: 0, marginRight: 0, marginTop: 15, marginBottom: 20 }]} />
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitleText}>Private Details</Text>
                        </View>

                        <UserPropertyItemTypeInfo
                            title="Gender"
                            info={this.upperFirst(this.state.gender == 'men' ? 'Male' : 'Female')}
                            onPress={this.onGender} />
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Birth date"
                            info={this.state.month + '/' + this.state.day + '/' + this.state.year}
                            onPress={this.onBirthDate} />
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Email Address"
                            info={this.state.email}
                            onPress={this.onEmail} />
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Phone"
                            info={this.state.phoneNumber}
                            onPress={this.onPhone} />
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Government ID"
                            info={this.state.governmentId}
                            onPress={this.onGovernmentID} />
                        <View style={[styles.lineStyle, { marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 15 }]} />

                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitleText}>Optional Details</Text>
                        </View>

                        <UserPropertyItemTypeInfo
                            title="Location"
                            info={location}
                            onPress={this.onLocation} />
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="School"
                            info={this.state.school}
                            onPress={this.onSchool} />
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            title="Work"
                            info={this.state.work}
                            onPress={this.onWork} />
                        <View style={styles.lineStyle} />

                        <UserPropertyItemTypeInfo
                            style={{ marginBottom: 15 }}
                            info={this.state.preferredLanguage}
                            title="Languages"
                            onPress={this.onLanguage} />
                    </View>
                </ScrollView>
                <Footer style={styles.footer} button={'Save'} fullButton={true} onClick={this.updateProfile} />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    fullScreen={false}
                    onRequestClose={() => { this.onCancel() }}>
                    {this.showModal()}
                </Modal>
                <DateTimePicker
                    datePickerModeAndroid={'default'}
                    date={this.state.year == '0000' ? new Date() : moment(this.state.month + '/' + this.state.day + '/' + this.state.year, 'MM/DD/YYYY').toDate()}
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
                    activityIndicatorColor="black" />

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        countries: state.country.countries
    };
}

export default connect(mapStateToProps, null)(EditUserProfile);