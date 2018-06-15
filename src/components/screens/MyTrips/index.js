import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import styles from './styles';
import DialogProgress from 'react-native-dialog-progress'
import Requester, { getMyHotelBookings, getUserInfo } from '../../../utils/requester';
import { domainPrefix,imgHost } from '../../../config';
import moment from 'moment';
import Dash from 'react-native-dash';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class MyTrips extends Component {
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

    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                 
                   <View style={styles.chatToolbar}>
                                    <TouchableOpacity onPress={this.onBackPress}>
                                        <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-white.png')}/>
                                    </TouchableOpacity>

                                    <Text style={styles.title}>Your Trip</Text>
                                   
                                  
                     </View>


                
            <View>
               <FlatList style={styles.flatList}
                data="none"
                renderItem={
                    ({item}) =>
                        <View style={styles.Listcontainer} >
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.img_round}><Text style={styles.innertext}>25</Text><Text style={{color:'#fff'}}>jan</Text></View>
                                               
                                <View style={styles.flatList}> 
                                    <View>
                                        <Text style={styles.subtext}>2:00pm</Text>
                                        <Text style={styles.subtitle}>Check into Garden Loft Apartment</Text> 
                                    </View>


                                    <View style={styles.imageViewWrapper}>

                                    <View style={styles.placeholderImageView}>
                                        <Image
                                            style={styles.placeholderImage}
                                            source={require('../../../assets/apartment.png')}
                                        />
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                   
                                        <View>
                                           <Text style={styles.subtext}>Bargo Pinti 50121</Text>
                                           <Text style={styles.subtext}>Firenze Italy</Text>
                                        </View>
                                        <View>
                                           <Image style={styles.senderImage} source={require('../../../../src/assets/icons/senderImages.png')}/>
                                        </View>
                                    </View>
                                    </View>

                                </View>
                            </View>
                        </View> 

                        }
                    />
            </View>
               
            </View>
        )
    }
    onStartExploring = () =>{
        const options = {
            title:"",
            message:"Loading Message...",
            isCancelable:true
        };
        DialogProgress.show(options);

        //Here we will load trips
        getMyHotelBookings()
        .then(res => res.response.json())
        .then(parsed => {
            DialogProgress.hide();
            if (parsed.content.length > 0) {
                this.props.navigation.navigate('UserMyTrips', {trips:parsed.content});
            }
            else {
                this.props.navigation.navigate('EXPLORE');
            }
        })
        .catch(err => {
            DialogProgress.hide();
            ToastAndroid.showWithGravityAndOffset('Cannot get My Trips Info, Please check network connection.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200);
            console.log(err);
        });
        //this.props.navigation.navigate('EXPLORE');
    }
    onBackPress = () => {
        this.props.navigation.navigate('EXPLORE');
    }
}


export default MyTrips;
