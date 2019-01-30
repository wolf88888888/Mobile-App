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
import lang from '../../../language/';

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
        let pageNumber = this.state.page + 1
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

    calcItemData(item) {
        let invalidData = false;
        let hotelImageURL = null;
        let error; // {debug:String, error:Object}
        let imageAvatar = '';

        // check if data is valid
        if (item && item.item && item.item.hotel_photo) {
            try {
                let photoJSONData = item.item.hotel_photo;
                const thumb =  JSON.parse(photoJSONData).thumbnail;
                hotelImageURL = `${imgHost}${thumb}`;
                if (this.state.image != '') {
                    imageAvatar = { uri: imgHost + this.state.userImageUrl }
                }
            } catch (err) {
                error = {
                    debug: 'Error in parsing hotel image thumbnail or getting avatar url from state.',
                    error: err
                };
                invalidData = true;
            }
        } else {
            invalidData = true;
            error = {
                debug: 'Error in hotel data object from server - item/item.item/item.hotel_photo is null',
                error: {}
            }
        }

        // if invalid hotel data
        if (invalidData) {
            console.warn('Error in hotel item data',{error,hotelData:item})
        }

        const day = (moment(item.arrival_date)).format("DD").toString();
        const month = (moment(item.arrival_date)).format("MMM").toString();
        const dateInCircle = `${day}\n${month}`;

        const dateFrom = (moment(item.arrival_date)).format('ddd, DD MMM').toString();
        const dateTo = (moment(item.arrival_date).add(item.nights, 'day')).format('ddd, DD MMM').toString();
        const arrow = (<FontAwesome>{Icons.longArrowRight}</FontAwesome>);

        return {
            hotelImageURL,
            imageAvatar,
            dateInCircle,
            dateFrom,
            dateTo,
            arrow
        }
    }

    calcBookingStatusAndRefNo(item) {
        let status;
        let refNo;

        try {
            status = item.item.status;
            refNo = item.item.booking_id;
        } catch(err) {
            console.warn('Error while getting My Trips -> booking -> (status or reference no) ', {error:err});
            status = '';
        }

        return {
            refNo,
            status
        }
    }

    renderBookingStatusAndRefNo(item) {
        const {refNo,status} = this.calcBookingStatusAndRefNo(item);

        let txtStatus = <Text style={styles.textBookingStatus}>{`${lang.TEXT.MY_TRIPS_BOOKING_STATUS}: ${lang.SERVER.BOOKING_STATUS[status]}`}</Text>;
        let txtRefNo = <Text style={styles.textBookingId}>{`${lang.TEXT.MY_TRIPS_BOOKING_REF_NO}: ${refNo}`}</Text>

        let result;

        
        if (status == '' || status == null || status == 'PENDING_SAFECHARGE_CONFIRMATION') {
        // In this case no info should be shown
            result = (
                <View
                    testID={'renderBookingStatus'}
                    style={styles.hotelBookingStatusContainer}
                ><Text>{'status null'}</Text></View>
            );
        } else if (status && status == 'COMPLETE') {
            result = (
                <View 
                    testID={'renderBookingStatus'}
                    style={styles.hotelBookingStatusContainer}
                >
                    {txtStatus}
                    {txtRefNo}
                </View>
            );
        } else {
            result = (
                <View 
                    testID={'renderBookingStatus'}
                    style={styles.hotelBookingStatusContainer}
                >
                    {txtStatus}
                </View>
            );
        }
        return result;
    }

    renderHotelImage(hotelImageURL) {
        let result;

        if (hotelImageURL == null) {
            result = (
                <View 
                    style={styles.hotelImageContainerNoImage}
                    testID={'blankImageContainer'}
                >
                    {/* <View style={styles.hotelImageNoImage}> */}
                        <Text style={styles.txtHotelNoImage}>{lang.TEXT.MYTRIPS_NO_IMAGE}</Text>
                    {/* </View> */}
                </View>
            )
        } else {
            result = (
                <View 
                    style={styles.hotelImageContainer}
                    testID={'imageContainer'}
                >
                    <Image
                        style={styles.hotelImage}
                        source={{ uri: hotelImageURL }}
                    />
                </View>
            );
        }

        return result;
    }
    
    renderItem(item) {
        const {hotelImageURL,imageAvatar,dateInCircle,dateFrom,dateTo,arrow} = this.calcItemData(item);

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
                    
                    { this.renderHotelImage             (hotelImageURL) }
                    { this.renderBookingStatusAndRefNo  (item)          }

                    <View style={styles.flatListBottomView}>
                        <View style={styles.flatListUserProfileView}>
                            <Image style={styles.senderImage} source={imageAvatar} />
                        </View>
                    </View>
                    <View style={styles.itemSeparator}/>
                </View>
            </View>
        )
    }

    render() {
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
