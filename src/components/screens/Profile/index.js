import { AsyncStorage, Clipboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Image from 'react-native-remote-svg';
import Toast from 'react-native-easy-toast'
import { Wallet } from '../../../services/blockchain/wallet';
import { userInstance } from '../../../utils/userInstance';
import SingleSelectMaterialDialog from '../../atoms/MaterialDialog/SingleSelectMaterialDialog'
import ProfileWalletCard from  '../../atoms/ProfileWalletCard'
import { setCurrency } from '../../../redux/action/Currency'
import styles from './styles';

const BASIC_CURRENCY_LIST = ['EUR', 'USD', 'GBP'];
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            walletAddress: '',
            locBalance: 0,
            ethBalance: '0.0',
            currency: props.currency,
            currencySign: props.currencySign,
            currencySelectionVisible: false,
        }
        // this.props.actions.getCurrency(props.currency, false);
    }

    async componentDidMount() {
        this.listListener = [
            this.props.navigation.addListener('didFocus', () => {
              this.onRefresh()
            })
        ];

        let walletAddress = await userInstance.getLocAddress();
        this.setState({
            walletAddress: walletAddress,
        });
        if (walletAddress !== null && walletAddress !== '') {
            Wallet.getBalance(walletAddress).then(x => {
                const ethBalance = x / (Math.pow(10, 18));
                this.setState({ ethBalance: ethBalance });
            });
            Wallet.getTokenBalance(walletAddress).then(y => {
                const locBalance = y / (Math.pow(10, 18));
                this.setState({ locBalance: locBalance });
            });
        }
    }

    componentWillUnmount() {
       // Now remove listeners here
       this.listListener.forEach( item => item.remove() )
     }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.currency != prevProps.currency) {
            this.setState({
                currency: this.props.currency, 
                currencySign:this.props.currencySign});
        }
    }

    onRefresh = async () => {
        console.log("onRefresh ---------------");

        if (this.state.walletAddress === null || this.state.walletAddress === '') {
            
            let walletAddress = await userInstance.getLocAddress();
            if (walletAddress !== null && walletAddress !== '') {
                this.setState({
                    walletAddress: walletAddress,
                });
                Wallet.getBalance(walletAddress).then(x => {
                    const ethBalance = x / (Math.pow(10, 18));
                    this.setState({ ethBalance: ethBalance });
                });
                Wallet.getTokenBalance(walletAddress).then(y => {
                    const locBalance = y / (Math.pow(10, 18));
                    this.setState({ locBalance: locBalance });
                });
            }
        }
    }

    onCurrency = () => {
        this.setState({ currencySelectionVisible: true });
    }

    updateGender = (gender) => {
        this.setState({
            info: {
                ...this.state.info,
                gender: gender,
            }
        })
    }

    logout = () => {
        const nestedNavigation = NavigationActions.navigate({
            routeName: 'Welcome',
            action: NavigationActions.navigate({routeName: "WELCOME_TRIPS"})
        });
        this.props.navigation.dispatch(nestedNavigation);

		let resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({routeName: 'Welcome'})
			]
		});
        this.props.navigation.dispatch(resetAction);
        AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
    }

    navigateToPaymentMethods = () => {
        this.props.navigation.navigate('PaymentMethods', {});
    }

    createWallet = () => {
        const {navigate} = this.props.navigation;
        navigate("CreateWallet");
    }

    showToast = () => {
        this.refs.toast.show('This feature is not enabled yet in the current alpha version.', 1500);
    }

    render() {
        const { navigate } = this.props.navigation;
        const { currency, locBalance, walletAddress, ethBalance } = this.state;

        console.log("profile walletAddress: ", walletAddress);
        console.log("profile currency: ", currency);

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
                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <ProfileWalletCard
                        walletAddress = { walletAddress }
                        locBalance = { locBalance }
                        ethBalance = { ethBalance }
                        createWallet = { this.createWallet }/>
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
                        <TouchableOpacity onPress={() => navigate('Notifications')} style={styles.navItem}>
                            <Text style={styles.navItemText}>Notifications</Text>
                            <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-bell.png')} style={styles.navIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.navigateToPaymentMethods} style={styles.navItem}>
                            <Text style={styles.navItemText}>Payment Methods</Text>
                            <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-payment.png')} style={styles.navIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onCurrency} style={styles.navItem}>
                            <Text style={styles.navItemText}>Currency</Text>
                            <Text style={styles.navCurrency}>{currency}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={this.showToast} style={styles.navItem}>
                            <Text style={styles.navItemText}>Switch to Hosting</Text>
                            <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-switch.png')} style={styles.navIcon} />
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => navigate('SendToken', { locBalance: locBalance.toFixed(6), ethBalance: parseFloat(ethBalance).toFixed(6)})} style={styles.navItem}>
                            <Text style={styles.navItemText}>Send Tokens</Text>
                            <Image resizeMode="stretch" source={require('../../../assets/png/Profile/icon-switch.png')} style={styles.navIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.logout} style={styles.navItem}>
                            <Text style={styles.navItemText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <SingleSelectMaterialDialog
                    title = { 'Select Currency' }
                    items = { BASIC_CURRENCY_LIST.map((row, index) => ({ value: index, label: row })) }
                    visible = { this.state.currencySelectionVisible }
                    onCancel = { () =>this.setState({ currencySelectionVisible: false }) }
                    onOk = { result => {
                        console.log("select country", result);
                        this.setState({ currencySelectionVisible: false });
                        this.props.setCurrency({currency: result.selectedItem.label});
                        // this.props.actions.getCurrency(result.selectedItem.label);
                    }}
                />
            </View>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign
    };
}

const mapDispatchToProps = dispatch => ({
    setCurrency: bindActionCreators(setCurrency, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
