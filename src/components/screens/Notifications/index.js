import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import GoBack from '../../atoms/GoBack';
import Switch from 'react-native-customisable-switch';

class Notifications extends Component {
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
           
                <TouchableOpacity  onPress={() => navigate('PROFILE')}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-black.png')}/>
                </TouchableOpacity>

        
                    <View><Text style={styles.titleText}>Notifications</Text></View>

        </View>

        <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>

            <View>

                <TouchableOpacity style={styles.navItem}>
                   <View>
                    <Text style={styles.navItemText}>Messages</Text>
                    <Text style={styles.navText}>Recieves messages from holtels and Guests</Text>
                   </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navItemText}>Email</Text>
                    
                    <Switch style={styles.navIcon}
                                
                                
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

                </TouchableOpacity>


                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navItemText}>Text Message</Text>
                            <Switch style={styles.navIcon}
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
                </TouchableOpacity>


                <TouchableOpacity style={styles.navItem}>
                   
                    
                  <Text style={styles.navItemText}>Push Notifications{"\n"}<Text style={styles.navText}> To your mobile or tablet device </Text></Text>
               
                    <Switch style={styles.navIcon}
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
                
                </TouchableOpacity>


                <TouchableOpacity style={styles.navItem}>
                   <View>
                    <Text style={styles.navItemText}>Reminder & Text</Text>
                    <Text style={styles.navText}>Recieve reminders,helpful tips to improve your trip and other messages related to your activites on lockChain</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navItemText}>Email</Text>
                            <Switch style={styles.navIcon}
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
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navItemText}>Text Message</Text>
                            <Switch style={styles.navIcon}
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
                </TouchableOpacity>


                <TouchableOpacity style={styles.navItem}>
                   
                    
                  <Text style={styles.navItemText}>Push Notifications{"\n"}<Text style={styles.navText}> To your mobile or tablet device </Text></Text>
               
                    <Switch style={styles.navIcon}
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
                
                </TouchableOpacity>

            </View>
        </ScrollView>
      </View>
    );
  }
}

Notifications.propTypes = {
  // start react-navigation props
  navigation: PropTypes.object.isRequired
};

export default Notifications;

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
        marginLeft:10,
        marginTop:20
    },
  text: {
    color: '#000'
  },
  cardBox: {
    backgroundColor: '#da7b60',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 15
  },
  walletAddres: {
    color: '#fff',
    fontFamily: 'FuturaStd-Light',
    fontSize: 11.5,
    margin: 20,
    marginTop: 10,
    marginBottom: 30
  },
  logo: {
      width: 80,
      height: 55,
      borderRadius: 10,
      marginLeft: 10
  },
  logoBackground: {
      position: 'absolute',
      bottom: -5,
      left: -35,
      opacity: 0.1,
      width: '60%',
      height: '60%'
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
   
  balanceLabel: {
      fontSize: 10,
      color: '#fff',
      marginLeft: 20,
      fontFamily: 'FuturaStd-Light'
  },
  balanceText: {
      fontSize: 20,
      color: '#fff',
      marginLeft: 20,
      fontFamily: 'FuturaStd-Light'
  },
  addMore: {
      position: 'absolute',
      bottom: 15,
      right: 20,
      width: 43,
      height: 43,
      borderRadius: 50,
      backgroundColor: '#213742',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  addMorePlus: {
      color: '#fff',
      fontSize: 16
  },
  copyBox: {
      backgroundColor: '#fff',
      marginLeft: 40,
      marginRight: 40,
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
  },
  copyText: {
      fontFamily: 'FuturaStd-Light',
      fontSize: 13,
      color: '#000'
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
  navIcon: {
    width: 20,
    height: 23
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
  navCurrency: {
      color: '#da7b60',
      fontFamily: 'FuturaStd-Light',
      fontSize: 18
  }
});
