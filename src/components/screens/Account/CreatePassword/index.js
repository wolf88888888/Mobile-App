import {
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { Component } from 'react';

import Image from 'react-native-remote-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
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
                                <FontAwesome5Icon name={"arrow-right"} size={20} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
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

export default CreatePassword;
