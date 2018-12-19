import {
    Dimensions,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Toast from 'react-native-easy-toast';
import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import requester from '../../../../initDependencies';
import BackButton from '../../../atoms/BackButton';
import ReviewTitle from '../../../molecules/ReviewTitle';
import ReviewInputView from '../../../atoms/Property/ReviewInputView';
import  { userInstance } from '../../../../utils/userInstance';
import HomeDetailBottomBar from '../../../atoms/HomeDetailBottomBar'

import styles from './styles';

class HomeRequestConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            phonenumber: '',
            email: '',
        }
    }

    async componentDidMount() {
        let firstName = await userInstance.getFirstName();
        let lastName = await userInstance.getLastName();
        let email = await userInstance.getEmail();
        let phoneNumber = await userInstance.getPhoneNumber();

        this.setState({
            firstname: firstName,
            lastname: lastName,
            phonenumber: phoneNumber,
            email: email,
        });
    }

    onClose = () => {
        this.props.navigation.goBack();
    }

    onChangeFirstName = (value) => {
        this.setState({firstname: value});
    }
    
    onChangeLastname = (value) => {
        this.setState({lastname: value});
    }
    
    onChangePhonenumber = (value) => {
        this.setState({phonenumber: value});
    }
    
    onChangeEmail = (value) => {
        this.setState({email: value});
    }

    isValidNames() {
        const { firstName, lastName, phoneNumber } = this.state;
    
        if (firstName === '' || lastName === '') {
            this.refs.toast.show('Please input firstnmae and lastname.', 1500);
            return false;
        }

        if (phoneNumber === '') {
            this.refs.toast.show('Please input phonenumber.', 1500);
            return false;
        }
    
        return true;
    }

    confirmBooking = () => {
        this.setState({ isRequesting: true });
        if (!this.isValidNames()) {
            return;
        }
        const { firstName, lastName, phoneNumber, email } = this.state;
        
        const { params } = this.props.navigation.state;

        const requestInfo = {
            listingId: params.homeID,
            checkin: params.startDate,
            checkout: params.endDate,
            guests: params.guests,
            name: firstName + ' ' + lastName,
            email: email,
            phone: phoneNumber,
        };

        requester.requestBooking(requestInfo).then(res => {
            console.log("ressss----", res);
            if (!res.success) {
                res.errors.then(e => {
                    this.refs.toast.show(e.message, 2500);
                });
            } else {
                res.body.then(data => {
                    console.log("requester.requestBooking", requester.requestBooking);
                    if (data.success) {
                        this.props.navigation.pop(5);
                        //this.props.history.push('/profile/trips/homes');
                    } else {
                        this.refs.toast.show(e.message, 2500);
                    }
                });
            }
            this.setState({ isRequesting: false });
        });
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

    render() {
        const { params } = this.props.navigation.state;
        const { currencyCode, cleaningFee, nights } = params;
        const price = this.getPriceForPeriod(params.startDate, params.nights, params.calendar);

        const totalPrice = price + cleaningFee * nights;

        return (
            <View style={styles.container}>
                <BackButton onPress={this.onClose}/>

                <ReviewTitle
                    style={{marginTop: 5}}
                    pageNumber="Comfirm and Pay"
                    text={params.title}
                    extra={params.address} 
                />

                <ReviewInputView
                    styleContainer = {{marginTop: 30}}
                    textFirst="First name"
                    textLast ={this.state.firstname}
                    onChangeText={this.onChangeFirstName}/>
                    
                <ReviewInputView
                    styleContainer = {{marginTop: 15}}
                    textFirst="Last name"
                    textLast ={this.state.lastname}
                    onChangeText={this.onChangeLastname}/>
                    
                <ReviewInputView
                    styleContainer = {{marginTop: 15}}
                    textFirst="Phone number"
                    textLast ={this.state.phonenumber}
                    onChangeText={this.onChangePhonenumber}/>

                <ReviewInputView
                    styleContainer = {{marginTop: 15}}
                    textFirst="Email"
                    textLast ={this.state.email}
                    onChangeText={this.onChangeEmail} />

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
                            onPress={this.confirmBooking}
                        >
                            <Text style={styles.confirmPayText}>Request Booking</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}

                
                <HomeDetailBottomBar 
                    price = { totalPrice }
                    currencyCode = { currencyCode }
                    daysDifference = {nights}
                    titleBtn = {"Request Booking"}
                    onPress = {this.confirmBooking}/>

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
                <ProgressDialog
                    visible={this.state.isRequesting}
                    title="Please Wait"
                    message="Reguesting..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"/>
            </View>
        );
    }
}
// HomeRequestConfirm.propTypes = {
//     currency: PropTypes.string,
//     currencySign: PropTypes.string,
// };

// HomeRequestConfirm.defaultProps = {
//     currency: "USD",
//     currencySign: "$",
// };

// let mapStateToProps = (state) => {
//     return {
//         currency: state.currency.currency,
//         currencySign: state.currency.currencySign,
//         locRate: state.currency.locRate
//     };
// }


// export default connect(mapStateToProps, null)(HomeRequestConfirm);
export default HomeRequestConfirm;
