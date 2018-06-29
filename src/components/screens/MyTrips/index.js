import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Image, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import Requester, { getMyHotelBookings, getUserInfo } from '../../../utils/requester';
import { domainPrefix,imgHost } from '../../../config';
import moment from 'moment';
import _ from 'lodash';
import Dash from 'react-native-dash';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Toast from 'react-native-simple-toast';

import styles from './styles';

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
            showProgress:true,
            myTrips: [],
            hasPendingTrips: true,
        };
        this.onStartExploring();
    }
    
    hideProgress() {
        this.setState({
            showProgress: false,
        })
    }

    gotoBooking() {
        this.props.navigation.navigate('EXPLORE');
    }

    gotoMyTrips = () => {
        this.props.navigation.navigate('UserMyTrips', {trips:this.state.myTrips});
    }

    componentDidMount() {
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.placeholderImageView}>
                    <Image
                        style={styles.placeholderImage}
                        source={require('../../../assets/placeholder_mytrips.png')}
                    />
                </View>
                { this.state.hasPendingTrips == false ?
                    <Text style={styles.title}>You have no upcoming trips</Text>
                    :
                    <Text> </Text>
                }
                <Text style={styles.subtext}>Discover your next experience</Text>
                <TouchableOpacity onPress={() => this.state.myTrips.length > 0 ? this.gotoMyTrips(): this.gotoBooking()} style={styles.buttonExplore}>
                    <Text style={styles.exploreBtnText}>Start Exploring</Text>
                </TouchableOpacity>
                <ProgressDialog
                        visible={this.state.showProgress}
                        title=""
                        message={'Loading trips...'}
                        animationType="slide"
                        activityIndicatorSize="large"
                        activityIndicatorColor="black"/>
                </View>
        )
    }
    onStartExploring = () =>{
        //Here we will load trips
        getMyHotelBookings()
        .then(res => res.response.json())
        .then(parsed => {
            var tripArray = _.orderBy(parsed.content, ['arrival_date'],['desc']);
            _.remove(tripArray, function(obj) {
                var tripDate = moment(obj.arrival_date).utc();
                var now = moment().utc();
                return tripDate < now;
            });
            this.setState.hasPendingTrips = tripArray.length > 0 ? false : true;
            this.state.myTrips = tripArray;
            this.hideProgress();
        })
        .catch(err => {
            this.hideProgress();
            Toast.showWithGravity('Cannot get messages, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
            console.log(err);
        });
    }
}


export default MyTrips;
