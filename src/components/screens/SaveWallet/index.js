import {
    AsyncStorage,
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import Image from 'react-native-remote-svg';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import SmartInput from '../../atoms/SmartInput';
import Toast from 'react-native-simple-toast';
import WhiteBackButton from '../../atoms/WhiteBackButton';
import { autobind } from 'core-decorators';
import { domainPrefix } from '../../../config';
import { imgHost } from '../../../config';
import requester from '../../../initDependencies';
import styles from './styles';

// import DialogProgress from 'react-native-dialog-progress'



class SaveWallet extends Component {
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
            walletAddress: '',
            walletJson: '',
            walletMnemonic: ''
        }
    }

    async componentDidMount() {
        this.setState({ walletAddress: await AsyncStorage.getItem('walletAddress') });
        this.setState({ walletJson: await AsyncStorage.getItem('walletJson') });
        this.setState({ walletMnemonic: await AsyncStorage.getItem('walletMnemonic') });
    }

    toWalletKeywordValidation() {
        const { params } = this.props.navigation.state;
        this.props.navigation.navigate('WalletKeywordValidation', { ...params})
    }

    onClickAccept = async () => {
        const { params } = this.props.navigation.state;
        const {navigate} = this.props.navigation;
        let user = params;
        user['image'] = "https://staging.locktrip.com/images/default.png";
        user['jsonFile'] = this.state.walletJson;
        user['locAddress'] = this.state.walletAddress;

        console.log(user);

        const options = {
            title:"",
            message:"Registering...",
            isCancelable:false
        };

        this.setState({ showProgress: true });
        requester.register(user, null).then(res => {
            this.setState({ showProgress: false });
            if (res.success) {
                console.log(res);
                navigate('CongratsWallet', {isFB:params.isFB})
            } else {
                res.errors.then(data => {
                    const { errors } = data;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                            Toast.showWithGravity(errors[key].message, Toast.SHORT, Toast.BOTTOM);
                            console.log('Error logging in:', errors[key].message);
                        }
                    });
                });
            }
        })
        .catch(err => {
            this.setState({ showProgress: false });
            Toast.showWithGravity('Cannot get messages, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
            console.log(err);
        });
    };

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { walletMnemonic } = this.state;
        let i = 0;
        return (
            <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <WhiteBackButton style={styles.closeButton} onPress={() => goBack()}/>

                        <View style={styles.main}>
                            <View style={styles.titleView}>
                                <Text style={styles.titleText}>Wallet Recovery Keywords</Text>
                            </View>

                            <View>
                                <Text style={styles.infoText}>
                                Your mnemonic recovery keywords are the ONLY WAY you could recover access to your wallet in case your device is damaged and/or in case you forget your wallet password. You should write them down on a piece of paper and store them in a safe place where no one else has access to.
                                </Text>
                            </View>

                                {walletMnemonic.split(' ').map(function (value) {
                                    i++;
                                    return (
                                        <View key={i} style={styles.inputView}>
                                            <SmartInput value={`${i}. ${value}`} placeholderTextColor="#fff" />
                                        </View>
                                    )
                                })}

                            <View style={styles.nextButtonView}>
                                <TouchableOpacity
                                    onPress={() => this.toWalletKeywordValidation()}>
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
                           title=""
                           message="Finalizing…"
                           animationType="slide"
                           activityIndicatorSize="large"
                           activityIndicatorColor="black"/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

export default SaveWallet;
