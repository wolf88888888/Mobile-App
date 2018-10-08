import {
    AsyncStorage,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StatusBar
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import SmartInput from '../../../atoms/SmartInput';
import WhiteBackButton from '../../../atoms/WhiteBackButton';
import styles from './styles';

class WalletRecoveryKeywords extends Component {
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

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { walletMnemonic } = this.state;
        let i = 0;
        return (
            <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%', backgroundColor:'#DA7B61' }}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="light-content"
                />
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
                                            <SmartInput value={`${i}. ${value}`} placeholderTextColor="#fff" editable={false}/>
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

export default WalletRecoveryKeywords;
