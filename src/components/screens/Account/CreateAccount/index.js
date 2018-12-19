import {
    Platform,
    Text,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from 'react-native-remote-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import Switch from 'react-native-customisable-switch';
import Toast from 'react-native-simple-toast';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import styles from './styles';
import { validateEmail, validateName } from '../../../../utils/validation';
import SmartInput from '../../../atoms/SmartInput';
import WhiteBackButton from '../../../atoms/WhiteBackButton';
import requester from '../../../../initDependencies';

class CreateAccount extends Component {

    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            countries: [],
            countryStates: [],
            hasCountryState: false,
            firstName: '',
            lastName: '',
            email: '',
            userWantsPromo: true,
            checkZIndex: 1, // zIndex of switchCheckView
            countriesLoaded: false,
            country: undefined,
            countryState: undefined,
        };
        this.animationTime = 150; // time for switch to slide from one end to the other
        
        const { params } = this.props.navigation.state;
        console.log("CreateAccount", params);
        if (params != undefined && params != null) {
            this.state.firstName = params.firstName;
            this.state.lastName = params.lastName;
            this.state.email = params.email;
        }
    }

    
    componentWillMount() {
        this.setCountriesInfo();
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.countries != prevProps.countries) {
            this.setCountriesInfo();
        }
    }

    setCountriesInfo() {
        countryArr = [];
        this.props.countries.map((item, i) => {
            countryArr.push({
                'label': item.name,
                'value': item
            });
            
        });
        this.setState({
            countries: countryArr,
            countriesLoaded: true,
            // country: countryArr[0].value,
        });
    }

    hasCountryState = (country) => {
        if (country == undefined || country == 0) {
            return false;
        }
        
        return ['Canada', 'India', 'United States of America'].includes(country.name);
    }

    
    setCountryStates = (states) => {
        countryStates = [];
        states.map((item, i) => {
            countryStates.push({
                'label': item.name,
                'value': item
            });
            
        });
        this.setState({
            countryStates,
        });
    }

    onCountrySelected = (value) => {
        console.log("onCountrySelected", value);
        const hasCountryState = this.hasCountryState(value);
        this.setState({
            // countryId: value.id,
            // countryName: value.name,
            country: value != 0 ? value : undefined,
            countryStates: [],
            hasCountryState: hasCountryState,
            countryState: '',
        });

        if (hasCountryState) {
            requester.getStates(value.id).then(res => {
                res.body.then(data => {
                    console.log("countryStates", data);
                    this.setCountryStates(data);
                });
            });
        }
    }

    goToNextScreen() {
        console.log("state", this.state);
        if (this.state.hasCountryState && (this.state.countryState == undefined || this.state.countryState == '')) {
            Toast.showWithGravity('Please Select State of Country.', Toast.SHORT, Toast.BOTTOM);
            return;
        }
        const { params } = this.props.navigation.state;

        if (params != undefined && params != null) {
            const {
                firstName, lastName, email, country, userWantsPromo, checkZIndex, countryState
            } = this.state;
            if (country === undefined || country === null) {
                Toast.showWithGravity('Select Country.', Toast.SHORT, Toast.BOTTOM);
            }
            else {
                this.props.navigation.navigate('Terms', { ...params, firstName, lastName, email, country: country.id, countryState: countryState.id, userWantsPromo })
            }
        }
        else {
            const {
                firstName, lastName, email, country, userWantsPromo, checkZIndex, countryState
            } = this.state;
            
            if (country === undefined || country === null) {
                Toast.showWithGravity('Select Country.', Toast.SHORT, Toast.BOTTOM);
            }
            else {
                requester.getEmailFreeResponse(email).then(res => {
                    res.body.then(data => {
                        if (data.exist) {
                            Toast.showWithGravity('Already exist email, please try with another email.', Toast.SHORT, Toast.BOTTOM);
                        } else {
                            this.props.navigation.navigate('CreatePassword', {
                                firstName, lastName, email, country: country.id, countryState: countryState.id, userWantsPromo
                            })
                        }
                    });
                });
            }
        }
    }

    render() {
        const {
            firstName, lastName, email, userWantsPromo, checkZIndex
        } = this.state;
        const { params } = this.props.navigation.state;
        const { navigate, goBack } = this.props.navigation;

        let isEditableEmail = true;
        if (params != undefined && params != null) {
            if (params.email != null && params.email != "") {
                isEditableEmail = false;
            }
        }

        return (
            <KeyboardAwareScrollView
                style={styles.container}
                enableOnAndroid={true} //eslint-disable-line
                enableAutoAutomaticScroll={(Platform.OS === 'ios')}
            >
                <View style={styles.main_container}>
                    <ScrollView  style={styles.scrollView} automaticallyAdjustContentInsets={true}>
                    <WhiteBackButton style={styles.closeButton} onPress={() => goBack()} />
                    
                    <View style={styles.lowOpacity}>
                        <Image
                            source={require('../../../../assets/get-started-white-outline.png')}
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
                                editable={isEditableEmail} selectTextOnFocus={isEditableEmail} 
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
                                onValueChange={(value) => this.onCountrySelected(value)}
                                style={{...pickerSelectStyles}}
                            >
                            </RNPickerSelect>
                        </View>
                        {
                            this.state.hasCountryState && (
                                <View style={styles.inputView}>
                                    <RNPickerSelect
                                        items={this.state.countryStates}
                                        placeholder={{
                                            label: 'State of Residence',
                                            value: 0
                                        }}
                                        onValueChange={(value) => {
                                            this.setState({
                                                countryState: value
                                            });
                                        }}
                                        style={{...pickerSelectStyles}}
                                    >
                                    </RNPickerSelect>
                                </View>
                            )
                        }
                        <View style={styles.finePrintView}>
                            <Text style={styles.finePrintText}>
                                I'd like to receive promotional communications, including discounts,
                                surveys and inspiration via email, SMS and phone.
                            </Text>

                            <View style={styles.switchContainer}>
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
                                    activeBackgroundColor="#DA7B61"
                                    inactiveBackgroundColor="#e4a193"
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
                                onPress={() => this.goToNextScreen()}>
                                <View style={styles.nextButton}>
                                    <Text style={styles.buttonText}>
                                        <FontAwesome>{Icons.arrowRight}</FontAwesome>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const pickerSelectStyles = {
    inputIOS: {
        height: 50,
        fontSize: 17,
        paddingLeft: 20,
        paddingTop: 13,
        paddingRight: 10,
        paddingBottom: 12,
        color: '#fff',
        fontFamily: 'FuturaStd-Light'
    },

    icon : {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 7.5,
        borderTopColor: '#fff',
        borderRightWidth: 7.5,
        borderRightColor: 'transparent',
        borderLeftWidth: 7.5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 12,
    },

	placeholderColor: '#fff',

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
    },
    icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: 'white',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};

let mapStateToProps = (state) => {
    return {
        countries: state.country.countries
    };
}

export default connect(mapStateToProps)(CreateAccount);
// export default CreateAccount;
