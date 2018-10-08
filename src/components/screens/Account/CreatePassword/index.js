import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { Component } from 'react';

import Image from 'react-native-remote-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import styles from './styles';
import { hasLetterAndNumber, hasSymbol, validateConfirmPassword, validatePassword } from '../../../../utils/validation';
import SmartInput from '../../../atoms/SmartInput';
import WhiteBackButton from '../../../atoms/WhiteBackButton';

class CreatePassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onCreatePassword = this.onCreatePassword.bind(this);
        this.state = {
            password: '',
            confirmPassword: ''
        };
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    onCreatePassword() {
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
            Toast.showWithGravity('Passwords are not matched, Please input correctly', Toast.SHORT, Toast.BOTTOM);
            return;
        }
        const { params } = this.props.navigation.state;
        const { password } = this.state;

        this.props.navigation.navigate('Terms', { ...params, password})
    }

    render() {
        const { password, confirmPassword } = this.state;
        const { goBack } = this.props.navigation;
        return (
            <KeyboardAwareScrollView
                style={styles.container}
                enableOnAndroid={true}
                enableAutoAutomaticScroll={(Platform.OS === 'ios')}>
            <View style={styles.main_container}>
                <WhiteBackButton style={styles.closeButton} onPress={() => goBack()}/>

                <View style={styles.lowOpacity}>
                    <Image
                        source={require('../../../../assets/get-started-white-outline.png')}
                        style={styles.getStartedImage}
                    />
                </View>

                <View style={styles.main}>
                    <View style={styles.titleView}><Text style={styles.titleText}>Create Password</Text></View>

                    <Text style={styles.finePrintText}>
                    Your password must be at least: 8 characters long, should containt at least one digit and should contain at least one symbol.
                    </Text>

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

                    <View style={styles.subTitleView}><Text style={styles.titleText}>Please Confirm Your Password</Text></View>

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
                            onPress={this.onCreatePassword}>
                            <View style={styles.nextButton}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome>{Icons.arrowRight}</FontAwesome>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default CreatePassword;
