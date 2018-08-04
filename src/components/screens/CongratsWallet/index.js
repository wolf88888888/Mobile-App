import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import Image from 'react-native-remote-svg';

import GoBack from '../../atoms/GoBack';
import styles from './styles';
import Button from '../../atoms/Button';


class CongratsWallet extends Component {
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
        super(props)
        this.gotoRoot = this.gotoRoot.bind(this);
    }

    gotoRoot() {
        const { params } = this.props.navigation.state;
        const { pop } = this.props.navigation;
        if (params.isFB) {
            pop(6);
        }
        else {
            pop(7);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.main}>
                        <Image
                            source={require('../../../assets/walletCongrats.png')}
                            style={styles.walletCongratsImage} />
                        <Text style={styles.bigTitle}>Congratulations!</Text>
                        <Text style={styles.subTitle}>Your LOC Wallet Has Been Created</Text>
                        <View style={styles.gotoButtonContainer}>
                            <Button wrapStyle={{backgroundColor: '#223843', width:'90%'}} onPress={this.gotoRoot} text="Proceed to Login" />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

CongratsWallet.propTypes = {
    // react-navigation
    navigation: PropTypes.object.isRequired
}

export default CongratsWallet;
