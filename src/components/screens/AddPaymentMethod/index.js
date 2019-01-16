import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import Toast from 'react-native-easy-toast';
import styles from './styles';
import { userInstance } from '../../../utils/userInstance';

class AddPaymentMethod extends Component {
    state = {
        walletAddress: ''
    }
    constructor(props) {
        super(props);
    }   
   
    async componentDidMount() {
        let walletAddress = await userInstance.getLocAddress();
        if (walletAddress !== null && walletAddress !== '') {
            this.setState({
                walletAddress: walletAddress,
            });
        }
    }

  
    createWallet = () => {
        const {navigate} = this.props.navigation;

        console.log("walletAddress", this.state.walletAddress);
        if (this.state.walletAddress != '') {
            this.refs.toast.show('You already created LOC wallet.', 1500);
            return;
        }
        navigate("CreateWallet");
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>

            <View style={styles.backButton}>
                <TouchableOpacity  onPress={() => navigate('PaymentMethods')}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-black.png')}/>
                </TouchableOpacity>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>

                <View>

                    <TouchableOpacity style={styles.navItem}>
                        <View>
                            <Text style={styles.navItemText}>Pay with</Text>
                            <Text style={styles.navText}>Choose your payment method</Text>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.navItem} onPress={() => navigate('CreditCard')}>
                        <View style={styles.listItem}>
                            <View>
                            <Image style={styles.leftIcon} source={require('../../../../src/assets/svg/credit-card.svg')}/>
                            </View>
                            <Text style={styles.listItemText}>Credit Card</Text>
                        </View>
                        
                        <View>
                            <Image source={require('../../../../src/assets/svg/next.svg')} style={styles.arrowSvg}/>
                        </View>
    
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.navItem} onPress={this.createWallet}>
                        <View style={styles.listItem}>
                            <View>
                            <Image source={require('../../../../src/assets/svg/loc.svg')} style={styles.leftIcon}/>
                            </View>
                            <Text style={styles.listItemText}>LOC</Text>
                        </View>
                    
                        <View>
                            <Image source={require('../../../../src/assets/svg/next.svg')} style={styles.arrowSvg}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
                    
            <Toast
                ref="toast"
                style={{ backgroundColor: '#DA7B61' }}
                position='bottom'
                positionValue={150}
                fadeInDuration={500}
                fadeOutDuration={500}
                opacity={1.0}
                textStyle={{ color: 'white', fontFamily: 'FuturaStd-Light' }}
            />
        </View>
        );
    }
}

AddPaymentMethod.propTypes = {
    // start react-navigation props
    navigation: PropTypes.object.isRequired
};

export default AddPaymentMethod;
