import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import GoBack from '../../atoms/GoBack';
import Switch from 'react-native-customisable-switch';

class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
    }
  }   
   

  componentDidMount() {
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
           
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => navigate('PROFILE')}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-black.png')}/>
                </TouchableOpacity>
                <View><Text style={styles.titleText}>Payment Methods</Text></View>

            </View>

            <View style={styles.subHeading}>
                <Text style={styles.navItemText}>Set Up a Payment Method</Text>
                <Text style={styles.navText}>Use your payment methods to make a purchage on lockChain</Text>
            </View>
            <TouchableOpacity style={styles.ButtonView} onPress={() => navigate('AddPaymentMethod')}>
                <View>
                  <Text style={styles.ButtonText}>Add Payment Methods</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
  }
}

PaymentMethods.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default PaymentMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
   // alignItems: 'center',
    backgroundColor: '#f0f1f3'
  },
 heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 15,
        marginLeft:10
    },
     subHeading: {
        //display: 'flex',
       // flexDirection: 'row',
      //  justifyContent: 'flex-start',
        //width: '100%',
        padding: 15,
        marginLeft:10,
        marginTop:10
    },
    text: {
       color: '#000'
    },
    titleText: {
            color: '#000',
            fontSize: 22,
            fontFamily: 'FuturaStd-Light',
            marginLeft:20
        },  

  titleView: {
        display: 'flex',
        width: '100%',
        marginTop: 26
    },
    btn_backImage:{
        height: 28,
        width: 28,
      },
    navItem: {
      borderBottomWidth: 0.5,
      borderColor: '#e2e4e3',
      padding: 10,
      paddingBottom: 20,
      paddingTop: 20,
      marginLeft: 10,
      marginRight: 10,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
      navItemText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 21,
        color:'#000'
      },
      navText:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
      },
   ButtonView: {
        backgroundColor: '#DA7B61',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //margin: 5,
       //  marginLeft:10,
        width: 180,
       // padding: 15,
        marginLeft:20,
        marginTop:10
    },

    ButtonText: {
        color: '#fff',
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        padding: 14,
       // alignItems: 'center'
    }
});
