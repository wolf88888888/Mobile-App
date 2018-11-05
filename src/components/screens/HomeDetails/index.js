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
import HomeDetailView from '../../organisms/HomeDetailView';
import LocationView from '../../atoms/LocationView';
import WhiteBackButton from '../../atoms/WhiteBackButton';
import styles from './styles';
import ImageCarousel from '../../atoms/ImagePage';

const dimensionWindows = Dimensions.get('window');
const logoWidth = dimensionWindows.width;
const logoHeight = logoWidth * 35 / 54;//eslint-disable-line

class HomeDetails extends Component {

    //https://github.com/LockTrip/Centralized-App/blob/master/src/components/homes/details/HomeDetailsPage.jsx
    //requester.getListing(this.props.match.params.id).then
//https://staging.locktrip.com/api/listings/990
    //requester.getCalendarByListingIdAndDateRange(searchTermMap)
//https://staging.locktrip.com/api/calendars/search/findAllByListingIdAndDateBetween?listing=990&startDate=06/11/2018&endDate=06/11/2019&page=0&toCode=EUR&size=365
    //requester.getHomeBookingDetails(this.props.match.params.id)
//https://staging.locktrip.com/api/listings/rooms/990
    constructor(props) {
        super(props);

        const { params } = this.props.navigation.state;
        console.log("HomeDetails", params);

        this.state = {
            dataSourcePreview: params ? params.homePhotos : [],
            homeData: params ? params.data : [],
            checks: params ? params.checks : [],
            hotelAmenities: [],
        }
    }

    onClose = () => {
        this.props.navigation.goBack();
    }

    onMapTap = () => {
        // this.props.navigation.navigate('MapFullScreen', {
        //     lat: this.state.latitude != null ? parseFloat(this.state.latitude) : 0.0,
        //     lng: this.state.longitude != null ? parseFloat(this.state.longitude) : 0.0,
        //     name: this.state.hotel.name,
        //     address: `${this.state.mainAddress}, ${this.state.countryName}`
        // });
    }

    onFacilityMore = () => {

    }

    onBooking = (roomDetail) => {
        // onRoomPress = (roomDetail) => {
        console.log("onRoomPress", roomDetail);
        this.props.navigation.navigate('GuestInfoForm', { 
            roomDetail: roomDetail, 
            guests: this.state.guests, 
            'price': ((roomDetail.roomsResults[0].price) * this.state.daysDifference).toFixed(2),
            'priceLOC': (((roomDetail.roomsResults[0].price) / this.state.locRate)*this.state.daysDifference).toFixed(2), 
            'daysDifference': this.props.daysDifference,
            currency: this.state.daysDifference,
            currencySign: this.state.currencySign,
            'hotelDetails': this.state.hotelFullDetails,
            searchString: this.state.searchString,
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

                        <HomeDetailView
                            title={this.state.homeData.name}
                            rateVal={this.state.homeData.averageRating}
                            reviewNum={0}
                            address={this.state.homeData.street + ', ' + this.state.homeData.city.name + '•' + this.state.homeData.country.name}
                            description={this.state.homeData.descriptionText}
                        />

                        {/* <FacilitiesView
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
                            search={this.state.searchString}
                            onBooking={this.onBooking}
                            guests={this.state.guests}
                            hotelDetails={this.state.hotelFullDetails}
                            currency={this.state.currency}
                            currencySign={this.state.currencySign}
                            locRate={this.state.locRate}
                            daysDifference={this.state.daysDifference}
                        />*/}

                        <View style={[styles.lineStyle, {
                            marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15
                        }]}
                        />
                        <TouchableOpacity activeOpacity={1} onPress={() => this.onMapTap()}>
                            <LocationView
                                titleStyle={{ fontSize: 17 }}
                                name={this.state.homeData.name}
                                lat={this.state.homeData.latitude != null ? parseFloat(this.state.homeData.latitude) : 0.0}
                                lon={this.state.homeData.longitude != null ? parseFloat(this.state.homeData.longitude) : 0.0}
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

export default HomeDetails;
