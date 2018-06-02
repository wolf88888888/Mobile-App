import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import Image from 'react-native-remote-svg';
import { autobind } from 'core-decorators';

import GoBack from '../../atoms/GoBack';
import SmartInput from '../../atoms/SmartInput';
import { domainPrefix } from '../../../config';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
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
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                <TouchableWithoutFeedback
                >
                    <View style={styles.container}>

                        <View style={styles.main}>
                            <Image
                                source={require('../../../assets/walletCongrats.png')}
                                style={styles.walletCongratsImage}
                            />
                            <Text style={styles.bigTitle}>Congratulations!</Text>
                            <Text style={styles.subTitle}>Your wallet has been created</Text>
                            <Button wrapStyle={{backgroundColor: '#223843', margin: 20}} onPress={() => navigate('EXPLORE')} text="Return to Home" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

CongratsWallet.propTypes = {
    // react-navigation
    navigation: PropTypes.object.isRequired
}

export default CongratsWallet;
