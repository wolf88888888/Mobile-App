import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import DialogProgress from 'react-native-dialog-progress'
import Requester, { getMyHotelBookings } from '../../../utils/requester';

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
                <Text style={styles.title}>You have no upcoming trips</Text>
                <Text style={styles.subtext}>Discover your next experience</Text>
                <TouchableOpacity onPress={this.onStartExploring} style={styles.buttonExplore}>
                    <Text style={styles.exploreBtnText}>Start Exploring</Text>
                </TouchableOpacity>
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
    }
}


export default MyTrips;
