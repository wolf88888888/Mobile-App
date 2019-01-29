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
    StatusBar
} from 'react-native';
import Image from 'react-native-remote-svg';
import styles from './styles';
import Button from '../../atoms/Button';


class CongratsCreditCard extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.main}>
                        <Image
                            resizeMode={'center'}
                            source={require('../../../assets/cardCongrats.png')}
                            style={styles.walletCongratsImage} />
                        <Text style={styles.bigTitle}>Congratulations!</Text>
                        <Text style={styles.subTitle}>Your credit card has been added</Text>
                        <View style={styles.gotoButtonContainer}>
                            <Button wrapStyle={{backgroundColor: '#223843', width:'90%'}} text="Return to payment Methods" />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default CongratsCreditCard;
