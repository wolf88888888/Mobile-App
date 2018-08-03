import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { Component } from 'react';
import { validateEmail, validateName } from '../../../utils/validation';

import Image from 'react-native-remote-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import SmartInput from '../../atoms/SmartInput';
import Switch from 'react-native-customisable-switch';
import Toast from 'react-native-simple-toast';
import WhiteBackButton from '../../atoms/WhiteBackButton';
import requester from '../../../initDependencies';
import styles from './styles';

class CreateAccount extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => { }
        }
    }

    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getCountriesForSignup = this.getCountriesForSignup.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            country: '',
            userWantsPromo: true,
            checkZIndex: 1, // zIndex of switchCheckView
            countries: [],
            countriesLoaded: false,
            countryId: undefined,
            countryName: undefined
        };
        this.animationTime = 150; // time for switch to slide from one end to the other
        this.getCountriesForSignup();
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    getCountriesForSignup() {
        requester.getCountries(true).then(res => {
            res.body.then(data => {
                countryArr = [];
                data.content.map((item, i) => {
                    countryArr.push({
                        'label': item.name,
                        'value': item
                    });
                });
                this.setState({
                    countries: countryArr,
                    countriesLoaded: true,
                    countryId: countryArr[0].value.id,
                    countryName: countryArr[0].label,
                });
            });
        });
    }

    goToCreatePassword() {
        const {
            firstName, lastName, email, country, userWantsPromo, checkZIndex
        } = this.state;
        if (country === undefined || country === '') {
            Toast.showWithGravity('Select Country.', Toast.SHORT, Toast.CENTER);
        }
        else {
            this.props.navigation.navigate('CreatePassword', {
                firstName, lastName, email, country, userWantsPromo
            })
        }
    }

    render() {
        const {
            firstName, lastName, email, country, userWantsPromo, checkZIndex
        } = this.state;
        const { navigate, goBack } = this.props.navigation;

        return (
            <KeyboardAwareScrollView
                style={styles.container}
                enableOnAndroid={true} //eslint-disable-line
                enableAutoAutomaticScroll={(Platform.OS === 'ios')}
            >
                <View style={styles.container}>
                    <WhiteBackButton style={styles.closeButton} onPress={() => goBack()} />

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
                            <RNPickerSelect
                                items={this.state.countries}
                                placeholder={{
                                    label: 'Country of Residence',
                                    value: 0
                                }}
                                onValueChange={(value) => {
                                    this.setState({
                                        countryId: value.id,
                                        countryName: value.name,
                                        country: value.name,
                                        value: value
                                    });
                                }}
                                style={{ ...pickerSelectStyles }}
                            >
                            </RNPickerSelect>
                        </View>

                        <View style={styles.finePrintView}>
                            <Text style={styles.finePrintText}>
                                I'd like to receive promotional communications, including discounts,
                                surveys and inspiration via email, SMS and phone.
                        </Text>

                            <View style={{ flex: 0.2, alignSelf: 'flex-end', }}>
                                {userWantsPromo ?
                                    <View style={[styles.switchCheckView, { zIndex: checkZIndex }]}>
                                        <Text style={styles.switchCheckText}>
                                            <FontAwesome>{Icons.check}</FontAwesome>
                                        </Text>
                                    </View>
                                    : null}
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
                                onPress={() => this.goToCreatePassword()}
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        color: 'white'
    },
    inputAndroid: {
        marginLeft: 12,
        color: 'white',
    },
    underline: {
        borderTopWidth: 0,
        borderTopColor: '#888988',
        marginHorizontal: 4,
    },
    viewContainer: {
        borderColor: '#e4a193',
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
    }
});

export default CreateAccount;
