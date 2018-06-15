import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import { connect } from 'react-redux';

class AddPaymentMethod extends Component {
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

                <TouchableOpacity style={styles.navItem} onPress={() => navigate('CreditCard')}>
                    <View style={styles.listItem}>
                        <View>
                           <Image style={styles.arrowSvg} source={require('../../../../src/assets/svg/credit-card.svg')}/>
                        </View>
                        <Text style={styles.listItemText}>Credit Card</Text>
                    </View>
                    
                    <View>
                        <Image source={require('../../../../src/assets/svg/next.svg')} style={styles.arrowSvg}/>
                    </View>
 
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <View style={styles.listItem}>
                        <View>
                           <Image source={require('../../../../src/assets/svg/loc.svg')} style={styles.arrowSvg}/>
                        </View>
                        <Text style={styles.listItemText}>LOC</Text>
                    </View>
                   
                    <View>
                        <Image source={require('../../../../src/assets/svg/next.svg')} style={styles.arrowSvg}/>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
      </View>
    );
  }
}

AddPaymentMethod.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default AddPaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f1f3'
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 20,
        marginLeft:10
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
  listItemText:{
    fontFamily: 'FuturaStd-Light',
    fontSize: 21,
    marginLeft:20,
    color:'#000'
},
  navText:{
    fontFamily: 'FuturaStd-Light',
    fontSize: 15,
  },

  listItem:{flex:1,
    flexDirection:'row',
    justifyContent:'flex-start'
},
  arrowSvg:{
    height: 25,
    width: 25
  }
});
