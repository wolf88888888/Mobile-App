import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Image from 'react-native-remote-svg';
import styles from './styles';
import { testBook,getCancellationFees,getCurrentlyLoggedUserJsonFile } from '../../../utils/requester';
import {HotelReservation} from '../../../services/blockchain/hotelReservation';
import Toast from 'react-native-simple-toast';

export default class RoomDetailsReview extends Component {
    constructor() {
        super();
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            // links: [
            //     {
            //         key: 0,
            //         name: 'Room Type',
            //         rhs: 'Standard Room'
            //     },
            //     {
            //         key: 1,
            //         name: 'Dates',
            //         rhs: '25 Jan - 26 Jan'
            //     },
            //     {
            //         key: 2,
            //         name: 'Guests',
            //         rhs: '2 guests'
            //     },
            //     {
            //         key: 3,
            //         name: 'Cancellation Fees',
            //         rhs: 'Show'
            //     }
            // ],
            modalVisible: false,
            cancellationView: false,
            walletPassword: '',
            password : '',
            // bookingDetail:[],
            roomName: '',
            arrivalDate: '',
            creationDate: '',
            // cancellationLOCPrice: '',
            cancellationPrice: '',
            bookingId : '',
            hotelBooking : '',
            booking : '',
            data : ''
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state //eslint-disable-line
        const value = {
            quoteId: params.quoteId,
            rooms:[{
                adults: params.guestRecord
                ,"children":[]}],
                "currency":"USD"};

        testBook(value)
            .then(res => res.response.json())
            .then((parsed) => {
                console.log(parsed);
                const bookingId = parsed.preparedBookingId;
                const hotelBooking = parsed.booking.hotelBooking[0];
                const startDate = moment(parsed.booking.hotelBooking[0].creationDate, 'YYYY-MM-DD');
                const endDate = moment(parsed.booking.hotelBooking[0].arrivalDate, 'YYYY-MM-DD');
                this.setState({
                    // bookingDetail: parsed,
                    roomName: parsed.booking.hotelBooking[0].room.roomType.text,
                    arrivalDate: endDate.format('DD MMM'),
                    creationDate: startDate.format('DD MMM'),
                    cancellationPrice: parsed.fiatPrice,
                    bookingId : bookingId,
                    hotelBooking : hotelBooking,
                    booking: value,
                    data: parsed
                    // cancellationLOCPrice: parsed.locPrice,
                });
            })
            .catch((err) => {
                Toast.showWithGravity("Access to one of the quotes failed. The quote is no longer available.", Toast.SHORT, Toast.CENTER);
                console.log(err); //eslint-disable-line
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

    handleSubmit(){
        this.setState({modalVisible: false,});
        Toast.showWithGravity('We are working on your transaction this might take some time.', Toast.SHORT, Toast.CENTER);
        //const value = await AsyncStorage.getItem(`${domainPrefix}.auth.lockchain`);
        getCancellationFees(this.state.bookingId)
            .then(res => res.response.json())
            .then((json) => {
                const password = this.state.password;
                const preparedBookingId = this.state.bookingId;
                const booking = this.state.hotelBooking;
                const startDate = moment(booking.arrivalDate, 'YYYY-MM-DD');
                const endDate = moment(booking.arrivalDate, 'YYYY-MM-DD').add(booking.nights, 'days');
                const hotelId = booking.hotelId;
                const roomId = this.state.booking.quoteId;
                const cancellationFees = json;
                const daysBeforeStartOfRefund = [];
                const refundPercentages = [];
                const wei = (this.tokensToWei(this.state.data.locPrice.toString()));
                const numberOfTravelers = 2;

                getCurrentlyLoggedUserJsonFile()
                .then(res => res.response.json())
                // here you set the response in to json
                .then((json) => {
                    setTimeout(() => {
                        HotelReservation.createReservation(
                            json.jsonFile,
                            password,
                            preparedBookingId.toString(),
                            wei,
                            startDate.unix().toString(),
                            endDate.unix().toString(),
                            daysBeforeStartOfRefund,
                            refundPercentages,
                            hotelId,
                            roomId,
                            numberOfTravelers.toString()
                          ).then(transaction => {
                                Toast.showWithGravity(""+transaction, Toast.SHORT, Toast.CENTER);
                            // const bookingConfirmObj = {
                            //   bookingId: preparedBookingId,
                            //   transactionHash: transaction.hash
                            })
                            .catch((err) => {
                                Toast.showWithGravity(""+err, Toast.SHORT, Toast.CENTER);
                            });
                      }, 3000);
                })
                .catch((err) => {
                    Toast.showWithGravity(""+err, Toast.SHORT, Toast.CENTER);
                });
            })
            .catch((err) => {
                Toast.showWithGravity(""+err, Toast.SHORT, Toast.CENTER);
            });
    }

    // Keys for flatlist
    _keyExtractor = (item, index) => item.key; //eslint-disable-line

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
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
                                            this.setState({modalVisible:false}); //eslint-disable-line
                                        }}
                                    >
                                        <Image style={styles.closeButtonSvg} source={require('../../../../src/assets/png/close.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TextInput
                                style={styles.walletPasswordInput}
                                onChangeText={walletPassword => this.setState({ password : walletPassword })}
                                value={this.state.password}
                                placeholder="Wallet password"
                                secureTextEntry={true}
                            />
                            <TouchableOpacity 
                                style={styles.confirmButton} 
                                onPress={() => this.handleSubmit()}
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
                                        <Image style={styles.closeButtonSvg} source={require('../../../../src/assets/png/close.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ fontFamily: 'FuturaStd-Light' }}>USD {this.state.cancellationPrice} - ({this.state.cancellationPrice}LOC)</Text>
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
                <ScrollView >
                    {/* Back Button */}
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }} style={styles.backButton}>
                        <Image
                            style={styles.btn_backImage}
                            source={require('../../../../src/assets/png/arrow-back.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.steps}>STEP 2 OF 2</Text>
                        <Text style={styles.heading}>Review Room Details</Text>
                        <View style={styles.hotelInfoContainer}>
                            <View style={styles.hotelThumbView}>
                                <Image source={require('../../../../src/assets/apartment.png')} style={styles.hotelThumb} />
                            </View>
                            <View style={styles.hotelInfoView}>
                                <Text style={styles.hotelName}>{params.hotelDetails.name}</Text>
                                <Text style={styles.hotelPlace}>{params.hotelDetails.additionalInfo.mainAddress}</Text>
                            </View>
                        </View>
                    </View>
                    {/* Button list displayed using flat list */}
                    <View style={styles.listItem}>
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
                            <Text style={styles.rhs}>{this.state.creationDate} - {this.state.arrivalDate}</Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.listItemNameWrapper}>
                            <Text style={styles.listItemText}>Guests</Text>
                        </View>
                        <View style={styles.listItemRhsWrapper}>
                            <Text style={styles.rhs}>2</Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.listItemNameWrapper}>
                            <Text style={styles.listItemText}>Cancellation Fees</Text>
                        </View>
                        <View style={styles.listItemRhsWrapper}>
                            <TouchableOpacity
                                onPress={() => { this.setCancellationView(true); }}
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
                            <Text style={[styles.price, styles.bold400]}>${params.price}</Text>
                            <Text style={styles.period1}> for 1 nights</Text>
                        </View>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaStd]}>{params.priceLOC} LOC</Text>
                            <Text style={styles.period2}> for 1 nights</Text>
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
};

RoomDetailsReview.propTypes = {
    hotelName: PropTypes.string, //eslint-disable-line
    hotelAddress: PropTypes.string,//eslint-disable-line
    priceInUserCurreny: PropTypes.number,//eslint-disable-line
    priceInLoc : PropTypes.number,//eslint-disable-line
    guests : PropTypes.array,//eslint-disable-line
};
