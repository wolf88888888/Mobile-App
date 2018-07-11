import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, Text, TouchableOpacity, View, Modal } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import BackButton from '../../atoms/BackButton';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import { getUserInfo, updateUserInfo } from '../../../utils/requester';
import { Wallet } from '../../../services/blockchain/wallet';
import styles from './styles';
import { domainPrefix } from '../../../config';
import EditCurrencyModal from '../../atoms/EditCurrencyModal';
import Toast from 'react-native-easy-toast'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            walletAddress: '',
            locBalance:0,
            ethBalance:'0.0',
            preferredCurrency: '',
            currentCurrency:'EUR',
            currencies: [],
            currencyLocPrice:0,
            modalVisible:false,
            showProgress:true,
            loadMessage:'Loading...'
        }
        this.showModal = this.showModal.bind(this);
        this.onCurrency = this.onCurrency.bind(this);
        this.onSaveCurrency = this.onSaveCurrency.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.updateGender = this.updateGender.bind(this);
        this.showProgressView = this.showProgressView.bind(this);
        this.hideProgressView = this.hideProgressView.bind(this);
        this.showToast = this.showToast.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem('currentCurrency', (err, result) => {
            if (result) {
                console.log("currentCurrencycurrentCurrency " + result);
                this.setState({ currentCurrency: result});
            }
            if (err) console.error(`Error currencyLocPrice: ${err}`);
        });

        AsyncStorage.getItem('currencyLocPrice', (err, result) => {
            console.log("currencyLocPricecurrencyLocPrice " + result);
            if (result) {
                this.setState({ currencyLocPrice: result});
            }
            if (err) console.error(`Error currencyLocPrice: ${err}`);
        });

        getUserInfo()
        .then(res => res.response.json())
        .then(parsedResp => {
            this.setState({
                showProgress: false,
                info: parsedResp,
                currencies: parsedResp.currencies,
                walletAddress : parsedResp.locAddress == null? '': parsedResp.locAddress,
                preferredCurrency: parsedResp.preferredCurrency == null? parsedResp.currencies[0] : parsedResp.preferredCurrency,
            });
            console.log('userINFO-------', parsedResp);
            console.log(parsedResp.locAddress);
            if (parsedResp.locAddress != null && parsedResp.locAddress != '') {
                console.log("start ");
                Wallet.getBalance(parsedResp.locAddress).then(x => {
                    const ethBalance = x / (Math.pow(10, 18));
                    this.setState({ethBalance: ethBalance});
                });
                Wallet.getTokenBalance(parsedResp.locAddress).then(y => {
                    const locBalance = y / (Math.pow(10, 18));
                    this.setState({locBalance: locBalance});
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidCatch(errorString, errorInfo) {
        console.log("componentDidCatch");
    }

    onCurrency() {
        this.setState({
            modalVisible: true,
            modalView: <EditCurrencyModal
                            onSave={(currency) => this.onSaveCurrency(currency)} 
                            onCancel={() => this.onCancel()}
                            currencies={this.state.currencies}
                            currency={this.state.preferredCurrency}
                        />
        });
        this.showModal();
    }

    onSaveCurrency(currency) {
        index = _.findIndex(this.state.currencies, function(o){
            return o.id == currency.id;
        })
        currency.code = this.state.currencies[index<0? 1: index].code
        AsyncStorage.setItem('currentCurrency', currency.code);
        this.setState({
            loadMessage:'Updating user data...',
            modalVisible: false,
            preferredCurrency: currency,
            currentCurrency: currency.code,
        })

        let day = '00';
        let month = '00';
        let year = '0000';

        if (this.state.info.birthday !== null) {
            let birthday = moment.utc(this.state.info.birthday);
            day = birthday.format('DD');
            month = birthday.format('MM');
            year = birthday.format('YYYY');
        }
        
        let userInfo = {
            firstName: this.state.info.firstName,
            lastName: this.state.info.lastName,
            phoneNumber: this.state.info.phoneNumber,
            preferredLanguage: this.state.info.preferredLanguage,
            preferredCurrency: parseInt(currency.id, 10),
            gender: this.state.info.gender,
            country: parseInt(this.state.info.country.id, 10),
            city: parseInt(this.state.info.city.id, 10),
            birthday: `${day}/${month}/${year}`,
            locAddress: this.state.info.locAddress,
            jsonFile: this.state.info.jsonFile
        };

        Object.keys(userInfo).forEach((key) => (userInfo[key] === null || userInfo[key] === '') && delete userInfo[key]);
        this.showProgressView();
        updateUserInfo(userInfo, null).then((res) => {
            if (res.success) {
                this.hideProgressView();
                console.log('success updating userdata')
            }
            else {
                this.hideProgressView();
                console.log('failed updating userdata')
            }
        });
    }

    showModal() {
        return this.state.modalView
    }

    onCancel() {
        this.setState({
            modalVisible: false,
        });
    }

    showProgressView() {
        this.setState({
            showProgress: true,
        });
    }

    hideProgressView() {
        this.setState({
            showProgress: false,
        });
    }

    updateGender(gender) {
        this.setState({
            info: {
                ...this.state.info,
                gender: gender,
            }
        })
    }

    showToast() {
        this.refs.toast.show('This feature is not enabled yet in the current alpha version.', 1500);
    }

    render() {
        const { navigate } = this.props.navigation;
        const {currentCurrency, currencyLocPrice, locBalance, walletAddress, preferredCurrency, ethBalance} = this.state;

        console.log("currency: " + currentCurrency);
        console.log("locPrice: " + currencyLocPrice);
        let price = locBalance * currencyLocPrice;
        var displayPrice = '';
        if (currentCurrency == "EUR") {
            displayPrice = '€';
        }
        else if (currentCurrency == "USD") {
            displayPrice = '$';
        }
        else if (currentCurrency == "GBP") {
            displayPrice = '£';
        }
        displayPrice += price.toFixed(2);

        return (
            <View style={styles.container}>
                <View style={styles.titleConatiner}>
                    <BackButton style={styles.closeButton} onPress={() => navigate('EXPLORE')}/>
                </View>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'#DA7B61'}}
                    position='bottom'
                    positionValue={100}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={1.0}
                    textStyle={{color:'white', fontFamily: 'FuturaStd-Light'}}
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    fullScreen={false}
                    onRequestClose={() => {this.onCancel()}}>
                    {this.showModal()}
                </Modal>
                <ProgressDialog
                        visible={this.state.showProgress}
                        title=""
                        message={this.state.loadMessage}
                        animationType="fade"
                        activityIndicatorSize="large"
                        activityIndicatorColor="black"/>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <View style={styles.cardBox}>
                        <Image
                            source={require('../../../assets/splash.png')}
                            style={styles.logo} />
                        <View style={{width: '100%'}}>
                            <Text style={styles.walletAddres}>{walletAddress}</Text>
                        </View>
                        <Text style={styles.balanceLabel}>Current Balance</Text>
                        <View style={{width: '100%'}}>
                            <Text style={styles.balanceText}>{locBalance.toFixed(6)} LOC / {displayPrice}</Text>
                        </View>
                        <Text style={styles.balanceLabel}>ETH Balance</Text>
                        <View style={{width: '100%'}}>
                            <Text style={styles.balanceText}>{parseFloat(ethBalance).toFixed(6)}</Text>
                        </View>
                        <Image
                            source={require('../../../assets/splash.png')}
                            style={styles.logoBackground} />
                            <TouchableOpacity onPress={this.showToast} style={styles.addMore}>
                                <FontAwesome style={styles.addMorePlus}>{Icons.plus}</FontAwesome>
                            </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { Clipboard.setString(this.state.walletAddress) }}>
                        <View style={styles.copyBox}>
                            <Text style={styles.copyText}>Copy your wallet address to clipboard</Text>
                        </View>
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity onPress={() => navigate('SimpleUserProfile')} style={styles.navItem}>
                            <Text style={styles.navItemText}>View Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('EditUserProfile', { updateGender: this.updateGender })} style={styles.navItem}>
                            <Text style={styles.navItemText}>Edit Profile</Text>
                            <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-user.png')} style={styles.navIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showToast} style={styles.navItem}>
                            <Text style={styles.navItemText}>Notifications</Text>
                            <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-bell.png')} style={styles.navIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showToast} style={styles.navItem}>
                            <Text style={styles.navItemText}>Payment Methods</Text>
                            <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-payment.png')} style={styles.navIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onCurrency} style={styles.navItem}>
                            <Text style={styles.navItemText}>Currency</Text>
                            <Text style={styles.navCurrency}>{preferredCurrency.code}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showToast} style={styles.navItem}>
                            <Text style={styles.navItemText}>Switch to Hosting</Text>
                            <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-switch.png')} style={styles.navIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
                            this.props.navigation.navigate('Login');
                        }} style={styles.navItem}>
                            <Text style={styles.navItemText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

Profile.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default Profile;
