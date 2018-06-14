import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ToastAndroid
} from 'react-native';
import Image from 'react-native-remote-svg';
import { autobind } from 'core-decorators';

import WhiteBackButton from '../../atoms/WhiteBackButton';
import SmartInput from '../../atoms/SmartInput';
import { domainPrefix } from '../../../config';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { register, login } from '../../../utils/requester';
import { imgHost } from '../../../config';
import DialogProgress from 'react-native-dialog-progress'

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
        DialogProgress.show(options);

        register(user, null)
        .then((res) => {
            DialogProgress.hide();
            if (res.success) {
                console.log(res);
                navigate('CongratsWallet')
                // login(user, null).then((res) => {
                //     if (res.success) {
                //         res.response.json().then((data) => {
                //             AsyncStorage.setItem(`${domainPrefix}.auth.lockchain`, data.Authorization);
                //             // TODO: Get first name + last name from response included with Authorization token (Backend)
                //             AsyncStorage.setItem(`${domainPrefix}.auth.username`, user.email);
                //         });

                //     }
                // });
            } else {
                res.response.then((response) => {
                    const { errors } = response;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                            ToastAndroid.showWithGravityAndOffset(errors[key].message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100);
                            console.log('Error logging in:', errors[key].message);
                        }
                    });
                });
            }
        })
        .catch(err => {
            DialogProgress.hide();
            ToastAndroid.showWithGravityAndOffset('Cannot register user, Please check network connection.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200);
            console.log(err);
        });
    };

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { walletMnemonic } = this.state;
        let i = 0;
        return (
            <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                <TouchableWithoutFeedback
                >
                    <View style={styles.container}>
                        <WhiteBackButton style={styles.closeButton} onPress={() => goBack()}/>

                        <View style={styles.main}>
                            <View style={styles.titleView}>
                                <Text style={styles.titleText}>Wallet Recovery</Text>
                            </View>

                            <View>
                                <Text style={styles.infoText}>
                                    Your mnemonic recovery keywords are a way for you to backup the access to your wallet. You should print them on a piece of paper and store them in a safe place.
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
                                    onPress={() => this.onClickAccept()}
                                >
                                    <View style={styles.nextButton}>
                                        <Text style={styles.buttonText}>
                                            <FontAwesome>{Icons.arrowRight}</FontAwesome>
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

export default SaveWallet;
