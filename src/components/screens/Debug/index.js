import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icons } from 'react-native-fontawesome';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import requester from '../../../initDependencies';
import styles from './styles';
import { withNavigation } from 'react-navigation';

//Bellow are details of hardcoded hotel
// const dummyHotel = {
//     "id": 51432,
//     "externalId": 4722881,
//     "name": "Bon Voyage Hotel Alexander",
//     "description": "on Voyage Hotel Alexander offers its business guests a conference room with maximum capacity of 40 seats arranged as follows:  theater ? 40 seats classroom ? 20 seats ?-shaped ? 15 seats meeting room ? 15 seats   The hall is daylight, with Wi-Fi Internet access and fully technically equipped for seminars, conferences, presentations, trainings and business meetings.   Bon Voyage Hotel Alexander offers coffee breaks, working lunches, business dinners, cocktail parties and corporate receptions, fully tailored to your requirements and budget..",
//     "price": 31.93,
//     "photos": [
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_1.jpg",
//       "RXLImages/7/SOF-9Uhotel_Recreational_Facilities_2.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_7.jpg",
//       "RXLImages/7/SOF-9Uhotel_Exterior_1.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_5.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_2.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_6.jpg",
//       "RXLImages/7/SOF-9Uhotel_Recreational_Facilities_3.jpg",
//       "RXLImages/7/SOF-9Uhotel_Lobby_1.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_10.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_4.jpg",
//       "RXLImages/7/SOF-9Uhotel_Exterior_2.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_8.jpg",
//       "RXLImages/7/SOF-9Uhotel_Recreational_Facilities_1.jpg",
//       "RXLImages/7/SOF-9Uhotel_Restaurant_1.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_3.jpg",
//       "RXLImages/7/SOF-9Uhotel_Guest_Room_9.jpg"
//     ],
//     "stars": 3,
//     "lat": "42.72611405936",
//     "lon": "23.263673186302",
//     "amenities": [
//       {
//         "text": "Conference Room",
//         "code": "ConferenceRoom",
//         "picture": null,
//         "id": 26
//       },
//       {
//         "text": "Money exchange",
//         "code": "MoneyExchange",
//         "picture": null,
//         "id": 19
//       },
//       {
//         "text": "IndividualAirCondition",
//         "code": "IndividualAirCondition",
//         "picture": null,
//         "id": 75
//       },
//       {
//         "text": "Direct Dial Telephone",
//         "code": "TelephoneInRoom",
//         "picture": null,
//         "id": 3
//       },
//       {
//         "text": "Room service",
//         "code": "RoomService",
//         "picture": "/amenities/images/hotels/room_service.svg",
//         "id": 41
//       },
//       {
//         "text": "Lift",
//         "code": "Lift",
//         "picture": null,
//         "id": 24
//       },
//       {
//         "text": "24hr. CheckIn",
//         "code": "CheckIn24hr",
//         "picture": null,
//         "id": 43
//       },
//       {
//         "text": "24hr. Reception",
//         "code": "Reception24hr",
//         "picture": null,
//         "id": 23
//       },
//       {
//         "text": "Shower",
//         "code": "Shower",
//         "picture": null,
//         "id": 73
//       },
//       {
//         "text": "Reception Area",
//         "code": "ReceptionArea",
//         "picture": null,
//         "id": 22
//       },
//       {
//         "text": "TV in room",
//         "code": "TVInRoom",
//         "picture": null,
//         "id": 17
//       },
//       {
//         "text": "Restaurant Air-Conditioned",
//         "code": "RestaurantAirconditioned",
//         "picture": null,
//         "id": 45
//       },
//       {
//         "text": "Heating",
//         "code": "Heating",
//         "picture": "/amenities/images/hotels/heating.svg",
//         "id": 52
//       },
//       {
//         "text": "Hair dryer",
//         "code": "HairDryer",
//         "picture": "/amenities/images/hotels/hair_dryer.svg",
//         "id": 5
//       },
//       {
//         "text": "WLAN Access Point",
//         "code": "WLANAccessPoint",
//         "picture": null,
//         "id": 72
//       },
//       {
//         "text": "Satellite TV",
//         "code": "SatelliteTV",
//         "picture": null,
//         "id": 34
//       },
//       {
//         "text": "InternetAccess",
//         "code": "InternetAccess",
//         "picture": null,
//         "id": 74
//       },
//       {
//         "text": "Bath Room",
//         "code": "BathRoom",
//         "picture": null,
//         "id": 38
//       },
//       {
//         "text": "Laundry service",
//         "code": "LaundryService",
//         "picture": null,
//         "id": 42
//       },
//       {
//         "text": "Carpeted",
//         "code": "Carpeted",
//         "picture": null,
//         "id": 49
//       },
//       {
//         "text": "Mini-bar",
//         "code": "MiniBarInRoom",
//         "picture": null,
//         "id": 8
//       },
//       {
//         "text": "Car parking",
//         "code": "CarPark",
//         "picture": null,
//         "id": 6
//       }
//     ],
//     "rooms": [],
//     "additionalInfo": null,
//     "city": null,
//     "region": null,
//     "descriptions": []
//   };
//const roomsDummyData = [{ adults: 2, children: [] }]; //Hard coded adults and children
//const urlForService = 'region=15664&currency=EUR&startDate=23/06/2018&endDate=24/06/2018&rooms='+encodeURI(JSON.stringify(roomsDummyData)); //Here we are creating a url with all these hard coded values which will work for 21-23june 2018

class Explore extends Component {
    state = {
        hotelJson: undefined,
        hotelId: "6518",
        externalId: "4722881",
        hotelName: "Bon Voyage Hotel Alexander",
        hotelPrice: "31.93",
        amenitiesText: "Laundry service,Carpeted,Mini-bar",
        amenitiesTextArray: "Laundry service,Carpeted,Mini-bar".split(','),
        amenitiesCode: "LaundryService,Carpeted,MiniBarInRoom",
        amenitiesCodeArray: "LaundryService,Carpeted,MiniBarInRoom".split(','),
        amenitiesId: "42,49,8",
        amenitiesIdArray: "42,49,8".split(','),
        amenities: [],
        currency: 'EUR',
        currencyIcon: Icons.eur,
        locPrice: 0,

        regionId: "0",
        startDate: "22/06/2018",
        endDate: "22/06/2018",
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => { }
        }
    }

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        const { params } = this.props.navigation.state;
        console.log(params.regionId);
        this.state.regionId = params.regionId;
        this.state.currency = params ? params.currency : 'EUR';
        this.state.currencyIcon = params ? params.currencyIcon : Icons.euro;
        this.state.locPrice = params ? params.locRate : 0;

        this.state.startDate = params ? params.startDate : "22/06/2018";
        this.state.endDate = params ? params.endDate : "23/06/2018";
    }

    amenitiesText(text) {
        var arr = text.split(",").map(function (item) {
            return item.trim();
        });
        this.setState({ amenitiesText: text, amenitiesTextArray: arr });
    }

    amenitiesCode(code) {
        var arr = code.split(",").map(function (item) {
            return item.trim();
        });
        this.setState({ amenitiesCode: text, amenitiesCodeArray: arr });
    }

    amenitiesId(id) {
        var arr = id.split(",").map(function (item) {
            return item.trim();
        });
        this.setState({ amenitiesId: text, amenitiesIdArray: arr });
    }

    spinnerValueChange(value) {
        this.setState({ currency: value });
        if (value == "EUR") {
            this.setState({ currencyIcon: Icons.euro })
        }
        else if (value == "USD") {
            this.setState({ currencyIcon: Icons.usd })
        }
        else if (value == "GBP") {
            this.setState({ currencyIcon: Icons.gbp });
        }
    }

    assembleJson() {
        const roomsDummyData = [{ adults: 2, children: [] }];
        const urlForService = "region=" + this.state.regionId + "&currency=" + this.state.currency + "&startDate=" + this.state.startDate + "&endDate=" + this.state.endDate + "&rooms=" + encodeURI(JSON.stringify(roomsDummyData));

        let searchTermParams = [];
        searchTermParams.push(`region=${this.state.regionId}`, `currency=${this.state.currency}`, `startDate=${this.state.startDate}`, `endDate=${this.state.endDate}`, `rooms=${encodeURI(JSON.stringify(roomsDummyData))}`);
        requester.getHotelById(this.state.hotelId, searchTermParams).then(res => {
            res.body.then(data => {
                this.setState({ hotelJson: data });
                console.log(data);
                this.props.navigation.navigate('HotelDetails', { guests: 2, hotelDetail: data, urlForService: urlForService, locRate: this.state.locPrice, currencyIcon: Icons.usd });
            }).catch(err => {
                console.log(err);
            });
        });
    }

    render() {
        return (

            <View style={styles.container}>
                <Image style={{ width: '60%', height: 50, alignSelf: 'center', resizeMode: 'contain' }} source={require('../../../assets/splash.png')} />
                <ScrollView>
                    <Text style={{ marginTop: 10, fontSize: 20 }}>URL Details</Text>

                    <Text>Region Id:</Text>
                    <Text
                        style={{ height: 40, flexDirection: 'column', }}>{this.state.regionId}
                    </Text>

                    <Text style={{ marginTop: 10 }}>Currency:</Text>
                    <Text
                        style={{ height: 40, }}>{this.state.currency}
                    </Text>

                    <Text style={{ marginTop: 10 }}>Start Date (dd/mm/yyy):</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ startDate: text })}
                        value={this.state.startDate}
                        underlineColorAndroid={"transparent"}
                    />

                    <Text style={{ marginTop: 10 }}>End Date (dd/mm/yyy):</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ endDate: text })}
                        value={this.state.endDate}
                        underlineColorAndroid={"transparent"}
                    />

                    <Text style={{ marginTop: 10, fontSize: 20 }}>Hotel Details</Text>


                    <Text>Hotel Id:</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ hotelId: text })}
                        value={this.state.hotelId}
                        underlineColorAndroid={"transparent"}
                    />

                    <TouchableOpacity onPress={() => this.assembleJson()} style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: 50, backgroundColor: '#DA7B61' }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Search</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});

export default withNavigation(Explore);
