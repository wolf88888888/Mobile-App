import {
    AsyncStorage,
    Platform,
    Text,
    TouchableOpacity,
    View,
    StatusBar
} from 'react-native';
import React, { Component } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Toast, {DURATION} from 'react-native-easy-toast'

import { hasLetterAndNumber, hasSymbol, validateConfirmPassword, validatePassword } from '../../../../utils/validation';
import SmartInput from '../../../atoms/SmartInput';
import { Wallet } from '../../../../services/blockchain/wallet';
import LineProgressDialog from '../../../atoms/SimpleDialogs/LineProgressDialog';
import WhiteBackButton from '../../../atoms/WhiteBackButton';
import styles from './styles';

class CreateWallet extends Component {
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            password: '',
            confirmPassword: '',
            showProgress: false,
            progress: 0
        };
    }

    componentWillUpdate() {
        console.log("CreateWallet - componentWillUpdate");
    }

    componentDidMount() {
        //this.animate();
        console.log("CreateWallet - componentDidMount");
    }

    animate() {
        let progress = 0;
        this.setState({ progress });
        this.interval = setInterval(() => {
            //console.log("animate - " + progress);
            if (this.state.showProgress) {
                progress += 0.004;
                if (progress > 0.9) {
                    progress = 0.9;
                    this.stopAnimation();
                }
                this.setState({ progress });
            }
        }, 50);
    }

    stopAnimation() {
        clearInterval(this.interval);
    }
    

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    submitPassword() {
        const { params } = this.props.navigation.state;
        // return;
        if (this.state.password.length < 8) {
            this.refs.toast.show('Password should be at least 8 symbols.', 1500);
            return;
        }
        if (!hasLetterAndNumber(this.state.password)) {
            this.refs.toast.show('Password must contain both latin letters and digits.', 1500);
            return;
        }
        if (!hasSymbol(this.state.password)) {
            this.refs.toast.show('Password must contain symbols, like !, # or %...', 1500);
            return;
        }

        if (!validateConfirmPassword(this.state.password, this.state.confirmPassword)) {
            this.refs.toast.show('Passwords are not matched, Please input correctly.', 1500);
            return;
        }

        this.setState({ showProgress: true});
        this.animate();

        try {
            setTimeout(() => {
                Wallet.createFromPassword(this.state.password)
                .then((wallet) => {
                    this.stopAnimation();
                    this.setState({ progress: 1});
                    setTimeout(() => {
                        console.log(wallet);
                        AsyncStorage.setItem('walletAddress', wallet.address);
                        AsyncStorage.setItem('walletMnemonic', wallet.mnemonic);
                        const walletJson = JSON.stringify(wallet.jsonFile);
                        AsyncStorage.setItem('walletJson', walletJson);
                        this.props.navigation.navigate('WalletRecoveryKeywords', { ...params, walletAddress:wallet.address, walletJson: walletJson});
                        this.setState({ showProgress: false });
                    }, 1000);
                })
                .catch(err => {
                    this.setState({ showProgress: false });
                    this.refs.toast.show('Cannot create wallet, Please check network connection.', 1500);
                    console.log(err);
                });
            }, 500);

        } catch (error) {
            this.setState({ showProgress: false });
            this.refs.toast.show('Cannot create wallet, Please check network connection.', 1500);
            console.log(error);
        }
    }

    render() {
        const { password, confirmPassword } = this.state;
        const { goBack } = this.props.navigation;

        return (
            <KeyboardAwareScrollView
                style={styles.container}
                enableOnAndroid={true}
                enableAutoAutomaticScroll={(Platform.OS === 'ios')}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="light-content"
                />
                <View style={styles.container}>
                    <WhiteBackButton style={styles.closeButton} onPress={() => goBack()}/>

                    <View style={styles.main}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>Create LOC Private Wallet</Text>
                        </View>

                        <View>
                            <Text style={styles.infoText}>
                            Your LOC wallet is Blockchain based and you are the only person to have access to it. It will not be on our server. When you are adding funds to it, your funds will be in your complete control and possession. It is very important not to share your wallet password. For security reasons we will not store this password and there will be no way for you to recover it through our site.
                            </Text>
                        </View>

                        <View style={styles.titleView}><Text style={styles.titleText1}>Please create your LOC wallet</Text></View>

                        <View style={styles.inputView}>
                            <SmartInput
                                secureTextEntry
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={password}
                                onChangeText={this.onChangeHandler('password')}
                                placeholder="8 chars with a digit and a symbol"
                                placeholderTextColor="#fff"
                                rightIcon={validatePassword(password) ? 'check' : null}
                            />
                        </View>

                        <View style={styles.titleView}><Text style={styles.titleText2}>Please confirm your LOC wallet</Text></View>

                        <View style={styles.inputView}>
                            <SmartInput
                                secureTextEntry
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={confirmPassword}
                                onChangeText={this.onChangeHandler('confirmPassword')}
                                placeholder="8 chars with a digit and a symbol"
                                placeholderTextColor="#fff"
                                rightIcon={validateConfirmPassword(password, confirmPassword) ? 'check' : null}
                            />
                        </View>

                        <View style={styles.nextButtonView}>
                            <TouchableOpacity
                                onPress={() => this.submitPassword()}
                            >
                                <View style={styles.nextButton}>
                                    <FontAwesome5Icon name={"arrow-right"} size={20} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <LineProgressDialog
                        style={{flex:1}}
                        visible={this.state.showProgress}
                        title=""
                        message={"Creating Wallet: " + parseInt(this.state.progress * 100) + "%" }
                        progress={this.state.progress}/>
                        
                    <Toast
                        ref="toast"
                        position='bottom'
                        opacity={0.8}
                        positionValue={150}
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default CreateWallet;
