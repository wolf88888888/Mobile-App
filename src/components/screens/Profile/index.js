import { AsyncStorage, Clipboard, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import BackButton from '../../atoms/BackButton';
import EditCurrencyModal from '../../atoms/EditCurrencyModal';
import Image from 'react-native-remote-svg';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast'
import { Wallet } from '../../../services/blockchain/wallet';
import _ from 'lodash';
import { connect } from 'react-redux';
import { domainPrefix } from '../../../config';
import moment from 'moment';
import requester from '../../../initDependencies';
import { userInstance } from '../../../utils/userInstance';
import styles from './styles';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            walletAddress: '',
            locBalance: 0,
            ethBalance: '0.0',
            preferredCurrency: { code: "EUR", id: 3 },
            currentCurrency: { code: "EUR", id: 3 },
            currencies: [
                {code: "USD", id: 1},
                {code: "GBP", id: 2},
                {code: "EUR", id: 3},
            ],
            currencyLocPrice: 0,
            modalVisible: false,
            showProgress: false,
            loadMessage: 'Loading...'
        }
        this.showModal = this.showModal.bind(this);
        this.onCurrency = this.onCurrency.bind(this);
        this.onSaveCurrency = this.onSaveCurrency.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.updateGender = this.updateGender.bind(this);
        this.showProgressView = this.showProgressView.bind(this);
        this.hideProgressView = this.hideProgressView.bind(this);
        this.showToast = this.showToast.bind(this);
        this.getCurrencyRate = this.getCurrencyRate.bind(this);
    }

     async componentDidMount() {
        let currentCurrency = await userInstance.getCurrency() || this.state.currentCurrency;
        let currencyLocPrice = await AsyncStorage.getItem('currencyLocPrice') || this.state.currencyLocPrice;
        let walletAddress = await userInstance.getLocAddress();
        let preferredCurrency = await userInstance.getCurrency() || this.state.preferredCurrency;
        console.log('current----currency', currentCurrency);
        this.setState({
            currentCurrency: currentCurrency,
            currencyLocPrice: currencyLocPrice,
            walletAddres: walletAddress,
            preferredCurrency: preferredCurrency,
        });
        if (walletAddress != '') {
            Wallet.getBalance(walletAddress).then(x => {
                const ethBalance = x / (Math.pow(10, 18));
                this.setState({ ethBalance: ethBalance });
            });
            Wallet.getTokenBalance(walletAddress).then(y => {
                const locBalance = y / (Math.pow(10, 18));
                this.setState({ locBalance: locBalance });
            });
        }
        this.showProgressView();
        this.getCurrencyRate(currentCurrency);
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

    async onSaveCurrency(currency) {
        index = _.findIndex(this.state.currencies, function (o) {
            return o.id == currency.id;
        })
        currency.code = this.state.currencies[index < 0 ? 1 : index].code
        AsyncStorage.setItem('currentCurrency', currency);
        this.setState({
            loadMessage: 'Updating user data...',
            modalVisible: false,
            preferredCurrency: currency,
            currentCurrency: currency,
        })
        let firstName = await userInstance.getFirstName();
        let lastName = await userInstance.getLastName();
        let phoneNumber = await userInstance.getPhoneNumber();
        let preferredLanguage = await userInstance.getLanguage();
        let gender = await userInstance.getGender();
        let country = await userInstance.getCountry();
        let city = await userInstance.getCity();
        let locAddress = await userInstance.getLocAddress();
        let jsonFile = await userInstance.getJsonFile();
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

        let userInfo = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            preferredLanguage: preferredLanguage,
            preferredCurrency: parseInt(currency.id, 10),
            gender: gender,
            country: parseInt(country.id, 10),
            city: parseInt(city.id, 10),
            birthday: `${day}/${month}/${year}`,
            locAddress: locAddress,
            jsonFile: jsonFile
        };
        Object.keys(userInfo).forEach((key) => (userInfo[key] === null || userInfo[key] === '') && delete userInfo[key]);
        this.showProgressView();
        requester.updateUserInfo(userInfo, null).then(res => {
            if (res.success) {
                this.getCurrencyRate(currency);
            }
            else {
                this.hideProgressView();
                console.log('failed updating userdata')
            }
        });
    }

    getCurrencyRate(currency) {
        
        requester.getLocRateByCurrency(currency.code).then(res => {
            res.body.then(data => {
                this.hideProgressView();
                if (currency.code == 'EUR') {
                    userInstance.setCurrency(currency);
                    AsyncStorage.setItem('currencyLocPrice', data[0].price_eur.toString());
                    this.setState({
                        currentCurrency: currency,
                        currencyLocPrice: data[0].price_eur,
                    });
                }
                else if (currency.code == 'USD') {
                    userInstance.setCurrency(currency);
                    AsyncStorage.setItem('currencyLocPrice', data[0].price_usd.toString());
                    this.setState({
                        currentCurrency: currency,
                        currencyLocPrice: data[0].price_usd,
                    });
                }
                else if (currency.code == 'GBP') {
                    userInstance.setCurrency(currency);
                    AsyncStorage.setItem('currencyLocPrice', data[0].price_gbp.toString());
                    this.setState({
                        currentCurrency: currency,
                        currencyLocPrice: data[0].price_gbp,
                    });

                }
            });
        }).catch(err => {
            this.hideProgressView();
            console.log(err);
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
        const { currentCurrency, currencyLocPrice, locBalance, walletAddress, preferredCurrency, ethBalance } = this.state;

        console.log("currency: " + currentCurrency);
        console.log("locPrice: " + currencyLocPrice);
        let price = locBalance * currencyLocPrice;
        var displayPrice = '';
        if (currentCurrency.code == "EUR") {
            displayPrice = '€';
        }
        else if (currentCurrency.code == "USD") {
            displayPrice = '$';
        }
        else if (currentCurrency.code == "GBP") {
            displayPrice = '£';
        }
        displayPrice += price.toFixed(2);

        return (
            <View style={styles.container}>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#DA7B61' }}
                    position='bottom'
                    positionValue={100}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={1.0}
                    textStyle={{ color: 'white', fontFamily: 'FuturaStd-Light' }}
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    fullScreen={false}
                    onRequestClose={() => { this.onCancel() }}>
                    {this.showModal()}
                </Modal>
                <ProgressDialog
                    visible={this.state.showProgress}
                    title=""
                    message={this.state.loadMessage}
                    animationType="fade"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black" />
                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <View style={styles.cardBox}>
                        <Image
                            source={require('../../../assets/splash.png')}
                            style={styles.logo} />
                        <View style={{ width: '100%' }}>
                            <Text style={styles.walletAddres}>{walletAddress}</Text>
                        </View>
                        <Text style={styles.balanceLabel}>Current Balance</Text>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.balanceText}>{locBalance.toFixed(6)} LOC / {displayPrice}</Text>
                        </View>
                        <Text style={styles.balanceLabel}>ETH Balance</Text>
                        <View style={{ width: '100%' }}>
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
