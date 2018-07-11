import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native';
import Image from 'react-native-remote-svg';
import { autobind } from 'core-decorators';

import WhiteBackButton from '../../atoms/WhiteBackButton';
import SmartInput from '../../atoms/SmartInput';
import { domainPrefix } from '../../../config';
import { validatePassword, validateConfirmPassword, hasLetterAndNumber, hasSymbol } from '../../../utils/validation';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Wallet } from '../../../services/blockchain/wallet';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class CreateWallet extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            state: PropTypes.shape({
                params: PropTypes.object
            })
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => { },
            state: {
                params: {},
            }
        }
    }
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            password: '',
            confirmPassword: '',
            showProgress: false
        };
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
            Toast.showWithGravity('Password should be at least 8 symbols.', Toast.SHORT, Toast.BOTTOM);
            return;
        }
        if (!hasLetterAndNumber(this.state.password)) {
            Toast.showWithGravity('Password must contain both latin letters and digits.', Toast.SHORT, Toast.BOTTOM);
            return;
        }
        if (!hasSymbol(this.state.password)) {
            Toast.showWithGravity('Password must contain symbols, like !, # or %..', Toast.SHORT, Toast.BOTTOM);
            return;
        }

        if (!validateConfirmPassword(this.state.password, this.state.confirmPassword)) {
            Toast.showWithGravity('Passwords are not matched, Please input correctly.', Toast.SHORT, Toast.BOTTOM);
            return;
        }

        this.setState({ showProgress: true });

        try {
            setTimeout(() => {
                Wallet.createFromPassword(this.state.password)
                .then((wallet) => {
                    this.setState({ showProgress: false });
                    console.log(wallet);
                    AsyncStorage.setItem('walletAddress', wallet.address);
                    AsyncStorage.setItem('walletMnemonic', wallet.mnemonic);
                    AsyncStorage.setItem('walletJson', JSON.stringify(wallet.jsonFile));
                    this.props.navigation.navigate('SaveWallet', { ...params});
                })
                .catch(err => {
                    this.setState({ showProgress: false });
                    Toast.showWithGravity('Cannot create wallet, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
                    console.log(err);
                });
            }, 500);

        } catch (error) {
            this.setState({ showProgress: false });
            Toast.showWithGravity('Cannot create wallet, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
            console.log(error);
        }
    }

    render() {
        const { password, confirmPassword } = this.state;
        const { navigate, goBack } = this.props.navigation;

        return (
            <KeyboardAwareScrollView
                style={styles.container}
                enableOnAndroid={true}
                enableAutoAutomaticScroll={(Platform.OS === 'ios')}>
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
                                placeholder="Password"
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
                                placeholder="Password"
                                placeholderTextColor="#fff"
                                rightIcon={validateConfirmPassword(password, confirmPassword) ? 'check' : null}
                            />
                        </View>

                        <View style={styles.nextButtonView}>
                            <TouchableOpacity
                                onPress={() => this.submitPassword()}
                            >
                                <View style={styles.nextButton}>
                                    <Text style={styles.buttonText}>
                                        <FontAwesome>{Icons.arrowRight}</FontAwesome>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ProgressDialog
                       visible={this.state.showProgress}
                       title="Creating Wallet..."
                       message="We are creating your wallet through the Ethereum network. Please be patient. This process can take up to 2-3 minutes due to the advanced security procedure involved."
                       animationType="slide"
                       activityIndicatorSize="large"
                       activityIndicatorColor="black"/>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default CreateWallet;
