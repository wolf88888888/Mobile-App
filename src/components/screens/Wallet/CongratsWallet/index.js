import React, { Component } from 'react';
import {
    Text,
    View,
    StatusBar   
} from 'react-native';
import { 
    NavigationActions, 
    StackActions 
} from 'react-navigation';
import {BackHandler} from 'react-native';
import Image from 'react-native-remote-svg';
import styles from './styles';
import Button from '../../../atoms/Button';

class CongratsWallet extends Component {

    constructor(props) {
        super(props)
        this.gotoRoot = this.gotoRoot.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
  
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
  
    onBackPress = () => {
        return true;
    };

    gotoRoot() {
		this.props.navigation.pop(4);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="light-content"
                />
                <View style={styles.main}>
                    <Image
                        source={require('../../../../assets/walletCongrats.png')}
                        style={styles.walletCongratsImage} />
                    <Text style={styles.bigTitle}>Congratulations!</Text>
                    <Text style={styles.subTitle}>Your LOC Wallet Has Been Created</Text>
                    <View style={styles.gotoButtonContainer}>
                        <Button wrapStyle={{backgroundColor: '#223843', width:'90%'}} onPress={this.gotoRoot} text="Done" />
                    </View>
                </View>
            </View>
        );
    }
}

export default CongratsWallet;
