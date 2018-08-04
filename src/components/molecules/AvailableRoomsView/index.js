import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
    ListView,
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes
} from 'react-native';
import React, { Component } from 'react';

import CardView from 'react-native-cardview'
import HotelDetails from '../../screens/HotelDetails';
import Icon from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import requester from '../../../initDependencies';
import styles from './styles';

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;

class AvailableRoomsView extends Component {

    static propTypes = {
        id: PropTypes.string,
        search: PropTypes.string,
        roomDetail: PropTypes.object,
        navigate: PropTypes.func,
        guests: PropTypes.number,
        hotelDetails: PropTypes.object,
        currencyIcon: PropTypes.object,
        locRate: PropTypes.number
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
        };
    }

    componentDidMount() {
        console.log("testingg");
        console.log(this.props.id);
        console.log(this.props.search);
        requester.getHotelRooms(this.props.id, this.props.search.split('&')).then(res => {
            if (res.success) {
                res.body.then(data => {
                    console.log(data);
                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    this.setState({ rooms: ds.cloneWithRows(this.sortArray(data, 'price')) });

                });
            } else {
                res.errors.then(data => {
                    const { errors } = data;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                            //console.log('Error:', errors[key].message);
                        }
                    });
                });
            }
        });
    }

    sortArray(array, key) {
        return array.sort(function (a, b) {
            console.log(a.roomsResults[0].price)
            return b.roomsResults[0].price > a.roomsResults[0].price ? -1
                : b.roomsResults[0].price < a.roomsResults[0].price ? 1
                    : 0
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Available Rooms</Text>
                <ListView
                    style={{ marginLeft: 0, marginRight: 0 }}
                    dataSource={this.state.rooms}
                    showsVeticalScrollIndicator={false}
                    renderRow={(rowData) =>
                        <CardView style={styles.listItem}
                            cardElevation={1.5}
                            cardMaxElevation={1.5}
                            cornerRadius={0}>
                            <Text style={styles.name}>{rowData.roomsResults[0].name + "(" + rowData.roomsResults[0].mealType + ")"}</Text>
                            <Text
                                style={styles.price}>
                                1 night:
                                <FontAwesome>{this.props.currencyIcon}

                                    {(rowData.roomsResults[0].price).toFixed(2)} {((rowData.roomsResults[0].price) / this.props.locRate).toFixed(2)} LOC</FontAwesome></Text>
                            {/* <Text style={styles.price}>{"1 night:" + Number(((parseFloat(rowData.roomsResults[0].price))).toFixed(2)) + " (" + rowData.roomsResults[0].price + "LOC)"}</Text> */}
                            <TouchableOpacity onPress={this.onRoomPress.bind(this, rowData)}>
                                <Text style={styles.book}>Book Now</Text>
                            </TouchableOpacity>
                        </CardView>
                    }
                />
            </View>
        );
    }
    onRoomPress = (roomDetail) => {
        this.props.navigate('GuestInfoForm', { roomDetail: roomDetail, guests: this.props.guests, 'price': Number(((parseFloat(roomDetail.roomsResults[0].price) * 1.193)).toFixed(2)), 'priceLOC': roomDetail.roomsResults[0].price, 'hotelDetails': this.props.hotelDetails });
    }
}

export default AvailableRoomsView;
