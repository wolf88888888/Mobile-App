import { AsyncStorage, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, WebView } from 'react-native';
import React, { Component } from 'react';

import { HotelReservation } from '../../../services/blockchain/hotelReservation';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';
import moment from 'moment';
import requester from '../../../initDependencies';
import styles from './styles';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';

export default class RoomDetailsReview extends Component {
    constructor() {
        super();
        //this.handleSubmit = this.handleSubmit.bind(this);
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
            isLoading: false
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state; //eslint-disable-line
        console.log(params.guestRecord);
        const value = {
            quoteId: params.quoteId,
            rooms: [{
                adults: params.guestRecord
                ,
                'children': []
            }],
            'currency': 'USD'
        };

        requester.createReservation(value).then(res => {
            if (res.success){
                res.body.then(data => {
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

    handleSubmit() {

        this.setState({ modalVisible: false, isLoading: true });
        this.refs.toast.show('We are working on your transaction this might take some time.', 1500);

        requester.getCancellationFees(this.state.bookingId).then(res => {
            res.body.then(data => {
                const password = this.state.password;
                const preparedBookingId = this.state.bookingId;
                const booking = this.state.hotelBooking;
                const startDate = moment(booking.arrivalDate, 'YYYY-MM-DD');
                const endDate = moment(booking.arrivalDate, 'YYYY-MM-DD')
                    .add(booking.nights, 'days');
                const hotelId = booking.hotelId;
                const roomId = this.state.booking.quoteId;
                const cancellationFees = data;
                const daysBeforeStartOfRefund = [];
                const refundPercentages = [];
                const wei = (this.tokensToWei(this.state.data.locPrice.toString()));
                const numberOfTravelers = 2;

                requester.getMyJsonFile().then(res => {
                    res.body.then(data => {
                        setTimeout(() => {
                            HotelReservation.createReservation(//this line needs to be checked
                                data.jsonFile,
                                password,
                                preparedBookingId.toString(),
                                wei,
                                startDate.unix()
                                    .toString(),
                                endDate.unix()
                                    .toString(),
                                daysBeforeStartOfRefund,
                                refundPercentages,
                                hotelId,
                                roomId,
                                numberOfTravelers.toString()
                            )
                                .then(transaction => {
                                    this.setState({isLoading: false});
                                    this.refs.toast.show('' + transaction, 1500);
                                })
                                .catch((err) => {
                                    this.setState({isLoading: false});
                                    this.refs.toast.show('' + err, 1500);
                                });
                        }, 3000);
                    }).catch((err) => {
                        this.setState({isLoading: false});
                        this.refs.toast.show('' + err, 1500);
                    });
                });
            });
        }).catch((err) => {
            this.setState({isLoading: false});
            this.refs.toast.show('' + err, 1500);
        });
    }

    // Keys for flatlist
    _keyExtractor = (item, index) => item.key; //eslint-disable-line

    render() {
        const { params } = this.props.navigation.state;
        console.log(params);
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
                <View style={{ height: 0 }}>
                    <WebView
                        ref={el => this.webView = el}
                        source={{ html: '<html><body></body></html>' }}
                        onMessage={this.handleMessage}
                    />
                </View>
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
                                            source={require('../../../../src/assets/png/close.png')} />
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
                                onPress={() => this.runJSInBackground('window.postMessage("test")')}
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
                                <Text style={styles.walletPasswordLabel}>Cancellation Fee</Text>
                                <View style={styles.closeButtonView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setCancellationView(!this.state.cancellationView);
                                        }}
                                    >
                                        <Image style={styles.closeButtonSvg}
                                            source={require('../../../../src/assets/png/close.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ fontFamily: 'FuturaStd-Light' }}>USD {this.state.cancellationPrice} -
                                ({this.state.cancellationPrice}LOC)</Text>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={() => {
                                    this.setCancellationView(!this.state.cancellationView);
                                }}
                            >
                                <Text style={styles.confirmButtonText}>Hide</Text>
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
                            source={require('../../../../src/assets/png/arrow-back.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.steps}>STEP 2 OF 2</Text>
                        <Text style={styles.heading}>Review room details</Text>
                        <View style={styles.hotelInfoContainer}>
                            <View style={styles.hotelThumbView}>
                                <Image source={require('../../../../src/assets/apartment.png')}
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
                    message="Loading..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"/>
            </View>
        );
    }

    runJSInBackground(code) {
        this.webView.injectJavaScript(code)
    }

    handleMessage = (e) => {
        this.handleSubmit();
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
