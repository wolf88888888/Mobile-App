import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import _ from 'lodash';
import { connect } from 'react-redux';
import requester from '../../../initDependencies';
import styles from './styles';

class MyTrips extends Component {
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

    constructor() {
        super();
        this.state = {
            showProgress: true,
            myTrips: [],
            hasPendingTrips: false,
        };
        this.onStartExploring();
        this.gotoBooking = this.gotoBooking.bind(this);
    }

    hideProgress() {
        this.setState({
            showProgress: false,
        })
    }

    showProgress() {
        this.setState({
            showProgress: true,
        })
    }

    gotoBooking() {
        this.props.navigation.navigate('EXPLORE');
    }

    gotoMyTrips = () => {
        this.props.navigation.navigate('UserMyTrips', { trips: this.state.myTripsData });
    }

    componentDidMount() {
        console.log('did mount-----', this.props);
    }

    componentDidUpdate(prevProps) {
        console.log('did update-----', prevProps.navigation.state.params);
        if (this.state.hasPendingTrips) {
            this.props.navigation.navigate('UserMyTrips', { trips: this.state.myTripsData, gotoBooking: this.gotoBooking });
        }
    }

    onStartExploring = () => {
        //Here we will load trips
        requester.getMyHotelBookings().then(res => {
            res.body.then(data => {
                console.log("getMyHotelBookings", data);
                var tripArray = _.orderBy(data.content, ['arrival_date'], ['desc']);
                // _.remove(tripArray, function(obj) {
                //     var tripDate = moment(obj.arrival_date).utc();
                //     var now = moment().utc();
                //     return tripDate < now;
                // });
                this.state.myTripsData = data;
                this.state.myTripsData.content = tripArray;
                if (data.content.length > 0) {
                    this.state.hasPendingTrips = true
                }
                this.hideProgress();

            })
        }).catch(err => {
            this.hideProgress();
            Toast.showWithGravity('Cannot get messages, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
            console.log(err);
        });
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
                <Text style={styles.title}>You have no upcoming trips</Text>
                <Text style={styles.subtext}>Discover your next experience</Text>
                <TouchableOpacity onPress={() => this.state.myTripsData.content.length > 0 ? this.gotoMyTrips() : this.gotoBooking()} style={styles.buttonExplore}>
                    <Text style={styles.exploreBtnText}>Start Exploring</Text>
                </TouchableOpacity>
                <ProgressDialog
                    visible={this.state.showProgress}
                    title=""
                    message={'Loading trips...'}
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black" />
            </View>
        )
    }

}

const mapStateToProps = () => {
    return { screenName: 'MYTRIPS' };
};

export default connect(mapStateToProps)(MyTrips);
