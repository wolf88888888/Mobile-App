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
        }

        this.state.hotel = {

            "city":{
                "listingsCount":0,
                "name":"Perth",
                "id":4596
            },
            "amenities":[
                {
                    "code":"AirConditioning",
                    "picture":null,
                    "text":"Air conditioning",
                    "id":1
                },
                {
                    "code":"HairDryer",
                    "picture":null,
                    "text":"Hair dryer",
                    "id":5
                },
                {
                    "code":"OutdoorPool",
                    "picture":null,
                    "text":"Outdoor swimming pool",
                    "id":7
                },
                {
                    "code":"Gym",
                    "picture":null,
                    "text":"Fitness room / Gym",
                    "id":11
                },
                {
                    "code":"CarPark",
                    "picture":null,
                    "text":"Car parking",
                    "id":6
                },
                {
                    "code":"Sauna",
                    "picture":"/amenities/images/hotels/sauna.svg",
                    "text":"Sauna",
                    "id":9
                },
                {
                    "code":"BusinessCenter",
                    "picture":null,
                    "text":"Business center",
                    "id":12
                },
                {
                    "code":"MiniBarInRoom",
                    "picture":null,
                    "text":"Mini-bar",
                    "id":8
                }
            ],
            "rooms":[
            ],
            "externalId":33578,
            "rank":27,
            "latitude":"-31.96046",
            "longitude":"115.89632",
            "additionalInfo":{
                "url":null,
                "email":null,
                "fax":"+61 8 9362 7997",
                "tel":"+61 8 9362 8888",
                "zip":"WA 6100",
                "mainAddress":"Great Eastern Highway Burswood",
                "secondaryAddress":null,
                "thirdAddress":null,
                "id":2001
            },
            "descriptions":[
                {
                    "text":"You must present a photo ID when checking in. Your credit card is charged at the time you book. Bed type and smoking preferences are not guaranteed.Your reservation is prepaid and is guaranteed for late arrival. The total charge includes all room charges and taxes, as well as fees for access and booking. Any incidental charges such as parking, phone calls, and room service will be handled directly between you and the property.",
                    "language":"en",
                    "id":10029,
                    "type":"PoliciesDisclaimers"
                },
                {
                    "text":"<p><b>Property Location</b> <br />When you stay at Crown Metropol Perth in Burswood, you'll be in the entertainment district and minutes from Crown Perth and Burswood Dome. This 5-star hotel is within close proximity of Heirisson Island and WACA Ground.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 396 air-conditioned rooms featuring refrigerators and plasma televisions. Complimentary wireless Internet access is available to keep you connected. Bathrooms have bathtubs or showers and hair dryers. Conveniences include safes and desks, and housekeeping is provided daily.</p><p><b>Rec, Spa, Premium Amenities</b> <br />Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. Gambling sorts can try their luck at the casino, while others may prefer a nightclub or an outdoor pool. Additional features include complimentary wireless Internet access, babysitting/childcare (surcharge), and gift shops/newsstands.</p><p><b>Dining</b> <br />Grab a bite at one of the hotel's 4 restaurants, or stay in and take advantage of 24-hour room service. Quench your thirst with your favorite drink at a bar/lounge.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include a 24-hour business center, limo/town car service, and dry cleaning/laundry services. Self parking (subject to charges) is available onsite.</p> <br/> Pets not allowed Check-in time starts at 3 PM Check-out time is 11 AM <br/> Grab a bite at one of the hotel's 4 restaurants, or stay in and take advantage of 24-hour room service. Quench your thirst with your favorite drink at a bar/lounge. <br/> Extra-person charges may apply and vary depending on hotel policy. <br />Government-issued photo identification and a credit card or cash deposit are required at check-in for incidental charges. <br />Special requests are subject to availability upon check-in and may incur additional charges. Special requests cannot be guaranteed. <br /> <br/> Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. Gambling sorts can try their luck at the casino, while others may prefer a nightclub or an outdoor pool. Additional features include complimentary wireless Internet access, babysitting/childcare (surcharge), and gift shops/newsstands. <br /> Make yourself at home in one of the 396 air-conditioned rooms featuring refrigerators and plasma televisions. Complimentary wireless Internet access is available to keep you connected. Bathrooms have bathtubs or showers and hair dryers. Conveniences include safes and desks, and housekeeping is provided daily.",
                    "language":"en",
                    "id":10030,
                    "type":"General"
                },
                {
                    "text":"Extra-person charges may apply and vary depending on hotel policy. <br />Government-issued photo identification and a credit card or cash deposit are required at check-in for incidental charges. <br />Special requests are subject to availability upon check-in and may incur additional charges. Special requests cannot be guaranteed. <br />",
                    "language":"en",
                    "id":10031,
                    "type":"EssentialInfo"
                },
                {
                    "text":"When you stay at Crown Metropol Perth in Burswood, you'll be in the entertainment district and minutes from Crown Perth and Burswood Dome. This 5-star hotel is within close proximity of Heirisson Island and WACA Ground. <br/> Distances are calculated in a straight line from the property's location to the point of interest or attraction, and may not reflect actual travel distance. <br /><br /> Distances are displayed to the nearest 0.1 mile and kilometer. <p>Crown Perth - 0 km / 0 mi <br />Burswood Dome - 0.3 km / 0.2 mi <br />Heirisson Island - 1.2 km / 0.8 mi <br />WACA Ground - 1.5 km / 0.9 mi <br />Gloucester Park Raceway - 1.5 km / 0.9 mi <br />Belmont Racecourse - 1.6 km / 1 mi <br />World Australia Cricket Association Museum - 1.7 km / 1.1 mi <br />Queens Gardens - 2 km / 1.2 mi <br />Tranby House - 2.3 km / 1.4 mi <br />Langley Park - 2.5 km / 1.6 mi <br />Perth Mint - 2.6 km / 1.6 mi <br />Royal Perth Hospital - 2.9 km / 1.8 mi <br />St. Mary's Cathedral - 2.9 km / 1.8 mi <br />Perth Concert Hall - 3 km / 1.9 mi <br />Fire Safety Education Centre and Museum - 3.1 km / 1.9 mi <br /></p><p>The preferred airport for Crown Metropol Perth is Perth, WA (PER) - 6.8 km / 4.2 mi. </p>",
                    "language":"en",
                    "id":10028,
                    "type":"SurroundingArea"
                }
            ],
            "star":5,
            "locPrice":47.554617449017790396,
            "hotelPhotos":[
                {
                    "url":"RXLImages/7/PER-BUR1hotel_Guest_Room_2.jpg",
                    "thumbnailUrl":"RXLImages/7/PER-BUR1hotel_Guest_Room_2_thumb.jpg",
                    "id":593986
                },
                {
                    "url":"RXLImages/7/PER-BUR1hotel_Guest_Room_1.jpg",
                    "thumbnailUrl":"RXLImages/7/PER-BUR1hotel_Guest_Room_1_thumb.jpg",
                    "id":593983
                },
                {
                    "url":"RXLImages/7/PER-BUR1hotel_Swimming_Pool_1.jpg",
                    "thumbnailUrl":"RXLImages/7/PER-BUR1hotel_Swimming_Pool_1_thumb.jpg",
                    "id":593985
                },
                {
                    "url":"RXLImages/7/PER-BUR1hotel_Lobby_1.jpg",
                    "thumbnailUrl":"RXLImages/7/PER-BUR1hotel_Lobby_1_thumb.jpg",
                    "id":593984
                }
            ],
            "region":{
                "externalId":15359,
                "regionName":"Perth ",
                "country":{
                    "name":"Australia",
                    "id":24
                },
                "id":169
            },
            "name":"Crown Metropol Perth",
            "id":2001,
            "type":"Hotel"
        
        }

        const hotelPhotos = [];
        for (let i = 0; i < this.state.hotel.hotelPhotos.length; i ++) {
            hotelPhotos.push({url:imgHost+this.state.hotel.hotelPhotos[i].url})
        }

        for (let i = 0; i < this.state.hotel.descriptions.length; i ++) {
            if (this.state.hotel.descriptions[i].type == "PropertyInformation") {
                this.state.description = this.state.hotel.descriptions[i].text;
                break;
            }
        }

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
                            address = {this.state.hotel.additionalInfo.mainAddress}
                            description = {this.state.description}
                            onBooking = {this.onBooking}
                            />

                        <FacilitiesView
                            style = {styles.roomfacility}
                            onFacilityMore = {this.onFacilityMore}/>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]}/>

                        <AvailableRoomsView
                            id='1920'
                            navigate= {navigate}
                            search='?region=15359&currency=USD&startDate=30/05/2018&endDate=31/05/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D'
                            onBooking={this.onBooking}/>

                        <View style={[styles.lineStyle, {marginLeft:20, marginRight:20, marginTop:15, marginBottom:15}]} />

                         <LocationView
                            location={this.state.hotel.region.regionName + ", " + this.state.hotel.region.country.name}
                            titleStyle={{fontSize: 17}}
                            description={this.state.hotel.additionalInfo.mainAddress}
                            lat={parseFloat(this.state.hotel.latitude)}
                            lon={parseFloat(this.state.hotel.longitude)}
                            radius={200}/>
                        <View style={{marginBottom:50}}/>                    

                </ScrollView>
            </View>
        );
    }
}

export default HotelDetails;