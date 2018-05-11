import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,ProgressBarAndroid,
    Keyboard,ListView,Button,ScrollView,TextInput,Dimensions,FlatList
    } from 'react-native';

import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import WhiteBackButton from '../../atoms/WhiteBackButton';
import CardView from 'react-native-cardview'

import styles from './styles';
const data = [
  {key : 'A'},{key : 'B'},{key : 'C'},{key : 'D'},{key : 'E'},{key : 'F'}
];
const numColumns = 6;
const ds = new ListView.DataSource({rowHasChanged:(row1,row2)=> row1 != row2});

class Property extends Component {

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

    constructor(){
        super();
        this.onClose = this.onClose.bind(this);
        this.state = {
            dataSource:ds.cloneWithRows([
                {
                    name:"Check-In Time",
                    time:"2PM - 10PM",
                },{
                    name:"Check-Out Time",
                    time:"12PM(noon)",
                }
            ]),
        }
    }

    onClose() {
        this.props.navigation.goBack();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <WhiteBackButton style={styles.WhiteBackButton} onPress={this.onClose}/>
                    <View style={styles.body}>
                        <Image style={styles.logoImage} source = {require('../../../assets/temple/overview.jpg')} />
                        <View style={styles.titleView}>
                        </View>
                        <Text style={styles.normalText}>In the historic quarter of Santo Spirito,on the left bank of the ricer Arno,studio apartment is perfect for those traveling alone or as a couple.To walk berween Santo Spirito,Pante Vecchio and Babali Gardens is a magical experience.</Text>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View>
                        <Text style={styles.footerText}>85$ /per night</Text>
                        <Text style={styles.footerText}>0.56LOC/per night</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.ButtonView}>
                            <Text style={styles.ButtonText}>Check Availability</Text>
                        </View>
                    </TouchableOpacity>
                  </View>
              </View>
        );
    }
}

export default Property;
