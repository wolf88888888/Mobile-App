import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import Switch from 'react-native-customisable-switch';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';
import { validateEmail, validateName } from '../../../utils/validation';
import WhiteBackButton from '../../atoms/WhiteBackButton';
import SmartInput from '../../atoms/SmartInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';

class CreateAccount extends Component {
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
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            country: '',
            userWantsPromo: true,
            checkZIndex: 1 // zIndex of switchCheckView
        };
        this.animationTime = 150; // time for switch to slide from one end to the other
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    render() {
        const {
            firstName, lastName, email, country, userWantsPromo, checkZIndex
        } = this.state;
        const { navigate, goBack } = this.props.navigation;

        return (
            <KeyboardAwareScrollView
                style={styles.container}
                enableOnAndroid={true}
                enableAutoAutomaticScroll={(Platform.OS === 'ios')}>
            <View style={styles.container}>
                <WhiteBackButton style={styles.closeButton} onPress={() => goBack()}/>

                <View style={styles.lowOpacity}>
                    <Image
                        source={require('../../../assets/get-started-white-outline.png')}
                        style={styles.getStartedImage}
                    />
                </View>
                <View style={styles.main}>
                    <View style={styles.titleView}><Text style={styles.titleText}>Create Account</Text></View>

                    <View style={styles.inputView}>
                        <SmartInput
                            autoCorrect={false}
                            value={firstName}
                            onChangeText={this.onChangeHandler('firstName')}
                            placeholder="First Name"
                            placeholderTextColor="#fff"
                            rightIcon={validateName(firstName) ? 'check' : null}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <SmartInput
                            autoCorrect={false}
                            value={lastName}
                            onChangeText={this.onChangeHandler('lastName')}
                            placeholder="Last Name"
                            placeholderTextColor="#fff"
                            rightIcon={validateName(lastName) ? 'check' : null}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <SmartInput
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={this.onChangeHandler('email')}
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            rightIcon={validateEmail(email) ? 'check' : null}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <SmartInput
                            keyboardType="default"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={country}
                            onChangeText={this.onChangeHandler('country')}
                            placeholder="Country of Residence"
                            placeholderTextColor="#fff"
                            rightIcon={country.length > 3 ? 'check' : null}
                        />
                    </View>

                    <View style={styles.finePrintView}>
                        <Text style={styles.finePrintText}>
                        I'd like to receive promotional communications, including discounts,
                        surveys and inspiration via email, SMS and phone.
                        </Text>

                        <View style={{flex: 0.2, alignSelf: 'flex-end',}}>
                            { userWantsPromo ?
                                <View style={[styles.switchCheckView, { zIndex: checkZIndex }]}>
                                    <Text style={styles.switchCheckText}>
                                        <FontAwesome>{Icons.check}</FontAwesome>
                                    </Text>
                                </View>
                                : null }
                            <Switch
                                value={userWantsPromo}
                                onChangeValue={() => {
                                    this.setState({ userWantsPromo: !userWantsPromo, checkZIndex: 0 });
                                    setTimeout(() => this.setState({ checkZIndex: 1 }), 150);
                                }}
                                activeTextColor="#DA7B61"
                                activeBackgroundColor="#e4a193"
                                inactiveBackgroundColor="#DA7B61"
                                switchWidth={62}
                                switchBorderColor="#e4a193"
                                switchBorderWidth={1}
                                buttonWidth={30}
                                buttonHeight={30}
                                buttonBorderRadius={15}
                                buttonBorderColor="#fff"
                                buttonBorderWidth={0}
                                animationTime={this.animationTime}
                                padding={false}
                            />
                        </View>
                    </View>

                    <View style={styles.nextButtonView}>
                        <TouchableOpacity
                            disabled={!validateName(firstName) || !validateName(lastName) || !validateEmail(email)}
                            onPress={() => navigate('CreatePassword', {
                                firstName, lastName, email, country ,userWantsPromo
                            })}
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
            </KeyboardAwareScrollView>
        );
    }
}

export default CreateAccount;
