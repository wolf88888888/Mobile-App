import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ListView,
    ViewPropTypes
} from 'react-native';
import Image from 'react-native-remote-svg';
import CardView from 'react-native-cardview'
import PropTypes from 'prop-types';
import styles from './styles';
import { getHotelRooms } from '../../../utils/requester';

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;

class AvailableRoomsView extends Component {

    static propTypes = {
        id: PropTypes.string,
        search: PropTypes.string,
        roomDetail: PropTypes.object,
        navigate: PropTypes.func
    };

    static defaultProps = {
        id: '',
        search: '',
    };

    constructor(props) {
        super(props);
        // this.onBooking = this.onBooking.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            rooms: ds.cloneWithRows([]),
        };
    }

    componentDidMount() {
        getHotelRooms(this.props.id, this.props.search).then((res) => {
            console.log(res);
            if (res.success) {
                res.response.json().then((data) => {
                    console.log("sucess", data);
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({rooms: ds.cloneWithRows(data)});
                });
            } else {
                res.response.then((response) => {
                    const { errors } = response;
                    Object.keys(errors).forEach((key) => {
                        if (typeof key !== 'function') {
                            console.log('Error:', errors[key].message);
                        }
                    });
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Available Rooms</Text>
                <ListView
                    style={{marginLeft:0, marginRight:0}}
                    dataSource={this.state.rooms}
                    showsVeticalScrollIndicator={false}
                    renderRow={(rowData) =>
                        <CardView style={styles.listItem}
                            cardElevation={1.5}
                            cardMaxElevation={1.5}
                            cornerRadius={0}>
                            <Text style={styles.name}>{rowData.roomsResults[0].name+"("+rowData.roomsResults[0].mealType+")"}</Text>
                            <Text style={styles.price}>{"1 night:$" + Number(((parseFloat(rowData.roomsResults[0].price) * 1.193)).toFixed(2)) + "(" + rowData.roomsResults[0].price + "LOC)"}</Text>
                            <TouchableOpacity onPress={this.onRoomPress.bind(this,rowData)}>
                                <Text style={styles.book}>Book Now</Text>
                            </TouchableOpacity>
                        </CardView>
                    }
               />
            </View>
        );
    }
    onRoomPress = (roomDetail) => {
        
        
        //console.log(this.props.roomDetail)
        this.props.navigate('GuestInfoForm', {roomDetail : roomDetail});
    }
}

export default AvailableRoomsView;