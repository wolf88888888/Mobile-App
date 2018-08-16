import {
    Button,
    Dimensions,
    FlatList,
    Keyboard,
    ListView,
    ProgressBarAndroid,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';

import AvailableRoomsView from '../../molecules/AvailableRoomsView'
import FacilitiesView from '../../molecules/FacilitiesView';
import HotelDetailView from '../../organisms/HotelDetailView';
import Icon from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';
import LocationView from '../../atoms/LocationView';
import PropTypes from 'prop-types';
import WhiteBackButton from '../../atoms/WhiteBackButton';
import { imgHost } from '../../../config';
import requester from '../../../initDependencies';
import styles from './styles';
import ImageCarousel from '../../atoms/ImagePage';
const dimensionWindows = Dimensions.get('window');
const logoWidth = dimensionWindows.width;
const logoHeight = logoWidth * 35 / 54;

class HotelDetails extends Component {

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

        this.onClose = this.onClose.bind(this);
        this.onFacilityMore = this.onFacilityMore.bind(this);
        this.onBooking = this.onBooking.bind(this);

        this.state = {
            hotel: {},
            hotelFullDetails: [],
            dataSourcePreview: [],
            description: '',
            rooms: [],
            urlForService: '',
            guests: 0,
            mainAddress: '',
            regionName: '',
            countryName: '',
            latitude: 37.78825,
            longitude: -122.4324,
            locRate: 0,
            currencyIcon: ''
        }
        const { params } = this.props.navigation.state;
        this.state.hotel = params ? params.hotelDetail : [];
        this.state.guests = params ? params.guests : 0;
        this.state.urlForService = params ? params.urlForService : '';
        this.state.locRate = params ? params.locRate : '';
        this.state.currencyIcon = params ? params.currencyIcon : Icons.euro;
        // this.state.mainAddress = params.hotelDetail.additionalInfo.mainAddress;
        // this.state.countryName = params.hotelDetail.country;
        // this.state.latitude = params.hotelDetail.latitude;
        // this.state.longitude = params.hotelDetail.longitude;
        //this.state.hotelFullDetails = params;
        const hotelPhotos = [];


        // for (var i = 0; i < params.hotelDetail.hotelPhotos.length; i++) {
        //     hotelPhotos.push({ uri: imgHost + params.hotelDetail.hotelPhotos[i]["url"] })
        // }

        //this.state.description = this.state.hotel.description;
        // for (let i = 0; i < this.state.hotel.descriptions.length; i ++) {
        //     if (this.state.hotel.descriptions[i].type == "PropertyInformation") {
        //         this.state.description = this.state.hotel.descriptions[i].text;
        //         break;
        //     }
        // }

        
    }

    componentWillMount(){
        requester.getHotelById(this.state.hotel.id, this.state.urlForService.split('&')).then(res => {
            // here you set the response in to json
            res.body.then(data => {
                
                const hotelPhotos = [];
                for (var i = 0; i < data.hotelPhotos.length; i++) {
                    hotelPhotos.push({ uri: imgHost + data.hotelPhotos[i]["url"] })
                }
                this.state.dataSourcePreview = hotelPhotos;
                // here you parse your json
                // here you set you data from json into your variables
                this.setState({
                    hotelFullDetails: data,
                    mainAddress: data.additionalInfo.mainAddress,
                    regionName: data.city,
                    countryName: data.country,
                    description: data.generalDescription,
                    latitude: data.latitude,
                    longitude: data.longitude,
                });
            }).catch(err => {
                console.log(err);
            });
        });
    }

    componentDidMount() {
        
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
                        <WhiteBackButton onPress={this.onClose} />
                    </View>
                    <View style={styles.body}> 
                        <View style={{width: logoWidth, height: logoHeight}}>
                            {this.state.dataSourcePreview.length > 0 &&
                            <ImageCarousel
                            delay={1500}
                            style={styles.logoImage}
                            width={logoWidth}
                            height={logoHeight}
                            indicatorSize={12.5}
                            indicatorOffset={20}
                            indicatorColor="#D87A61"
                            images={this.state.dataSourcePreview}>
                            </ImageCarousel>}
                        </View>
                        
                        <HotelDetailView
                            dataSourcePreview={this.state.dataSourcePreview}
                            title={this.state.hotel.name}
                            rateExp={""}
                            rateVal={this.state.hotel.star}
                            reviewNum={0}
                            address={this.state.mainAddress}
                            description={this.state.description}
                            onBooking={this.onBooking}
                        />
                        

                        <FacilitiesView
                            style={styles.roomfacility}
                            onFacilityMore={this.onFacilityMore} />

                        <View style={[styles.lineStyle, { marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15 }]} />

                        <AvailableRoomsView
                            id={this.state.hotel.id}
                            navigate={navigate}
                            search={this.state.urlForService}
                            onBooking={this.onBooking}
                            guests={this.state.guests}
                            hotelDetails={this.state.hotelFullDetails}
                            currencyIcon={this.state.currencyIcon}
                            locRate={this.state.locRate} />

                        <View style={[styles.lineStyle, { marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15 }]} />

                        <LocationView
                            location={this.state.mainAddress + ", " + this.state.countryName}
                            titleStyle={{ fontSize: 17 }}
                            hotelName={this.state.hotel.name}
                            hotelPrice={`LOC ${this.state.hotelFullDetails.locRate}`}
                            description={this.state.hotel.generalDescription}
                            lat={this.state.latitude != null ? parseFloat(this.state.latitude) : 0.0}
                            lon={this.state.longitude != null ? parseFloat(this.state.longitude) : 0.0}
                            radius={200} />
                        <View style={{ marginBottom: 50 }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default HotelDetails;
