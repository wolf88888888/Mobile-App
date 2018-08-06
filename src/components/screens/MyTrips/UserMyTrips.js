import { BackHandler, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';
import { domainPrefix, imgHost } from '../../../config';

import BackButton from '../../atoms/BackButton';
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
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        console.log('back pressed---')
        this.props.navigation.goBack();
        this.props.navigation.state.params.gotoBooking();
        return true;
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
                    console.log('My trips----', data);
                    console.log('ASD');
                    var tempArr = []
                    tempArr = this.state.trips.concat(data.content)
                    tempArr = _.orderBy(tempArr, ['arrival_date'], ['desc']);
                    // _.remove(tripArray, function(obj) {
                    //     var tripDate = moment(obj.arrival_date).utc();
                    //     var now = moment().utc();
                    //     return tripDate < now;
                    // });
                    this.setState({
                        trips: tempArr,
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

    render() {
        const { navigate } = this.props.navigation;

        let imageAvatar = '';
        if (this.state.image != '') {
            imageAvatar = { uri: imgHost + this.state.userImageUrl }
        }
        return (
            <View style={styles.container}>
                <View style={styles.chatToolbar}>
                    <BackButton onPress={this.onBackPress} />

                    <Text style={styles.title}>Your Trips</Text>
                </View>

                <FlatList
                    style={styles.flatList}
                    data={this.state.trips}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.5}
                    renderItem={
                        ({ item }) =>
                            <View style={styles.flatListMainView}>
                                <View>
                                    <View style={styles.img_round}>
                                        <Text style={styles.img_round_text}>
                                            {(moment(item.arrival_date)).format("DD").toString()}
                                            {"\n"}
                                            {(moment(item.arrival_date)).format("MMM").toString()}
                                        </Text>
                                    </View>
                                    <Dash dashColor='#dedede' dashStyle={{ borderRadius: 80, overflow: 'hidden' }} style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }} />
                                </View>
                                <View style={styles.flatListDataView}>
                                    <View style={styles.flatListTitleView}>
                                        <Text style={styles.subtext1}>
                                            {(moment(item.arrival_date)).format('ddd, DD MMM').toString()}
                                            {" "}<FontAwesome>{Icons.longArrowRight}</FontAwesome>{" "}
                                            {(moment(item.arrival_date).add(item.nights, 'day')).format('ddd, DD MMM').toString()}
                                        </Text>

                                        <Text style={styles.subtitle}>Check into {item.hotel_name}</Text>
                                    </View>

                                    <Image
                                        style={styles.hotelImage}
                                        source={{ uri: imgHost + JSON.parse(item.hotel_photo).thumbnail }}
                                    />
                                    <View style={styles.flatListBottomView}>
                                        <View style={styles.flatListUserProfileView}>
                                            <Image style={styles.senderImage} source={imageAvatar} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                    }
                />
            </View>
        )
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        this.props.navigation.state.params.gotoBooking();
    }
}


export default UserMyTrips;
