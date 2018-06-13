import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
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
            isLoading: true,
            myTripsExist : false,
            trips : [],
            userImageUrl : ''
        };

        getMyHotelBookings()
        .then(res => res.response.json())
        .then(parsed => {
            this.setState({
                trips : parsed.content,
            });
            this.setState({isLoading: false})
            parsed.content.length > 0 ? this.setState({myTripsExist: true}) : this.setState({myTripsExist: false})
        })
        .catch(err => {
            this.setState({isLoading: false})
            console.log(err);
        });

        getUserInfo()
        .then(res => res.response.json())
        .then(parsed => {
            this.setState({
                userImageUrl : parsed.image,
            });
        })
        .catch(err => {
            //if error arises in getting user info
            console.log(err);
        });
    }

    componentDidMount() {
    }

    renderMainView(){
        return(
            <View style={styles.container}>
                <View style={styles.placeholderImageView}>
                    <Image
                        style={styles.placeholderImage}
                        source={require('../../../assets/placeholder_mytrips.png')}
                    />
                </View>
                <Text style={styles.title}>You have no upcoming trips</Text>
                <Text style={styles.subtext}>Discover your next experience</Text>
                <TouchableOpacity onPress={this.onStartExploring} style={styles.buttonExplore}>
                    <Text style={styles.exploreBtnText}>Start Exploring</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderMyTrips(){
        return(
            <View style={styles.container}>
                <View style={styles.chatToolbar}>
                    
                    <TouchableOpacity onPress={this.onBackPress}>
                        <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-black.png')}/>
                    </TouchableOpacity>
                    
                    <Text style={styles.title}>Upcoming Trips</Text>
                
                </View>
            
                <FlatList 
                
                style={styles.flatList}
                
                data={this.state.trips}
                
                renderItem={
                    ({item}) =>       
                        
                        <View style={styles.flatListMainView}>

                            <View>
                            
                            <View style={styles.img_round}>
                            
                                <Text style={styles.img_round_text}>
                                    {(moment(item.arrival_date)).format("DD").toString()}
                                    {"\n"}
                                    {(moment(item.arrival_date)).format("MMM").toString()}
                                </Text>

                                
                            
                            </View>   
                            <Dash dashColor='#cc8068' dashStyle={{borderRadius: 100, overflow: 'hidden'}} style={{flex: 1, flexDirection:'column',alignItems: 'center',justifyContent: 'flex-end'}}/>
                            </View>                                             
                            
                            <View style={styles.flatListDataView}> 
                              
                                <View style={styles.flatListTitleView}>
                              
                                    <Text style={styles.subtext}>
                                        {(moment(item.arrival_date)).format('ddd, DD MMM').toString()}
                                        {"   "}<FontAwesome>{Icons.longArrowRight}</FontAwesome>{"  "}
                                        {(moment(item.arrival_date).add(item.nights, 'day')).format('ddd, DD MMM').toString()}
                                    </Text>
                              
                                    <Text style={styles.subtitle}>Check into {item.hotel_name}</Text> 
                              
                                </View>
                              
                                    <Image
                                        style={styles.hotelImage}
                                        source={{uri : imgHost + JSON.parse(item.hotel_photo).thumbnail}}
                                    />
                              
                                <View style={styles.flatListBottomView}>
                                    
                                    <Text style={styles.hoteltext}>Dummy Address{"\n"}Dummy City</Text>
                              
                                    <View style={styles.flatListUserProfileView}>
                              
                                        <Image style={styles.senderImage} source={{uri : this.state.userImageUrl}}/>
                              
                                    </View>
                              
                                </View>
                            
                            </View>
                        
                        </View> 
                        }
                    />
            </View>
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {!this.state.isLoading && this.state.myTripsExist && this.renderMyTrips()}
                {!this.state.isLoading && !this.state.myTripsExist && this.renderMainView()}
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
}


export default MyTrips;
