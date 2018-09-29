import {
    Dimensions,
    ScrollView,
    View,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvailableRoomsView from '../../molecules/AvailableRoomsView';
import FacilitiesView from '../../molecules/FacilitiesView';
import HotelDetailView from '../../organisms/HotelDetailView';
import LocationView from '../../atoms/LocationView';
import WhiteBackButton from '../../atoms/WhiteBackButton';
import styles from './styles';
import ImageCarousel from '../../atoms/ImagePage';

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
        this.onBooking = this.onBooking.bind(this);

        this.state = {
            hotel: {},
            hotelFullDetails: [],
            hotelAmenities: [],
            dataSourcePreview: [],
            description: '',
            urlForService: '',
            guests: 0,
            mainAddress: '',
            countryName: '',
            latitude: 37.78825,
            longitude: -122.4324,
            currency: 'EUR',
            currencySign: '€',
            locRate: 0,
            hotelRatingStars: 0,
            daysDifference: 1
        }

        const { params } = this.props.navigation.state;
        this.state.hotel = params ? params.hotelDetail : [];
        this.state.guests = params ? params.guests : 0;
        this.state.urlForService = params ? params.urlForService : '';
        this.state.currency = params ? params.currency : [];
        this.state.currencySign = params ? params.currencySign : '€';
        this.state.locRate = params ? params.locRate : '';
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

    onBooking(roomData) {
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
                            rateVal={this.state.hotelRatingStars}
                            reviewNum={0}
                            address={this.state.mainAddress}
                            description={this.state.description}
                            onBooking={this.onBooking}
                        />

                        {/* { this.state.hotelAmenities.map
                        (listing => <FacilityView image={require('../../../assets/Facilities/Homes/BathTub.png')}/>) } */}

                        <FacilitiesView
                            style={styles.roomfacility}
                            data={this.state.hotelAmenities}
                            onFacilityMore={this.onFacilityMore}
                        />
                        <View style={[styles.lineStyle, {
                            marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15
                        }]}
                        />

                        <AvailableRoomsView
                            id={this.state.hotel.id}
                            navigate={navigate}
                            search={this.state.urlForService}
                            onBooking={this.onBooking}
                            guests={this.state.guests}
                            hotelDetails={this.state.hotelFullDetails}
                            currency={this.state.currency}
                            currencySign={this.state.currencySign}
                            locRate={this.state.locRate}
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
                                hotelName={this.state.hotel.name}
                                hotelPrice={`LOC ${this.state.hotelFullDetails.locRate}`}
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
