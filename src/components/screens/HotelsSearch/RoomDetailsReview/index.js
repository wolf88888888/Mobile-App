import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { HotelReservation } from '../../../../services/blockchain/hotelReservation';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';
import moment from 'moment';
import requester from '../../../../initDependencies';
import styles from './styles';
import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import { setLocRateFiatAmount } from '../../../../redux/action/exchangeRates';

import DetailBottomBar from '../../../atoms/DetailBottomBar'

class RoomDetailsReview extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            cancellationView: false,
            walletPassword: '',
            password: '',
            // bookingDetail:[],
            roomName: '',
            arrivalDate: '',
            leavingDate: '',
            creationDate: '',
            // cancellationLOCPrice: '',
            cancellationPrice: '',
            bookingId: '',
            hotelBooking: '',
            booking: '',
            data: '',
            isLoading: false,
            cancelationDate: ''
        };
    }

    componentDidMount() {
        this.refs.toast.show("Confirming Rooms", 1500);
        const { params } = this.props.navigation.state; //eslint-disable-line
        console.log(params.guestRecord);
        const value = {
            quoteId: params.quoteId,
            rooms: [{
                adults: params.guestRecord
                ,
                'children': []
            }],
            'currency': params.currency
        };

        console.log("createReservationcreateReservation  ---", value)
        requester.createReservation(value).then(res => {
            console.log("createReservation  ---", res)
            if (res.success){
                console.log("createReservation  ---", res)
                res.body.then(data => {
                    // console.log("createReservation  ---", data)
                    const bookingId = data.preparedBookingId;
                    const hotelBooking = data.booking.hotelBooking[0];
                    const startDate = moment(data.booking.hotelBooking[0].creationDate, 'YYYY-MM-DD');
                    const endDate = moment(data.booking.hotelBooking[0].arrivalDate, 'YYYY-MM-DD');
                    const leavingDate = moment(data.booking.hotelBooking[0].arrivalDate, 'YYYY-MM-DD')
                    .add(data.booking.hotelBooking[0].nights, 'days');
                    this.setState({
                        // bookingDetail: data,
                        roomName: data.booking.hotelBooking[0].room.roomType.text,
                        arrivalDate: endDate.format('DD MMM'),
                        leavingDate: leavingDate.format('DD MMM'),
                        cancelationDate: endDate.format('DD MMM YYYY'),
                        creationDate: startDate.format('DD MMM'),
                        cancellationPrice: data.fiatPrice,
                        bookingId: bookingId,
                        hotelBooking: hotelBooking,
                        booking: value,
                        data: data
                        // cancellationLOCPrice: data.locPrice,
                    });
                }).catch((err) => {
                    console.log(err); //eslint-disable-line
                });
            }
            else {
                res.errors.then(data => {
                    console.log(data.errors);
                    console.log(data.errors.RoomsXmlResponse.message);
                    this.refs.toast.show(data.errors.RoomsXmlResponse.message, 5000);
                });
            }
        }).catch((main_err) => {
            this.refs.toast.show("Error", 1500);
            console.log("Error Room");
            console.log(main_err);
        });
    }

    // Control Modal Visibility
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setCancellationView(visible) {
        this.setState({ cancellationView: visible });
    }

    tokensToWei(tokens) {
        let index = tokens.indexOf('.');
        let trailingZeroes = 0;
        let wei = '';
        if (index === -1) {
            trailingZeroes = 18;
        } else {
            trailingZeroes = 18 - (tokens.length - 1 - index);
        }

        wei = tokens.replace(/[.,]/g, '');
        if (trailingZeroes >= 0) {
            wei = wei + '0'.repeat(trailingZeroes);
        } else {
            wei = wei.substring(0, index + 18);
        }

        return wei;
    }

    requestLockOnQuoteId(paymentMethod) {
        const { params } = this.props.navigation.state;
        const quoteId = params.quoteId;
        if (quoteId) {
            const body = { quoteId, paymentMethod };
            console.log(body);
            return requester.markQuoteIdAsLocked(quoteId, body)
                .then(res => res.body)
                .then(res => {
                    return new Promise((resolve, reject) => {
                        console.log("-----------", res);
                        if (res.success) {
                            resolve(true);
                        } else {
                            // this.redirectToHotelDetailsPage();
                            reject(false);
                        }
                    });
                }
            );
        }
    }

    approveQuote() {
        // this.isQuoteApproved = true;
    }
    
    stopQuote() {
        // Websocket.sendMessage(DEFAULT_QUOTE_LOC_ID, 'approveQuote', { bookingId: this.props.reservation.preparedBookingId });
    
        // this.setState({
        //   isQuoteStopped: true
        // });
    }
    
    restartQuote() {
        // Websocket.sendMessage(DEFAULT_QUOTE_LOC_ID, 'quoteLoc', { bookingId: this.props.reservation.preparedBookingId });
    
        // this.setState({
        //   isQuoteStopped: false
        // });
    }

    payWithLocSingleWithdrawer = () => {
        const { params } = this.props.navigation.state;
        // this.setState({ modalVisible: false });
        this.refs.toast.show('We are working on your transaction this might take some time.', 1000);
        setTimeout(() => {
            this.setState({ modalVisible: false, isLoading: true });
            // this.setState({ modalVisible: false });

            this.requestLockOnQuoteId('privateWallet').then( () => {
                console.log("requestLockOnQuoteId -- ");

                const { password } = this.state;
                const preparedBookingId = this.state.bookingId;
                const locAmount = params.priceLOC;
                
                const wei = (this.tokensToWei(locAmount.toString()));

                console.log(wei);

                const booking = this.state.hotelBooking;
                console.log("this.state.hotelBooking", this.state.hotelBooking);
                const endDate = moment.utc(booking.arrivalDate, 'YYYY-MM-DD').add(booking.nights, 'days');

                const queryString = params.searchString;
                console.log("this.state.hotelBooking", this.state.hotelBooking, endDate, queryString);

                requester.getMyJsonFile().then(res => {
                    res.body.then(data => {
                        console.log("getMyJsonFile -- ", data);

                        HotelReservation.createSimpleReservationSingleWithdrawer(
                            data.jsonFile,
                            password,
                            wei.toString(),
                            endDate.unix().toString(),
                        ).then(transaction => {
                            console.log('transaction', transaction);
                            setTimeout(() => {
                                this.setState({isLoading: false}, ()=>{
                                    const bookingConfirmObj = {
                                        bookingId: preparedBookingId,
                                        transactionHash: transaction.hash,
                                        queryString: queryString,
                                        locAmount
                                    };
                    
                                    requester.confirmBooking(bookingConfirmObj).then(() => {
                                        // NotificationManager.success('LOC Payment has been initiated. We will send you a confirmation message once it has been processed by the Blockchain.', '', LONG);
                                        this.refs.toast.show('LOC Payment has been initiated. We will send you a confirmation message once it has been processed by the Blockchain.', 2000);
                                        setTimeout(() => {
                                            this.props.navigation.pop(5);
                                        }, 2000);
                                    }).catch(error => {
                                        this.restartQuote();
                                        this.refs.toast.show('Something with your transaction went wrong...', 2000);
                                        console.log(error);
                                    });
                                });
                            }, 1000);
                            
                        }).catch(error => {
                            console.log("--------payWithLocSingleWithdrawer------", error);
                            this.restartQuote();
                            this.setState({isLoading: false }, () => {
                                setTimeout(() => {
                                    if (error.hasOwnProperty('message')) {
                                        if (error.message === 'nonce too low') {
                                            this.refs.toast.show('You have a pending transaction. Please try again later.', 2000);
                                        } else {
                                            this.refs.toast.show(error.message, 2000);
                                        }
                                    } 
                                    else if (error.hasOwnProperty('err') && error.err.hasOwnProperty('message')) {
                                        this.refs.toast.show(error.err.message, 2000);
                                    } 
                                    else if (typeof x === 'string') {
                                        console.log("--------payWithLocSingleWithdrawer string------", error);
                                        this.refs.toast.show(error, 2000);
                                    } 
                                    else {
                                        console.log("--------payWithLocSingleWithdrawer else------", error);
                                        this.refs.toast.show(error, 2000);
                                    }
                                }, 1000);
                            });
                            // this.setState({ userConfirmedPaymentWithLOC: false });
                        });
                    })
                });
            });
        }, 1000);
    }

    // Keys for flatlist
    _keyExtractor = (item, index) => item.key; //eslint-disable-line

    render() {
        const { params } = this.props.navigation.state;
        // console.log(params);
        // console.log(this.state);
        return (
            <View style={styles.container}>
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
                <Modal
                    animationType="fade"
                    transparent={true}//eslint-disable-line
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.popup}>
                            <View style={styles.labelCloseView}>
                                <Text style={styles.walletPasswordLabel}>Enter your wallet password</Text>
                                <View style={styles.closeButtonView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ modalVisible: false }); //eslint-disable-line
                                        }}
                                    >
                                        <Image style={styles.closeButtonSvg}
                                            source={require('../../../../../src/assets/png/close.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TextInput
                                style={styles.walletPasswordInput}
                                onChangeText={walletPassword => this.setState({ password: walletPassword })}
                                value={this.state.password}
                                placeholder="Wallet password"
                                underlineColorAndroid="rgba(0,0,0,0)"
                                secureTextEntry={true}
                            />
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={this.payWithLocSingleWithdrawer}
                            >
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* Cancellation Fee Button View start */}
                <Modal
                    animationType="fade"
                    transparent={true}//eslint-disable-line
                    visible={this.state.cancellationView}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.popup}>
                            <View style={styles.labelCloseView}>
                                <Text style={styles.walletPasswordLabel}>Cancellation Condition</Text>
                                <View style={styles.closeButtonView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setCancellationView(!this.state.cancellationView);
                                        }}
                                    >
                                        <Image style={styles.closeButtonSvg}
                                            source={require('../../../../../src/assets/png/close.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flexDirection: 'column', marginTop: 10}}>
                                <Text style={{ fontFamily: 'FuturaStd-Light'}}>Cancellation fee before {this.state.cancelationDate}</Text>
                                <Text style={{ fontFamily: 'FuturaStd-Light' }}>{params.currency} 0.00 (0.0000 LOC)</Text>
                            </View>
                            <View style={{flexDirection: 'column', marginTop: 10}}>
                                <Text style={{ fontFamily: 'FuturaStd-Light'}}>Cancel on {this.state.cancelationDate}</Text>
                                <Text style={{ fontFamily: 'FuturaStd-Light' }}>{params.currency} {this.state.cancellationPrice} -
                                ({this.state.cancellationPrice} LOC)</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={() => {
                                    this.setCancellationView(!this.state.cancellationView);
                                }}
                            >
                                <Text style={styles.confirmButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* Cancellation Fee Button View end */}
                <ScrollView>
                    {/* Back Button */}
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }} >
                        <Image
                            style={styles.btn_backImage}
                            source={require('../../../../../src/assets/png/arrow-back.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.steps}>STEP 2 OF 2</Text>
                        <Text style={styles.heading}>Review room details</Text>
                        <View style={styles.hotelInfoContainer}>
                            <View style={styles.hotelThumbView}>
                                <Image source={require('../../../../../src/assets/apartment.png')}
                                    style={styles.hotelThumb} />
                            </View>
                            <View style={styles.hotelInfoView}>
                                <Text style={styles.hotelName}>{params.hotelDetails.name}</Text>
                                <Text style={styles.hotelPlace}>{params.hotelDetails.additionalInfo.mainAddress}</Text>
                            </View>
                        </View>
                    </View>
                    {/* Button list displayed using flat list */}
                    <View style={[styles.listItem, {marginTop: 16}]}>
                        <View style={styles.listItemNameWrapper}>
                            <Text style={styles.listItemText}>Room Type</Text>
                        </View>
                        <View style={styles.listItemRhsWrapper}>
                            <Text style={styles.rhs}>{this.state.roomName}</Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.listItemNameWrapper}>
                            <Text style={styles.listItemText}>Dates</Text>
                        </View>
                        <View style={styles.listItemRhsWrapper}>
                            <Text style={styles.rhs}>{this.state.arrivalDate} - {this.state.leavingDate}</Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.listItemNameWrapper}>
                            <Text style={styles.listItemText}>Guests</Text>
                        </View>
                        <View style={styles.listItemRhsWrapper}>
                            <Text style={styles.rhs}>{params.guests}</Text>
                        </View>
                    </View>
                    
                    {/* Get Cancellation Fees */}
                    <View style={styles.listItem}>
                        <View style={styles.listItemNameWrapper}>
                            <Text style={styles.listItemText}>Cancellation Fees</Text>
                        </View>
                        <View style={styles.listItemRhsWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setCancellationView(true);
                                }}
                            >
                                <Text style={styles.rhs}>Show</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>

                {/* Bottom Bar */}
                {/* <DetailBottomBar 
                    price = {params.price}
                    daysDifference = {params.daysDifference}
                    titleBtn = {"Confirm and Pay"}
                    onPress = {() => {this.setModalVisible(true);}}
                    /> */}
                <View style={styles.floatingBar}>
                    <View style={styles.detailsView}>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price,styles.fontFuturaMed]}>${params.price} </Text>
                            <Text style={styles.period1}> for {params.daysDifference} nights</Text>
                        </View>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaStd]}>{params.priceLOC} LOC</Text>
                            <Text style={styles.period2}> for {params.daysDifference} nights</Text>
                        </View>
                    </View>
                    <View style={styles.payButtonView}>
                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={() => {
                                this.setModalVisible(true);
                            }}
                        >
                            <Text style={styles.confirmPayText}>Confirm and Pay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ProgressDialog
                    visible={this.state.isLoading}
                    title="Please Wait"
                    message="Processing..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"/>
            </View>
        );
    }
}

RoomDetailsReview.defaultProps = {
    hotelName: 'Inner Test Hotel',
    hotelAddress: 'Inner Kensington road',
    priceInUserCurreny: 500.14,
    priceInLoc: 49.3,
    guests: [
        {
            key: 0,
            genderRepresentation: 'Mr',
            firstName: '',
            lastName: ''
        },
        {
            key: 1,
            genderRepresentation: 'Mrs',
            firstName: '',
            lastName: ''
        },
        {
            key: 2,
            genderRepresentation: 'Mrs',
            firstName: '',
            lastName: ''
        }
    ]
};

RoomDetailsReview.propTypes = {
    hotelName: PropTypes.string, //eslint-disable-line
    hotelAddress: PropTypes.string,//eslint-disable-line
    priceInUserCurreny: PropTypes.number,//eslint-disable-line
    priceInLoc: PropTypes.number,//eslint-disable-line
    guests: PropTypes.array,//eslint-disable-line
};



let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        
        isLocPriceWebsocketConnected: state.exchangerSocket.isLocPriceWebsocketConnected,
        locAmounts: state.locAmounts,
        exchangeRates: state.exchangeRates,
    };
}

const mapDispatchToProps = dispatch => ({
    setLocRateFiatAmount : bindActionCreators(setLocRateFiatAmount , dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailsReview);
// export default RoomDetailsReview;
// testBookParameter: {
    //     "quoteId":"249357191-0",
    //         "rooms":[{
    //             "adults":[{
    //                     "title":"Mr","firstName":"test","lastName":"test"
    //                 },{
    //                     "title":"Mr","firstName":"test","lastName":"test"}
    //             ],"children":[]
    //         }],
    //         "currency":"USD"
    // }



//     Cancellation fee before 27 Sep 2018 including	USD 0.00 (0.0000 LOC)
// Cancel on 27 Sep 2018	USD 424.47 (890.6885 LOC)
