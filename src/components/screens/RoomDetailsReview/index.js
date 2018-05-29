import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList, Modal, TextInput} from 'react-native';
import Image from 'react-native-remote-svg';
import styles from './styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import Requester, { testBook } from '../../../utils/requester';
// import { testBook, } from '../../../utils/requester';

export default class RoomDetailsReview extends Component {
    
    constructor() {
        super();
        this.state = {
            links: [
                {
                    key: 0,
                    name: 'Room Type',
                    rhs: 'Standard Room'
                },
                {
                    key: 1,
                    name: 'Dates',
                    rhs: '25 Jan - 26 Jan'
                },
                {
                    key: 2,
                    name: 'Guests',
                    rhs: '2 guests'
                },
                {
                    key: 3,
                    name: 'Cancellation Fees',
                    rhs: 'Show'
                }
            ],
            modalVisible: false,
            cancellationView: false,
            walletPassword: '',
            bookingDetail:[],
            roomName: '',
            arrivalDate: '',
            creationDate:'',
            cancellationLOCPrice: '',
            cancellationPrice: '',
            
        }
    }

    // Control Modal Visibility
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setCancellationView(visible) {
        this.setState({cancellationView: visible});
    }

    componentDidMount() {
        // const booking = JSON.parse(decodeURI(searchParams.get('booking')));
        const {params} = this.props.navigation.state
        var value = {
            "quoteId":'249426531-1',
                "rooms":[{
                    "adults":[{
                            "title":"Mr","firstName":"test","lastName":"test"
                        },{
                            "title":"Mr","firstName":"test","lastName":"test"}
                    ],"children":[]
                }],
                "currency":"USD"
        }
        console.log(value)
        testBook(value)
        .then(res => res.response.json())
        // here you set the response in to json 
        .then(parsed => {
            console.log('sanan here is res')
            // here you parse your json
            // here you set you data from json into your variables
            //const startDate = moment(parsed.booking.hotelBooking[0].creationDate, 'DD/MM/YYYY HH:mm:ss');
            const startDate = moment(parsed.booking.hotelBooking[0].creationDate, 'YYYY-MM-DD');
            const endDate = moment(parsed.booking.hotelBooking[0].arrivalDate, 'YYYY-MM-DD');
            this.setState({
                bookingDetail : parsed,
                roomName: parsed.booking.hotelBooking[0].room.roomType.text,
                arrivalDate: endDate.format('DD MMM'),
                creationDate: startDate.format('DD MMM'),
                cancellationPrice: parsed.fiatPrice,
                cancellationLOCPrice: parsed.locPrice,
            });
        })
        .catch(err => {
            console.log(err);
            console.log('sanan you can\'t find res here')
        });
    }


    // Keys for flatlist
    _keyExtractor = (item, index) => item.key;

    render() {
        const {params} = this.props.navigation.state
        
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.modalView}>
                        <View style={styles.popup}>
                            <View style={styles.labelCloseView}>
                                <Text style={styles.walletPasswordLabel}>Enter your wallet password</Text>
                                <View  style={styles.closeButtonView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.goBack();;
                                        }}>
                                        <Image style={styles.closeButtonSvg} source={require('../../../../src/assets/svg/close.svg')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TextInput
                                style={styles.walletPasswordInput}
                                onChangeText={(walletPassword) => this.setState({walletPassword})}
                                value={this.state.walletPassword}
                                placeholder="Wallet password"
                            />
                            <TouchableOpacity style={styles.confirmButton}>
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* Cancellation Fee Button View start */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.cancellationView}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.modalView}>
                        <View style={styles.popup}>
                            <View style={styles.labelCloseView}>
                                <Text style={styles.walletPasswordLabel}>Cancellation Fee</Text>
                                <View  style={styles.closeButtonView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setCancellationView(!this.state.cancellationView);
                                        }}>
                                        <Image style={styles.closeButtonSvg} source={require('../../../../src/assets/svg/close.svg')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{fontFamily: 'FuturaStd-Light',}}>USD {this.state.cancellationPrice} - ({this.state.cancellationPrice}LOC)</Text>
                            {/* <TextInput
                                style={styles.walletPasswordInput}
                                onChangeText={(walletPassword) => this.setState({walletPassword})}
                                value={this.state.walletPassword}
                                placeholder="Wallet password"
                            /> */}
                            <TouchableOpacity style={styles.confirmButton} onPress={() => {
                                            this.setCancellationView(!this.state.cancellationView);
                                        }}>
                                <Text style={styles.confirmButtonText}>Hide</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* Cancellation Fee Button View end */}
                <ScrollView >
                    {/*Back Button*/}
                    <TouchableOpacity onPress={this.onBackPress} style={styles.backButton}>
                        <Image style={styles.btn_backImage}
                               source={require('../../../../src/assets/svg/arrow-back.svg')}/>
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.steps}>STEP 2 OF 2</Text>
                        <Text style={styles.heading}>Review Room Details</Text>
                        <View style={styles.hotelInfoContainer}>
                            <View style={styles.hotelThumbView}>
                                <Image source={require('../../../../src/assets/apartment.png')} style={styles.hotelThumb} />
                            </View>
                            <View style={styles.hotelInfoView}>
                                <Text style={styles.hotelName}>{this.props.hotelName}</Text>
                                <Text style={styles.hotelPlace}>{this.props.hotelAddress}</Text>
                            </View>
                        </View>
                    </View>
                    {/*Button list displayed using flat list*/}
                    
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
                                   <Text style={styles.rhs}>{this.state.guests}</Text>
                                </View>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.listItemNameWrapper}>
                                    <Text style={styles.listItemText}>Cancellation Fees</Text>
                                </View>
                                <View style={styles.listItemRhsWrapper}>
                                   <TouchableOpacity onPress={() => {
                                       this.setCancellationView(true);}}>
                        <Text style={styles.rhs}>Show</Text></TouchableOpacity>
                                </View>
                            </View>
                </ScrollView>

                {/*Bottom Bar*/}
                <View style={styles.floatingBar}>
                    <View style={styles.detailsView}>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.bold400]}>${this.props.priceInUserCurreny}</Text>
                            <Text style={styles.period1}> for 1 nights</Text>
                        </View>
                        <View style={styles.pricePeriodWrapper}>
                            <Text style={[styles.price, styles.fontFuturaStd]}>{this.props.priceInLoc} LOC</Text>
                            <Text style={styles.period2}> for 1 nights</Text>
                        </View>
                    </View>
                    <View style={styles.payButtonView}>
                        <TouchableOpacity style={styles.payButton}  onPress={() => {
                            this.setModalVisible(true);
                        }}>
                            <Text style={styles.confirmPayText}>Confirm and Pay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

RoomDetailsReview.defaultProps = {
    hotelName: 'Inner Test Hotel',
    hotelAddress: 'Inner Kensington road',
    priceInUserCurreny : 500.14,
    priceInLoc : 49.3,
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
    ],
    testBookParameter: {
        "quoteId":"249357191-0",
            "rooms":[{
                "adults":[{
                        "title":"Mr","firstName":"test","lastName":"test"
                    },{
                        "title":"Mr","firstName":"test","lastName":"test"}
                ],"children":[]
            }],
            "currency":"USD"
    }
}

RoomDetailsReview.propTypes = {
    hotelName: PropTypes.string,
    hotelAddress: PropTypes.string,
    priceInUserCurreny : PropTypes.number,
    priceInLoc : PropTypes.number,
    guests : PropTypes.array,
  };
