import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { validateEmail, validateName, validateCardExpiry, validateCVV, validateCardNumber } from '../../../utils/validation';

import GoBack from '../../atoms/GoBack';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import SmartInput from '../../atoms/SmartInput';
import SmartInputCreditCard from '../../atoms/SmartInput/creditcard';
import SmartInputDate from '../../atoms/SmartInput/date';
import Switch from 'react-native-customisable-switch';
import { TextInputMask } from 'react-native-masked-text';
import { Header } from 'react-navigation';

const styles = StyleSheet.create({
    container: {
        flex:1,
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
        color: '#ffffff',
        fontSize: 22,
        fontFamily: 'Futura',
    },

    inputView: {
        width: '100%',
        marginTop: 0,
        paddingLeft: 18,
        paddingRight: 18
    },
     titleHalfView: {
        display: 'flex',
        width: '100%',
        marginTop: 16,
        marginBottom: 16
    },
     inputhalfView: {
        width: '50%',
        margin: 11.5,
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
    },
    nextButton: {
        margin: 15,
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
        marginTop: 45,
        marginLeft: 15,
        marginBottom: 15
      }
});


class CreditCard extends Component {
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
            CardNumber:'',
            MY: '',
            CVV: '',
            userWantsPromo: true,
            checkZIndex: 1 // zIndex of switchCheckView
        };
        this.animationTime = 150; // time for switch to slide from one end to the other
    }

    onChangeHandler(property) {
        //console.log('property>>>>>>>>>>>>>>wwwwwwwwww',property)
        return (value) => {
            this.setState({ [property]: value });
            console.log('property>>>>>>>>>>>>>>',value)
        };
    }
     onClickSave() {
        const { CardHolder, CardNumber,MY,CVV } = this.state;
        const user = {CardHolder, CardNumber,MY,CVV};

        // SaveCard(user, null).then((res) => {
        //     if (res.success) {
        //         res.response.json().then((data) => {

        //         });
        //     } else {
        //         res.response.then((response) => {
        //             const { errors } = response;
        //             Object.keys(errors).forEach((key) => {
        //                 if (typeof key !== 'function') {
        //                     console.log('Error saving card:', errors[key].message);
        //                 }
        //             });
        //         });
        //     }
        // });
    }

    render() {
        const {
            CardHolder,CardNumber, MY, CVV
        } = this.state;
        const { navigate } = this.props.navigation;

        return (
            
            <View style={styles.container}>

                <ScrollView>
                    <KeyboardAvoidingView keyboardVerticalOffset={-20} behavior="position" enabled>
                    <TouchableOpacity  onPress={() => navigate('AddPaymentMethod')}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-white.png')}/>
                </TouchableOpacity>
                    <View style={styles.main}>
                    <View style={styles.titleView}><Text style={styles.maintitleText}>Card Holder</Text></View>
                    <View style={styles.inputView}>
                        <SmartInput
                            value={CardHolder}
                            autoCorrect={false}
                            placeholder="Card Holder"
                            placeholderTextColor="#fff"
                            onChangeText={this.onChangeHandler('CardHolder')}
                            rightIcon={validateName(CardHolder) ? 'check' : null}
                        />
                    </View>
                   <View style={styles.titleView}><Text style={styles.maintitleText}>Credit Card Details</Text></View>
                     <View style={styles.titleView}><Text style={styles.titleText}>Card Number</Text></View>

                    
                    <View style={styles.inputView}>

                        <SmartInputCreditCard
                            value={CardNumber}
                            keyboardType="numeric"
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={19}
                            placeholder="0000-0000-0000-0000"
                            placeholderTextColor="#fff"
                            onChangeText={this.onChangeHandler('CardNumber')}
                            rightIcon={validateCardNumber(CardNumber) ? 'check' : null}
                        />
                    </View>
                    <View style={{flexDirection: 'row',marginLeft: 30, marginRight: 30}}>
                      
                            <View style={styles.inputhalfView}>
                             <View style={styles.titleHalfView}><Text style={styles.titleText}>Expiration Date</Text></View>
                                <SmartInputDate
                                    value={MY}
                                    keyboardType="numeric"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    maxLength={5}
                                    placeholder="M/Y"
                                    placeholderTextColor="#fff" 
                                    onChangeText={this.onChangeHandler('MY')}
                                    rightIcon={validateCardExpiry(MY) ? 'check' : null}
                                />
                            </View>
                        
                            <View style={styles.inputhalfView}>   
                            <View style={styles.titleHalfView}><Text style={styles.titleText}>CVV Code</Text></View>          
                                <SmartInput
                                   value={CVV}
                                    keyboardType="numeric"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    maxLength={3}
                                    placeholder="123"
                                    placeholderTextColor="#fff"
                                    onChangeText={this.onChangeHandler('CVV')}
                                    rightIcon={validateCVV(CVV) ? 'check' : null}
                                />
                            </View>
                    </View>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                
                    <View style={styles.nextButtonView}>
                       
                            <View style={styles.nextButton}>
                                <TouchableOpacity
                                    disabled={!CardHolder ||!CardNumber || !CVV || !MY}
                                    onPress={() => this.onClickSave()}
                                >
                                    <Text style={styles.buttonText}>
                                        <FontAwesome>{Icons.arrowRight}</FontAwesome>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                {/* <View style={styles.main}>
                    
                </View> */}
                </View>
        );
    }
}

export default CreditCard;
