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
        currency: PropTypes.string,
        currencySign: PropTypes.string,
        locRate: PropTypes.number,
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
    }

    renderLoader() {
        return (
            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 10
            }}
            >
                <Image
                    style={{
                        height: 35, width: 35
                    }}
                    source={{
                        uri: 'https://alpha.locktrip.com/images/loader.gif'
                    }}
                />
            </View>
        );
    }

    componentDidMount() {
        requester.getHotelRooms(this.props.id, this.props.search.split('&')).then(res => {
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
            return b.roomsResults[0].price > a.roomsResults[0].price ? -1
                : b.roomsResults[0].price < a.roomsResults[0].price ? 1
                    : 0
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Available Rooms</Text>
                {!this.state.loading > 0 ? 
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
                            {this.props.daysDifference} nights:
                            { this.props.currencySign} {((rowData.roomsResults[0].price).toFixed(2) * this.props.daysDifference)} (LOC {(((rowData.roomsResults[0].price) / this.props.locRate).toFixed(2)*this.props.daysDifference)})</Text>
                        {/* <Text style={styles.price}>{"1 night:" + Number(((parseFloat(rowData.roomsResults[0].price))).toFixed(2)) + " (" + rowData.roomsResults[0].price + "LOC)"}</Text> */}
                        <TouchableOpacity onPress={this.onRoomPress.bind(this, rowData)}>
                            <Text style={styles.book}>Book Now</Text>
                        </TouchableOpacity>
                    </CardView>
                }
                />
                :
                this.renderLoader()
                }
            </View>
        );
    }
    onRoomPress = (roomDetail) => {
        this.props.navigate('GuestInfoForm', { roomDetail: roomDetail, guests: this.props.guests, 
            'price': ((roomDetail.roomsResults[0].price).toFixed(2) * this.props.daysDifference),
             'priceLOC': (((roomDetail.roomsResults[0].price) / this.props.locRate).toFixed(2)*this.props.daysDifference), 
             'daysDifference': this.props.daysDifference,
             'hotelDetails': this.props.hotelDetails });
    }
}

export default AvailableRoomsView;
