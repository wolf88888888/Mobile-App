import {
    Dimensions,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';//eslint-disable-line
import Toast from 'react-native-easy-toast';

import BackButton from '../../atoms/BackButton';
import ReviewTitle from '../../molecules/ReviewTitle';
import ReviewListItem from '../../atoms/Property/ReviewListItem';

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
        return price / nights;
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
            // cleaningFee: params.homeData.cleaningFee,
            calendar: params.calendar,
            rateExchange: params.rateExchange,
            guests: this.state.guests,
            // guestsIncluded: params.homeData.guestsIncluded
        });
    }

    render() {
        const { params } = this.props.navigation.state;

        const locRate = _.isString(this.props.locRate) ? parseFloat(this.props.locRate) : this.props.locRate;
        const price = this.getPriceForPeriod(params.startDate, params.nights, params.calendar) * params.rateExchange;
        const cleaningFee = params.cleaningFee * params.rateExchange;

        const locPrice = price/locRate;
        const locCleaningFee = cleaningFee/locRate;

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
                
                <ReviewListItem
                    textFirst = { this.props.currencySign + price.toFixed(2) + " x " + params.nights + " nights" }
                    textLast = { this.props.currencySign + (price * params.nights).toFixed(2) }
                    styleContainer = {{marginTop: 15}}
                    styleLast={{color:'#000'}}/>

                <ReviewListItem
                    textFirst = "Cleaning fee"
                    textLast = { this.props.currencySign + (cleaningFee * params.nights).toFixed(2) }
                    styleContainer = {{marginTop: 15}}
                    styleLast = {{color:'#000'}}/>

                <ReviewListItem
                    textFirst = "Total"
                    textLast = {this.props.currencySign + ((price + cleaningFee) * params.nights).toFixed(2) }
                    styleContainer = {{marginTop: 15}}
                    styleFirst = {{color:'#000', fontFamily: 'FuturaStd-Medium', fontSize: 16}}
                    styleLast = {{color:'#000', fontFamily: 'FuturaStd-Medium', fontSize: 16}}/>

                <View style={[styles.lineStyle, { marginLeft: 20, marginRight: 20, marginTop: 15}]} />

                <ReviewListItem
                
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
                    styleLast={{color:'#000', fontFamily: 'FuturaStd-Medium', fontSize: 16}}/>

                <View style={styles.floatingBar}>
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
                </View>
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
    currency: PropTypes.string,
    currencySign: PropTypes.string,
    locRate: PropTypes.float,
    guests: PropTypes.integer,
};

HomeReview.defaultProps = {
    currency: "USD",
    currencySign: "$",
    locRate: 1.0,
    guests: 3,
};

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        locRate: state.currency.locRate
    };
}


export default connect(mapStateToProps, null)(HomeReview);

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