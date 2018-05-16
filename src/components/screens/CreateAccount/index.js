import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Switch from 'react-native-customisable-switch';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';
import { validateEmail, validateName } from '../../../utils/validation';
import GoBack from '../../atoms/GoBack';
import SmartInput from '../../atoms/SmartInput';


// TODO: move styles in a saparate file
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DA7B61'
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleView: {
        display: 'flex',
        width: '100%',
        marginTop: 16,
        marginLeft: 36,
        marginBottom: 16
    },
    titleText: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'FuturaStd-Light'
    },
    inputView: {
        width: '100%',
        margin: 11.5,
        paddingLeft: 18,
        paddingRight: 18
    },
    finePrintView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 18
    },
    finePrintText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'FuturaStd-Light',
        maxWidth: 280
    },
    switchCheckView: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    switchCheckText: {
        color: '#DA7B61',
        fontSize: 10.5
    },
    nextButtonView: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        paddingRight: 18,
        marginTop: 36
    },
    nextButton: {
        height: 50,
        width: 50,
        backgroundColor: '#273842',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 2,
        paddingBottom: 2
    },
    buttonText: {
        color: '#fff',
        fontSize: 17
    },
    lowOpacity: {
        opacity: 0.3
    },
    getStartedImage: {
        width: 400,
        height: 80
    }
});


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
            firstName, lastName, email, userWantsPromo, checkZIndex
        } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <GoBack
                    onPress={() => navigate('Welcome')}
                    icon="arrowLeft"
                />

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

                    <View style={styles.finePrintView}>
                        <Text style={styles.finePrintText}>
                        I'd like to receive promotional communications, including discounts,
                        surveys and inspiration via email, SMS and phone.
                        </Text>
                        <View>
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
                                firstName, lastName, email, userWantsPromo
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

                <View style={styles.lowOpacity}>
                    <Image
                        source={require('../../../assets/get-started-white-outline.svg')}
                        style={styles.getStartedImage}
                    />
                </View>
            </View>
        );
    }
}

export default CreateAccount;
