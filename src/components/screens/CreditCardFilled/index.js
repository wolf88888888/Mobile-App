import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { validateEmail, validateName } from '../../../utils/validation';

import GoBack from '../../atoms/GoBack';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import SmartInput from '../../atoms/SmartInput';
import Switch from 'react-native-customisable-switch';

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
        fontSize: 18,
        fontFamily: 'FuturaStd-Light'
    },
    maintitleText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'FuturaStd-Light'
    },

    inputView: {
        width: '100%',
        margin: 11.5,
        paddingLeft: 18,
        paddingRight: 18
    },
     titleHalfView: {
        display: 'flex',
        width: '100%',
        marginTop: 16,
        marginLeft: 16,
        marginBottom: 16
    },
     inputhalfView: {
        width: '50%',
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
    },
    btn_backImage:{
        height: 28,
        width: 28,
        marginTop: 44,
        marginLeft: 16,
        marginBottom: 16
      }
});


class CreditCardFilled extends Component {
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
            CardHolder: '',
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
            firstname, lastName, email, userWantsPromo, checkZIndex
        } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-white.png')}/>
                </TouchableOpacity>

                <View style={styles.main}>
                    <View style={styles.titleView}><Text style={styles.maintitleText}>Card Holder</Text></View>

                    <View style={styles.inputView}>
                        <SmartInput
                            autoCorrect={false}
                            placeholder="Card Holder"
                            placeholderTextColor="#fff"
                        />
                    </View>
                   <View style={styles.titleView}><Text style={styles.maintitleText}>Credit Card Details</Text></View>
                     <View style={styles.titleView}><Text style={styles.titleText}>Card Number</Text></View>
                    <View style={styles.inputView}>
                    
                        <SmartInput
                            keyboardType="numeric"
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={16}
                            placeholder="0000-0000-0000-0000"
                            placeholderTextColor="#fff"
                        />
                    </View>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                      
                            <View style={styles.inputhalfView}>
                             <View style={styles.titleHalfView}><Text style={styles.titleText}>Expiration Date</Text></View>
                                <SmartInput
                                 
                                    keyboardType="numeric"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    
                                    placeholder="M/Y"
                                    placeholderTextColor="#fff"
                                />
                            </View>
                        
                            <View style={styles.inputhalfView}>   
                            <View style={styles.titleHalfView}><Text style={styles.titleText}>CVV Code</Text></View>          
                                <SmartInput
                                   
                                    keyboardType="numeric"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    maxLength={3}
                                    placeholder="123"
                                    placeholderTextColor="#fff"
                                />
                            </View>
                    </View>


                        <View style={styles.nextButtonView}>
          
                                <View style={styles.nextButton}>
                                    <Text style={styles.buttonText}>
                                        <FontAwesome>{Icons.arrowRight}</FontAwesome>
                                    </Text>
                                </View>
                            
                    </View>

                  {/*  <View style={styles.lowOpacity}>
                        <Image
                            source={require('../../../assets/get-started-white-outline.svg')}
                            style={styles.getStartedImage}
                        />
                    </View>*/}
                </View>
            </View>
        );
    }
}

export default CreditCardFilled;
