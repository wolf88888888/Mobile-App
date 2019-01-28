import { BackHandler, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';
import { domainPrefix, imgHost } from '../../../config';

import Dash from 'react-native-dash';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import requester from '../../../initDependencies';
import { userInstance } from '../../../utils/userInstance';
import styles from './styles';

class UserMyTrips extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => { }
        }
    }

    constructor(props) {
        super(props);
        console.log(props.navigation.state);
        //State
        this.state = {
            trips: props.navigation.state.params.trips.content,
            isLast: props.navigation.state.params.trips.last,
            page: 0,
            userImageUrl: '',
            isLoading: false,
        };
        this.onEndReached = this.onEndReached.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.renderHotelImage = this.renderHotelImage.bind(this)
    }

    async componentDidMount() {
        //Loading user info for user image
        let profileImage = await userInstance.getProfileImage();
        this.setState({
            userImageUrl: profileImage==null? '' : profileImage,
        });
    }

    onEndReached() {
        console.log('reached to end');
        pageNumber = this.state.page + 1
        if (!this.state.isLast && !this.state.isLoading) {
            this.setState({ isLoading: true })
            requester.getMyHotelBookings([`page=${pageNumber}`]).then(res => {
                res.body.then(data => {
                    var tmpTrips = []
                    tmpTrips = this.state.trips.concat(data.content)
                    tmpTrips = _.orderBy(tmpTrips, ['arrival_date'], ['desc']);
                    this.setState({
                        trips: tmpTrips,
                        isLast: data.last,
                        page: pageNumber,
                        isLoading: false,
                    })

                }).catch(err => {
                    console.log(err);
                });
            });
        }
    }

    renderHotelImage(hotelImageURL) {
        console.log('@@[UserMyTrips]::renderHotelImage', {hotelImageURL});

        let result = (
            <Image
                style={styles.hotelImage}
                source={{ uri: hotelImageURL }}
            /> 
        );

        if (hotelImageURL == null) {
            result =<Text>{"No image"}</Text> 
        }

        return result;
    }
    
    renderItem(item) {
        console.log('@@[UserMyTrips]::renderItem', item);        

        let invalidData = false;
        let hotelImageURL;
        let error;
        let imageAvatar = '';

        // check if data is valid
        if (item && item.item && item.item.hotel_photo) {
            try {
                let jsonData = item.item.hotel_photo;
                const thumb =  JSON.parse(jsonData).thumbnail;
                hotelImageURL = `${imgHost}${thumb}`;
                if (this.state.image != '') {
                    imageAvatar = { uri: imgHost + this.state.userImageUrl }
                }
            } catch (err) {
                error = err;
                invalidData = true;
            }
        } else {
            invalidData = true;
            error = 'Error in hotel data object - item/item.item/item.hotel_photo is null';
        }

        // if invalid hotel data
        if (invalidData) {
            console.warn('Error in parsing hotel image thumbnail or getting avatar url from state.',{error,hotelData:item})
        }

        const day1 = (moment(item.arrival_date)).format("DD").toString();
        const month1 = (moment(item.arrival_date)).format("MMM").toString();
        const dateInCircle = `${day1}\n${month1}`;

        const dateFrom = (moment(item.arrival_date)).format('ddd, DD MMM').toString();
        const dateTo = (moment(item.arrival_date).add(item.nights, 'day')).format('ddd, DD MMM').toString();
        const arrow = (<FontAwesome>{Icons.longArrowRight}</FontAwesome>);

        return (
            <View style={styles.flatListMainView}>
                <View>
                    <View style={styles.img_round}>
                        <Text style={styles.img_round_text}>
                          {dateInCircle}
                        </Text>
                    </View>
                    <Dash dashColor='#dedede' dashStyle={{ borderRadius: 80, overflow: 'hidden' }} style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }} />
                </View>
                <View style={styles.flatListDataView}>
                    <View style={styles.flatListTitleView}>
                        <Text style={styles.subtext1}>
                            {dateFrom}{" "}{arrow}{" "}{dateTo}
                        </Text>
                        <Text style={styles.subtitle}>Check into {item.item.hotel_name}</Text>
                    </View>
                    <View style={{height:150}}>
                        { this.renderHotelImage(hotelImageURL)       }
                    </View>
                    <View style={styles.flatListBottomView}>
                        <View style={styles.flatListUserProfileView}>
                            <Image style={styles.senderImage} source={imageAvatar} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.log('@@[UserMyTrips]::render', {prop:this.props});

        const { navigate } = this.props.navigation;        

        return (
            <View style={styles.container}>
                <View style={styles.chatToolbar}>
                    <Text style={styles.title}>Your Trips</Text>
                </View>

                <FlatList
                    style={styles.flatList}
                    data={this.state.trips}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.5}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}


export default UserMyTrips;
