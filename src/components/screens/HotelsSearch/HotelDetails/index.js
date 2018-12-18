import {
    Dimensions,
    ScrollView,
    View,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvailableRoomsView from '../../../molecules/AvailableRoomsView';
import FacilitiesView from '../../../molecules/FacilitiesView';
import HotelDetailView from '../../../organisms/HotelDetailView';
import LocationView from '../../../atoms/LocationView';
import WhiteBackButton from '../../../atoms/WhiteBackButton';
import styles from './styles';
import ImageCarousel from '../../../atoms/ImagePage';

const dimensionWindows = Dimensions.get('window');
const logoWidth = dimensionWindows.width;
const logoHeight = logoWidth * 35 / 54;//eslint-disable-line

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

        this.state = {
            hotel: {},
            hotelFullDetails: [],
            hotelAmenities: [],
            dataSourcePreview: [],
            description: '',
            searchString: '',
            guests: 0,
            mainAddress: '',
            countryName: '',
            latitude: 37.78825,
            longitude: -122.4324,
            hotelRatingStars: 0,
            daysDifference: 1
        }

        const { params } = this.props.navigation.state;
        this.state.hotel = params ? params.hotelDetail : [];
        this.state.guests = params ? params.guests : 0;
        this.state.searchString = params ? params.searchString : '';
        this.state.hotelFullDetails = params ? params.hotelFullDetails : [];
        this.state.hotelAmenities = params ? params.hotelFullDetails.hotelAmenities : [];
        this.state.mainAddress = params ? params.hotelFullDetails.additionalInfo.mainAddress : '';
        this.state.regionName = params ? params.hotelFullDetails.city : '';
        this.state.countryName = params ? params.hotelFullDetails.country : '';
        this.state.description = params ? params.hotelFullDetails.generalDescription : '';
        this.state.latitude = params ? params.hotelFullDetails.latitude : 0.0;
        this.state.longitude = params ? params.hotelFullDetails.longitude : 0.0;
        this.state.dataSourcePreview = params ? params.dataSourcePreview : [];
        this.state.hotelRatingStars = params ? params.hotelDetail.stars : 0;
        this.state.daysDifference = params ? params.daysDifference : 1;
    }

    onMapTap() {
        this.props.navigation.navigate('MapFullScreen', {
            lat: this.state.latitude != null ? parseFloat(this.state.latitude) : 0.0,
            lng: this.state.longitude != null ? parseFloat(this.state.longitude) : 0.0,
            name: this.state.hotel.name,
            address: `${this.state.mainAddress}, ${this.state.countryName}`
        });
    }

    onClose() {
        this.props.navigation.goBack();
    }

    onFacilityMore() {
    }

    onBooking = (roomDetail) => {
        // onRoomPress = (roomDetail) => {
        console.log("onRoomPress", roomDetail);
        let hotelImg = this.state.hotel.hotelPhoto.url;
        if (hotelImg === undefined || hotelImg === null) {
            hotelImg = this.state.hotel.hotelPhoto;
        }
        this.props.navigation.navigate('GuestInfoForm', { 
            roomDetail: roomDetail, 
            guests: this.state.guests, 
            price: ((roomDetail.roomsResults[0].price) * this.state.daysDifference).toFixed(2),
            daysDifference: this.props.daysDifference,
            hotelDetails: this.state.hotelFullDetails,
            searchString: this.state.searchString,
            hotelImg: hotelImg
        });
        // }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.topButtonContainer}>
                        <WhiteBackButton onPress={this.onClose} />
                    </View>
                    <View style={styles.body}>
                        <View style={{ width: logoWidth, height: logoHeight }}>
                            <ImageCarousel
                                delay={5000}
                                style={styles.logoImage}
                                width={logoWidth}
                                height={logoHeight}
                                indicatorSize={12.5}
                                indicatorOffset={20}
                                indicatorColor="#D87A61"
                                images={this.state.dataSourcePreview}
                            />
                        </View>

                        <HotelDetailView
                            dataSourcePreview={this.state.dataSourcePreview}
                            title={this.state.hotel.name}
                            rateVal={this.state.hotel.star}
                            reviewNum={0}
                            address={this.state.mainAddress}
                            description={this.state.description}
                        />

                        {/* { this.state.hotelAmenities.map
                        (listing => <FacilityView image={require('../../../assets/Facilities/Homes/BathTub.png')}/>) } */}

                        <FacilitiesView
                            style={styles.roomfacility}
                            data={this.state.hotelAmenities}
                            isHome={false}
                            onFacilityMore={this.onFacilityMore}
                        />
                        <View style={[styles.lineStyle, {
                            marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15
                        }]}
                        />

                        <AvailableRoomsView
                            id={this.state.hotel.id}
                            search={this.state.searchString}
                            onBooking={this.onBooking}
                            guests={this.state.guests}
                            hotelDetails={this.state.hotelFullDetails}
                            daysDifference={this.state.daysDifference}
                        />

                        <View style={[styles.lineStyle, {
                            marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15
                        }]}
                        />
                        <TouchableOpacity activeOpacity={1} onPress={() => this.onMapTap()}>
                            <LocationView
                                location={`${this.state.mainAddress}, ${this.state.countryName}`}
                                titleStyle={{ fontSize: 17 }}
                                name={this.state.hotel.name}
                                description={this.state.hotel.generalDescription}
                                lat={this.state.latitude != null ? parseFloat(this.state.latitude) : 0.0}
                                lon={this.state.longitude != null ? parseFloat(this.state.longitude) : 0.0}
                                radius={200}
                            />
                        </TouchableOpacity>
                        <View style={{ marginBottom: 50 }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default HotelDetails;
