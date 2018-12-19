import {
    ListView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardView from 'react-native-cardview'
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import requester from '../../../initDependencies';
import LocPrice from '../../atoms/LocPrice'
import { RoomsXMLCurrency } from '../../../services/utilities/roomsXMLCurrency';
import { CurrencyConverter } from '../../../services/utilities/currencyConverter'
import styles from './styles';

class AvailableRoomsView extends Component {
    static propTypes = {
        id: PropTypes.string,
        search: PropTypes.string,
        roomDetail: PropTypes.object,
        guests: PropTypes.number,
        hotelDetails: PropTypes.object,
        currency: PropTypes.string,
        currencySign: PropTypes.string,
        daysDifference: PropTypes.number
    };

    static defaultProps = {
        id: '',
        search: '',
        guests: 0
    };

    constructor(props) {
        super(props);
        // this.onBooking = this.onBooking.bind(this);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            rooms: ds.cloneWithRows([]),
            loading: true
        };

        console.log ("AvailableRoomsView", props);
    }

    renderLoader() {
        return (
            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 10
            }}
            >
                <Image style={{width:35, height:35}} source={require('../../../assets/loader.gif')}/>
            </View>
        );
    }

    componentDidMount() {
        let request = this.props.search.replace(/\?/ig, "")
        requester.getHotelRooms(this.props.id, request.split('&')).then(res => {
            console.log("getHotelRooms", res);
            if (res.success) {
                res.body.then(data => {
                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    this.setState({ rooms: ds.cloneWithRows(this.sortArray(data, 'price')), loading: false });
                });
            } else {
                res.errors.then(data => {
                    const { errors } = data;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                        }
                    });
                });
            }
        });
    }

    sortArray(array, key) {
        return array.sort(function (a, b) {
            return b.roomsResults[0].price > a.roomsResults[0].price ? 
                    -1
                : 
                    (b.roomsResults[0].price < a.roomsResults[0].price ? 1 : 0)
        })
    }
    renderRoom = (rowData) => {
        const {
            exchangeRates, currency, currencySign, daysDifference, onBooking
        } = this.props;
        let price = undefined;
        if (rowData.roomsResults[0].price != undefined)
            price = exchangeRates.currencyExchangeRates && (CurrencyConverter.convert(exchangeRates.currencyExchangeRates, RoomsXMLCurrency.get(), currency, (rowData.roomsResults[0].price) * daysDifference)).toFixed(2);

        return (
            <TouchableOpacity onPress={() => {onBooking(rowData)}}>
                <CardView style={styles.listItem}
                    cardElevation={1.5}
                    cardMaxElevation={1.5}
                    cornerRadius={0}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode ={'tail'}>{rowData.roomsResults[0].name + "(" + rowData.roomsResults[0].mealType + ")"}</Text>
                    <View style={{flexDirection:'row'}}>                                
                        <Text
                            style={styles.price}>
                            {daysDifference} nights:
                            { currencySign} 
                            {rowData.roomsResults[0].price === undefined ? "" :
                            price}</Text>
                        {
                            rowData.roomsResults[0].price !== undefined
                            && (<LocPrice style={styles.price} fiat={rowData.roomsResults[0].price * daysDifference}/>)
                        }
                        {/* <Text style={styles.price}> (LOC {(((rowData.roomsResults[0].price) / this.props.locRate)*this.props.daysDifference).toFixed(2)})</Text> */}
                    </View>
                    {/* <Text style={styles.price}>{"1 night:" + Number(((parseFloat(rowData.roomsResults[0].price))).toFixed(2)) + " (" + rowData.roomsResults[0].price + "LOC)"}</Text> */}
                    
                    <Text style={styles.book}>Book Now</Text>
                </CardView>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Available Rooms</Text>
                {
                    !this.state.loading > 0 ? 
                        <ListView
                            style={{ marginLeft: 0, marginRight: 0 }}
                            dataSource={this.state.rooms}
                            showsVeticalScrollIndicator={false}
                            renderRow={this.renderRoom}/>
                    :
                        this.renderLoader()
                }
            </View>
        );
    }
    // onRoomPress = (roomDetail) => {
    //     console.log("onRoomPress", roomDetail, this.props);
    //     this.props.navigate('GuestInfoForm', { 
    //         roomDetail: roomDetail, 
    //         guests: this.props.guests, 
    //         'price': ((roomDetail.roomsResults[0].price) * this.props.daysDifference).toFixed(2),
    //         'priceLOC': (((roomDetail.roomsResults[0].price) / this.props.locRate)*this.props.daysDifference).toFixed(2), 
    //         'daysDifference': this.props.daysDifference,
    //         currency: this.props.currency,
    //         currencySign: this.props.currencySign,
    //         'hotelDetails': this.props.hotelDetails });
    // }
}

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        
        exchangeRates: state.exchangeRates,
    };
}

export default connect(mapStateToProps, null)(AvailableRoomsView);
// export default AvailableRoomsView;
