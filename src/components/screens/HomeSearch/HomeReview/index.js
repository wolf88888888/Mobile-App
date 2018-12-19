import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';//eslint-disable-line
import Toast from 'react-native-easy-toast';

import BackButton from '../../../atoms/BackButton';
import ReviewTitle from '../../../molecules/ReviewTitle';
import ReviewListItem from '../../../atoms/Property/ReviewListItem';
import ReviewDetailItem from '../../../atoms/Property/ReviewDetailItem';
import HomeDetailBottomBar from '../../../atoms/HomeDetailBottomBar'

import styles from './styles';

class HomeReview extends Component {
    
    constructor(props) {
        super(props);
        
        const { params } = this.props.navigation.state;
        this.state = {
            itemGuests: [],
            guests: params.guests < params.guestsIncluded ? params.guests : params.guestsIncluded
        }
        //console.log("param", props.navigation.state.params);
    }

    componentDidMount() {
        let itemGuests = [];
        const { params } = this.props.navigation.state;
        for (let i = 1; i <= params.guestsIncluded; i ++) {
            itemGuests = [...itemGuests, 
                {
                    label: i == 1 ?  "1 Guest" : i + " Guests",
                    value: i,
                }
            ]
        }
        this.setState({itemGuests: itemGuests});
    }

    onClose = () => {
        this.props.navigation.goBack();
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
        // return price / nights;
        return price;
    }

    gotoConfirm = () => {
        console.log("gotoConfirm", this.state.guests);
        if (this.state.guests == 0) {
            this.refs.toast.show('Please Select Guest Number.', 1500);
            return;
        }
        const { params } = this.props.navigation.state;

        this.props.navigation.navigate('HomeRequestConfirm', {
            homeID: params.homeID, 
            title: params.title,
            address: params.address,
            startDate: params.startDate, 
            endDate:params.endDate,
            checkInDate: params.checkInDate,
            checkOutDate: params.checkOutDate,
            nights: params.nights,
            cleaningFee: params.cleaningFee,
            calendar: params.calendar,
            guests: this.state.guests,
            currencyCode: params.currencyCode
            // guestsIncluded: params.homeData.guestsIncluded
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        console.log("HomeReview-------", params);

        const { currencyCode } = params;
        // const { exchangeRates, currency } = this.props;

        const price = this.getPriceForPeriod(params.startDate, params.nights, params.calendar);
        // const defaultPrice = CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, currency, price);
        // const fiatPriceInRoomsXMLCurrency = CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, RoomsXMLCurrency.get(), price);

        const cleaningFee = params.cleaningFee * params.nights;
        // const defaultCleaningFee = CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, currency, cleaningFee);
        // const fiatCleaningFeeInRoomsXMLCurrency = CurrencyConverter.convert(exchangeRates.currencyExchangeRates, currencyCode, RoomsXMLCurrency.get(), cleaningFee);
        
        // console.log("HomeReview-------", price, defaultPrice, fiatPriceInRoomsXMLCurrency);

        return (
            <View style={styles.container}>
                <BackButton onPress={this.onClose}/>
                
                <ReviewTitle
                    style={{marginTop: 5}}
                    pageNumber="Review Room Details"
                    text={params.title}
                    extra={params.address} />

                <ReviewListItem
                    textFirst="Dates"
                    textLast = {params.checkInDate + " - " + params.checkOutDate} />

                <View style={{marginTop:20, height: 50, marginHorizontal: 20,  borderRadius: 4, borderWidth: 0.75, borderColor: '#d6d7da'}}>
                    <RNPickerSelect
                        items={this.state.itemGuests}
                        placeholder={{
                            label: 'Select number of guests',
                            value: 0
                        }}
                        onValueChange={(value) => {
                            this.setState({
                                guests: value
                            });
                        }}
                        value={this.state.guests}
                        style={{ ...pickerSelectStyles }}
                    />    
                </View>
                
                <ReviewDetailItem
                    title = {params.nights === 1 ?  params.nights + " night" : params.nights + " nights" }
                    fiat = {price}
                    currencyCode = {currencyCode}
                    styleContainer = {{marginTop: 15}}
                    styleLast={{color:'#000'}}/>

                <ReviewDetailItem
                    title = "Cleaning fee"
                    fiat = {cleaningFee}
                    currencyCode = {currencyCode}
                    styleContainer = {{marginTop: 15}}
                    styleLast={{color:'#000'}}/>

                <View style={[styles.lineStyle, { marginLeft: 20, marginRight: 20, marginTop: 15}]} /> 

                <ReviewDetailItem
                    title = "Total"
                    fiat = {price + cleaningFee}
                    currencyCode = {currencyCode}
                    styleContainer = {{marginTop: 15}}
                    styleLast={{color:'#000'}}/>
                    
                {/* <ReviewListItem
                    textFirst = "Total"
                    textLast = {this.props.currencySign + ((defaultPrice + defaultCleaningFee) * params.nights).toFixed(2) }
                    styleContainer = {{marginTop: 15}}
                    styleFirst = {{color:'#000', fontFamily: 'FuturaStd-Medium', fontSize: 16}}
                    styleLast = {{color:'#000', fontFamily: 'FuturaStd-Medium', fontSize: 16}}/> */}

                {/* <ReviewListItem
                    textFirst= { "LOC" + locPrice.toFixed(2) + " x " + params.nights + " nights"}
                    textLast = { "LOC" + (locPrice * params.nights).toFixed(2) }
                    styleContainer = {{marginTop: 15}}
                    styleLast={{color:'#000'}}/>

                <ReviewListItem
                    textFirst="Cleaning fee"
                    textLast = { "LOC" + (locCleaningFee * params.nights).toFixed(2) }
                    styleContainer = {{marginTop: 15}}
                    styleLast={{color:'#000'}}/>

                <ReviewListItem
                    textFirst = "Total"
                    textLast =  { "LOC" + ((locPrice + locCleaningFee) * params.nights).toFixed(2) }
                    styleContainer = {{marginTop: 15}}
                    styleFirst={{color:'#000', fontFamily: 'FuturaStd-Medium', fontSize: 16}}
                    styleLast={{color:'#000', fontFamily: 'FuturaStd-Medium', fontSize: 16}}/> */}

                {/* <View style={styles.floatingBar}>
                    <View style={styles.detailsView}>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price,styles.fontFuturaMed]}>{this.props.currencySign}{price.toFixed(2)} </Text>
                            <Text style={styles.period1}> /per night</Text>
                        </View>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaStd]}>LOC {parseFloat(locPrice).toFixed(2)}</Text>
                            <Text style={styles.period2}> /per night</Text>
                        </View>
                    </View>
                    <View style={styles.payButtonView}>
                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={this.gotoConfirm}
                        >
                            <Text style={styles.confirmPayText}>Agree & Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                
                <HomeDetailBottomBar 
                    price = {price + cleaningFee}
                    currencyCode = {currencyCode}
                    daysDifference = {params.nights}
                    titleBtn = {"Agree & Confirm"}
                    onPress = {this.gotoConfirm}/>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#DA7B61' }}
                    position='bottom'
                    positionValue={150}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={1.0}
                    textStyle={{ color: 'white', fontFamily: 'FuturaStd-Light' }}
                />
            </View>
        );
    }
}
HomeReview.propTypes = {
    // currency: PropTypes.string,
    // currencySign: PropTypes.string,
    guests: PropTypes.integer,
};

HomeReview.defaultProps = {
    // currency: "USD",
    // currencySign: "$",
    guests: 2,
};

// let mapStateToProps = (state) => {
//     return {
//         currency: state.currency.currency,
//         currencySign: state.currency.currencySign,
//         exchangeRates: state.exchangeRates,
//     };
// }


// export default connect(mapStateToProps, null)(HomeReview);
export default HomeReview;

const pickerSelectStyles = {
    height: 50,
    inputIOS: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        color: 'black'
    },

    inputAndroid: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 15,
    },

    underline: {
        borderTopWidth: 0,
        borderTopColor: '#888988',
        marginHorizontal: 4,
    },
};