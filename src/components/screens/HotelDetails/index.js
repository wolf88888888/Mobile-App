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
import FacilitiesView from '../../molecules/FacilitiesView';
import LocationView from '../../atoms/LocationView';

import styles from './styles';

import HotelDetailView from '../../organisms/HotelDetailView';
import AvailableRoomsView from '../../molecules/AvailableRoomsView'
import { imgHost } from '../../../config';

class HotelDetails extends Component {

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

    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onFacilityMore = this.onFacilityMore.bind(this);
        this.onBooking = this.onBooking.bind(this);

        this.state = {
            hotel:{},
            dataSourcePreview: [],
            description:'',
            rooms:[],
            urlForService: '',
            guests : 0
        }
        const { params } = this.props.navigation.state;
        this.state.hotel = params ? params.hotelDetail : [];
        this.state.guests = params ? params.guests : 0;
        this.state.urlForService = params ? params.urlForService : '';
        const hotelPhotos = [];
        for (var i = 0; i < this.state.hotel.photos.length; i ++) {

            hotelPhotos.push({url:imgHost+this.state.hotel.photos[i].url})
        }

        this.state.description = this.state.hotel.description;
        // for (let i = 0; i < this.state.hotel.descriptions.length; i ++) {
        //     if (this.state.hotel.descriptions[i].type == "PropertyInformation") {
        //         this.state.description = this.state.hotel.descriptions[i].text;
        //         break;
        //     }
        // }

        this.state.dataSourcePreview = hotelPhotos;
    }

    onClose() {
        this.props.navigation.goBack();
    }

    onFacilityMore() {
    }

    onBooking(roomData) {
        console.log("room data", roomData);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                <View style={styles.topButtonContainer}>
                    <WhiteBackButton onPress={this.onClose}/>
                </View>
                <View style={styles.body}>
                    <HotelDetailView
                        dataSourcePreview = {this.state.dataSourcePreview}
                        title = {this.state.hotel.name}
                        rateExp = {""}
                        rateVal = {this.state.hotel.star}
                        reviewNum = {0}
                        address = {'Dummy Address'}
                        description = {this.state.description}
                        onBooking = {this.onBooking}
                        />

                    <FacilitiesView
                        style = {styles.roomfacility}
                        onFacilityMore = {this.onFacilityMore}/>

                    <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]}/>

                    <AvailableRoomsView
                        id={this.state.hotel.id}
                        navigate= {navigate}
                        search={'?'+this.state.urlForService}
                        onBooking={this.onBooking}
                        guests={this.state.guests}/>

                    <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />
                </View>
            </ScrollView>
            </View>
        );
    }
}

export default HotelDetails;
