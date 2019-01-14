import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import BackButton from '../../atoms/BackButton';
import ProfileHistoryItem from '../../atoms/ProfileHistoryItem';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { userInstance } from '../../../utils/userInstance';
import { validateNumberic, validateEmptyString } from '../../../utils/validation';
import { TokenTransactions } from '../../../services/blockchain/tokenTransactions';
import styles from './styles';

class SendToken extends Component {
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
            locAddress: '',
            locBalance: 'sdfds',
            ethBalance: 'fsadfs',
            wallet_address: '',
            loc_amount: '',
            wallet_password: '',
            showProgress: false,
            jsonFile: '',
            loadMessage: 'sending...',
        };
        this.onClickSend = this.onClickSend.bind(this);
    }

     async componentDidMount() {
        let jsonFile = await userInstance.getJsonFile();
        let walletAddress = await userInstance.getLocAddress();
        this.setState({
            jsonFile: jsonFile,
            locAddress: walletAddress,
            ethBalance: this.props.navigation.state.params.ethBalance,
            locBalance: this.props.navigation.state.params.locBalance
        });
    }

    tokensToWei(tokens) {
        let index = tokens.indexOf('.');
        let trailingZeroes = 0;
        let wei = '';
        if (index === -1) {
            trailingZeroes = 18;
        } 
        else {
            trailingZeroes = 18 - (tokens.length - 1 - index);
        }
    
        wei = tokens.replace(/[.,]/g, '');
        if (trailingZeroes >= 0) {
            wei = wei + '0'.repeat(trailingZeroes);
        } 
        else {
            wei = wei.substring(0, index + 18);
        }
    
        return wei;
    }

    onClickSend() { 
        this.setState({ showProgress: true });
        setTimeout(() => {
            const wei = (this.tokensToWei(this.state.loc_amount.toString()));
            TokenTransactions.sendTokens(
                this.state.jsonFile,
                this.state.wallet_password,
                this.state.wallet_address,
                wei.toString()//(parseFloat(this.state.loc_amount) * Math.pow(10, 18)).toString()
            ).then(() => {
                this.setState({
                    wallet_address: '',
                    locAmount: 0,
                    wallet_password: '',
                    showProgress: false,
                }, ()=> {
                    setTimeout(() => {
                        alert('Transaction made successfully');
                    }, 1000)
                });
            }).catch(x => {
                this.setState({ showProgress: false }, () => {
                    setTimeout(() => {
                        if (x.hasOwnProperty('message')) {
                            alert(x.message);
                        } 
                        else if (x.hasOwnProperty('err') && x.err.hasOwnProperty('message')) {
                            alert(x.err.message);
                        }
                        else if (typeof x === 'string') {
                            alert(x);
                        } 
                        else {
                            console.log(x);
                        }
                    }, 1000)
                });
            });
        }, 1000);
    }

    @autobind
    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        const {locAddress, locBalance, ethBalance, wallet_address, loc_amount, wallet_password } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.navContainer}>
                    <View style={styles.titleConatiner}>
                        <BackButton style={styles.closeButton} onPress={() => goBack()} />
                        <Text style={styles.title}>Send Token</Text>
                    </View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <View style={styles.body}>
                        <View style = {styles.section}>
                            <Text style={styles.sectionTitle}>Your Wallet
                            </Text>
                        </View>
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Your ETH/LOC address"}
                            detail={locAddress} />
                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"LOC Balance"}
                            detail={locBalance} />
                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"ETH Balance"}
                            detail={ethBalance} />
                        <View style={styles.lineStyle} />
                        <View style = {styles.section}>
                            <Text style={styles.sectionTitle}>Send Tokens
                            </Text>
                        </View>
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Recipient ETH/LOC address"} />
                        <TextInput
                            style={styles.input}
                            value={wallet_address}
                            placeholder='Valid ERC-20 compliant wallet address'
                            underlineColorAndroid='transparent'
                            onChangeText={this.onChangeHandler('wallet_address')}
                        />
                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Send LOC Amount"} />
                        <TextInput
                            style={styles.input}
                            value={loc_amount}
                            placeholder={'0'}
                            returnKeyType={'next'}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={this.onChangeHandler('loc_amount')}
                        />
                        <View style={styles.lineStyle} />
                        <ProfileHistoryItem
                            style={styles.historyStyle}
                            title={"Your wallet password"} />
                        <TextInput
                            secureTextEntry
                            style={styles.input}
                            value={wallet_password}
                            placeholder="The password is needed to unlock your wallet for a single transaction"
                            underlineColorAndroid='transparent'
                            onChangeText={this.onChangeHandler('wallet_password')}
                        />                        
                    </View>
                </ScrollView>
                <TouchableOpacity
                    disabled={!validateNumberic(loc_amount) || validateEmptyString(wallet_address)}
                    onPress={() => this.onClickSend()}
                >
                    <View style={styles.sendButton}>
                        <Text style={styles.buttonText}>
                        Send
                        </Text>
                    </View>
                </TouchableOpacity>
                <ProgressDialog
                    visible={this.state.showProgress}
                    title=""
                    message={this.state.loadMessage}
                    animationType="fade"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black" />
            </View>
        );
    }
}

export default SendToken;
