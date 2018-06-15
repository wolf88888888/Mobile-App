import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import { validatePassword, validateConfirmPassword, hasLetterAndNumber, hasSymbol } from '../../../utils/validation';
import WhiteBackButton from '../../atoms/WhiteBackButton';
import SmartInput from '../../atoms/SmartInput';
import styles from './styles';

class CreatePassword extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            state: PropTypes.shape({
                params: PropTypes.object //eslint-disable-line
            })
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {},
            state: {
                params: {}
            }
        }
    }
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
            ToastAndroid.showWithGravityAndOffset('Password should be at least 8 symbols.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200);
            return;
        }
        if (!hasLetterAndNumber(this.state.password)) {
            ToastAndroid.showWithGravityAndOffset('Password must contain both latin letters and digits.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200);
            return;
        }
        if (!hasSymbol(this.state.password)) {
            ToastAndroid.showWithGravityAndOffset('Password must contain symbols, like !, # or %..', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200);
            return;
        }

        if (!validateConfirmPassword(this.state.password, this.state.confirmPassword)) {
            ToastAndroid.showWithGravityAndOffset('Passwords are not matched, Please input correctly.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200);
            return;
        }
        const { params } = this.props.navigation.state;
        const { password, confirmPassword } = this.state;

        this.props.navigation.navigate('Terms', { ...params, password })
    }

    render() {
        const { password, confirmPassword } = this.state;
        const { navigate, goBack } = this.props.navigation;
        const { params } = this.props.navigation.state;

        return (
            <View style={styles.container}>
                <WhiteBackButton style={styles.closeButton} onPress={() => goBack()}/>

                <View style={styles.lowOpacity}>
                    <Image
                        source={require('../../../assets/get-started-white-outline.png')}
                        style={styles.getStartedImage}
                    />
                </View>

                <View style={styles.main}>
                    <View style={styles.titleView}><Text style={styles.titleText}>Create Password</Text></View>

                    <Text style={styles.finePrintText}>
                    Your password must be 8 or more characters long. Do not use any common passwords, repetition or sequences.
                    Try making it longer or adding latin letter and number, adding symbols, like !, # or %.
                    </Text>

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

                    <View style={styles.subTitleView}><Text style={styles.titleText}>Please Confirm Your Password</Text></View>

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
        );
    }
}

export default CreatePassword;
