import {
    Dimensions,
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CheckInOutView from '../../../atoms/Property/CheckInOutView';
import FacilitiesView from '../../../molecules/FacilitiesView';
import HomeDetailView from '../../../organisms/HomeDetailView';
import LocationView from '../../../atoms/LocationView';
import WhiteBackButton from '../../../atoms/WhiteBackButton';
import ImageCarousel from '../../../atoms/ImagePage';
import HomeDetailBottomBar from '../../../atoms/HomeDetailBottomBar'

import styles from './styles';

const dimensionWindows = Dimensions.get('window');
const logoWidth = dimensionWindows.width;
const logoHeight = logoWidth * 35 / 54;//eslint-disable-line

class HomeDetails extends Component {
    constructor(props) {
        super(props);
        console.log("param", props.navigation.state.params);
    }

    onClose = () => {
        this.props.navigation.goBack();
    }

    onMapTap = () => {
        const { params } = this.props.navigation.state;

        this.props.navigation.navigate('MapFullScreen', {
            lat: params.homeData.latitude != null ? parseFloat(params.homeData.latitude) : 0.0,
            lng: params.homeData.longitude != null ? parseFloat(params.homeData.longitude) : 0.0,
            name: params.homeData.name,
            address: `${params.homeData.street}, ${params.homeData.city.name} • ${params.homeData.country.name}`
        });
    }

    onFacilityMore = () => {

    }

    getPriceForPeriod(startDate, nights, calendar) {
        let price = 0;
      
        let startDateIndex = calendar.findIndex(x => x.date === startDate);
        if (startDateIndex && startDateIndex < 0) {
            return 0;
        }
        for (let i = startDateIndex; i < nights + startDateIndex; i++) {
            price += calendar[i].price;
        }
        if (nights === 0) {
            return 0;
        }
        return price / nights;
    }

    gotoRequestBooking = () => {
        const { params } = this.props.navigation.state;

        this.props.navigation.navigate('HomeReviewScreen', {
            homeID: params.homeData.id,
            title: params.homeData.name,
            address: params.homeData.street + ', ' + params.homeData.city.name + '•' + params.homeData.country.name,
            startDate: params.startDate, 
            endDate:params.endDate,
            checkInDate: params.checkInDate,
            checkOutDate: params.checkOutDate,
            nights: params.nights,
            cleaningFee: params.homeData.cleaningFee,
            calendar: params.calendar,
            guests: params.guests,
            guestsIncluded: params.homeData.guestsIncluded,
            currencyCode: params.currencyCode
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        const { 
            eventsAllowed,
            smokingAllowed,
            suitableForPets,
            suitableForInfants,
            house_rules } = params.roomDetails;
        
        const {currencyCode} = params;
        
        const hasHouseRules = eventsAllowed || smokingAllowed || suitableForPets || suitableForInfants || house_rules;
        //const houseRules = house_rules && house_rules.split('\r\n');

        const price = this.getPriceForPeriod(params.startDate, params.nights, params.calendar);// * params.rateExchange;

        // const {exchangeRates, currency} = this.props;
        // let defaultDailyPrice = CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, currency, price);
        // let fiatPriceInRoomsXMLCurrency = CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, RoomsXMLCurrency.get(), price);

        // console.log("price----------", price, defaultDailyPrice, fiatPriceInRoomsXMLCurrency);
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
                                images={params.homePhotos}
                            />
                        </View>

                        <HomeDetailView
                            title={params.homeData.name}
                            rateVal={params.homeData.averageRating}
                            reviewNum={0}
                            address={params.homeData.street + ', ' + params.homeData.city.name + '•' + params.homeData.country.name}
                            description={params.homeData.descriptionText}
                            roomDetails= {params.roomDetails}
                        />

                        <FacilitiesView
                            style={styles.roomfacility}
                            data={params.homeData.amenities}
                            isHome={true}
                            onFacilityMore={this.onFacilityMore}
                        />  
                        <View style={[styles.lineStyle, {marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15}]}/>

                        <CheckInOutView
                            checkInStart={params.checks.checkInStart}
                            checkInEnd={params.checks.checkInEnd}
                            checkOutStart={params.checks.checkOutStart}
                            checkOutEnd={params.checks.checkOutEnd}/>

                        <View style={[styles.lineStyle, {
                            marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15
                        }]}
                        />
                        
                        {
                            hasHouseRules && (
                                <View style={styles.etcContaner}>
                                    <Text style={styles.etcName}>House Rule</Text>
                                    <Text style={styles.etcButton}>
                                        Read 
                                    </Text>
                                </View>
                            )
                        }
                        
                        <View style={[styles.lineStyle, {
                            marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 15
                        }]}
                        />
                        <TouchableOpacity activeOpacity={1} onPress={() => this.onMapTap()}>
                            <LocationView
                                titleStyle={{ fontSize: 17 }}
                                name={params.homeData.name}
                                lat={params.homeData.latitude != null ? parseFloat(params.homeData.latitude) : 0.0}
                                lon={params.homeData.longitude != null ? parseFloat(params.homeData.longitude) : 0.0}
                                radius={200}
                            />
                        </TouchableOpacity>
                        <View style={{ marginBottom: 100 }} /> 
                    </View>
                </ScrollView>
                {/* <View style={styles.floatingBar}>
                    <View style={styles.detailsView}>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price,styles.fontFuturaMed]}>{this.props.currencySign}{price.toFixed(2)} </Text>
                            <Text style={styles.period1}> /per night</Text>
                        </View>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaStd]}>LOC {parseFloat(price/locRate).toFixed(2)}</Text>
                            <Text style={styles.period2}> /per night</Text>
                        </View>
                    </View>
                    <View style={styles.payButtonView}>
                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={this.gotoRequestBooking}
                        >
                            <Text style={styles.confirmPayText}>Check Availability</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                
                <HomeDetailBottomBar 
                    price = {price}
                    currencyCode = {currencyCode}
                    daysDifference = {1}
                    titleBtn = {"Check Availability"}
                    onPress = {this.gotoRequestBooking}/>
            </View>
        );
    }
}

export default HomeDetails;

// let mapStateToProps = (state) => {
//     return {
//         currency: state.currency.currency,
//         currencySign: state.currency.currencySign,
//         exchangeRates: state.exchangeRates,
//     };
// }
// export default connect(mapStateToProps, null)(HomeDetails);