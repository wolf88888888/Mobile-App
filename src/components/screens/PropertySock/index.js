import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter, ImageBackground, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';


import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import queryString from 'query-string';
import Image from 'react-native-remote-svg';

import { imgHost, socketHost } from '../../../config';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import HotelItemView from '../../organisms/HotelItemView';
import requester from '../../../initDependencies';

import UUIDGenerator from 'react-native-uuid-generator';
import CloseButton from '../../atoms/CloseButton';
import { UltimateListView } from '../../../../library/UltimateListView';
import LoadingSpinner from '../../../../library/loadingSpinner'
import { DotIndicator } from 'react-native-indicators';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import _ from 'lodash';

import styles from './styles';

const { width, height } = Dimensions.get('window')
const androidStomp = NativeModules.StompModule;
const stomp = require('stomp-websocket-js');

const clientRef = undefined;
let countIos;

class Property extends Component {
    hotelsInfoById = [];
    hotelsInfo = [];

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        
        this.state = {
            regionId : '',
            currency : 'EUR',
            currencySign : '€',
            checkInDateFormated : '',
            checkOutDateFormated : '',
            roomsDummyData : '',
            locRate : 1.0,

            allElements: false,
        };
        const { params } = this.props.navigation.state;//eslint-disable-line
        console.log("Property Native", params);

        if (params) {
            // this.state.searchedCity = params ? params.searchedCity : '';
            // this.state.searchedCityId = params ? params.searchedCityId : 0;
            // this.state.checkInDate = params ? params.checkInDate : '';
            // this.state.checkOutDate = params ? params.checkOutDate : '';
            // this.state.guests = params ? params.guests : 0;
            // this.state.children = params ? params.children : 0;

            this.state.regionId = params.regionId;
            this.state.currency = params.currency;
            this.state.currencySign = params.currencySign;
            this.state.checkInDateFormated = params.checkInDateFormated;
            this.state.checkOutDateFormated = params.checkOutDateFormated;
            this.state.roomsDummyData = params.roomsDummyData;

            if(_.isString(params.locRate)) {
                this.state.locRate = parseFloat(params.locRate);
            }
            else {
                this.state.locRate = params.locRate;
            }

            this.state.filter = params.filter;
            console.log("Property this.state", this.state);
        }

        this.mainUrl = '?region='+this.state.regionId
                    +'&currency='+this.state.currency
                    +'&startDate='+this.state.checkInDateFormated
                    +'&endDate='+this.state.checkOutDateFormated
                    +'&rooms='+this.state.roomsDummyData; //eslint-disable-line
    }

    async componentWillMount() {
        this.getHotels();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    async getHotels() {
        requester.getStaticHotels(this.state.regionId).then(res => {
            res.body.then(data => {
              const { content } = data;
              content.forEach(l => {
                if (this.hotelsInfoById[l.id]) {
                  l.price = this.hotelsInfoById[l.id].price;
                }
              });

              console.log("getStaticHotels", content);
              const hotels = content;
              this.listView.onFirstLoad(hotels);
            });
          });

        this.uuid = await UUIDGenerator.getRandomUUID();

        if (Platform.OS === 'ios') {
            this.stompIos();
        } else if (Platform.OS === 'android') {
            this.stompAndroid();
        }
    }

    unsubscribe = () => {
        if (Platform.OS === 'ios') {
        } else if (Platform.OS === 'android') {
            androidStomp.close();
        }
    }

    stompAndroid() {
        console.log("uid---------------", this.uuid, this.mainUrl);
        const message = "{\"uuid\":\"" + this.uuid + "\",\"query\":\"" + this.mainUrl + "\"}";
        const destination = "search/" + this.uuid;

        DeviceEventEmitter.addListener("onStompConnect", () => {
            console.log("onStompConnect -------------");
        });
        
        DeviceEventEmitter.addListener("onStompError", ({type, message}) => {
            console.log("onStompError -------------", type, message);
        });

        DeviceEventEmitter.addListener("onStompMessage", ({message}) => (
            this.handleAndroidSingleHotel(message)
        ));

        androidStomp.getData(message, destination);
    }

    handleAndroidSingleHotel(message) {
        try {
            const jsonHotel = JSON.parse(message);
            if (jsonHotel.hasOwnProperty('allElements')) {
                if (jsonHotel.allElements) {
                    this.setState({ allElements: true });
                    androidStomp.close();
                }
            } else {
                this.hotelsInfoById[jsonHotel.id] = jsonHotel;
                this.hotelsInfo.push(jsonHotel);
                
                const index = this.listView.getIndex(jsonHotel.id);
                if (index !== -1) {
                    this.listView.upgradePrice(index, this.hotelsInfoById[jsonHotel.id].price)
                }

                // this.hotels.push();
                // if (this.hotels.length <= 10) {
                //     // this.hotelsDisplay.push(jsonHotel);
                //     this.listView.onFirstLoad(jsonHotel);
                //     // if (this.state.isLoading) {
                //     //     this.setState({
                //     //         isLoading: false,
                //     //     });
                //     //     // this.state.isLoading = false;
                //     // }
                //     // this.setState(prevState => ({
                //     //     listings: [...prevState.listings, jsonHotel]
                //     // }));
                // }
                
                // this.setState(prevState => ({
                //     listingsMap: [...prevState.listingsMap, object]
                // }));

            }
        } catch (e) {
            console.log("handleAndroidSingleHotel2222---", e);
            // Error
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    gotoHotelDetailsPage = (item) => {
        console.log("gotoHotelDetailsPage", item);
    }

    onFetch = async (page = 1, startFetch, abortFetch) => {
        console.log("onFetch", page);
        try {
            requester.getStaticHotels(this.state.regionId, page - 1).then(res => {
                res.body.then(data => {
                  const listings = data.content;
                  listings.forEach(l => {
                    if (this.hotelInfoById[l.id]) {
                      l.price = this.hotelInfoById[l.id].price;
                    }
                  });
                  const hotels = listings;
        
                  startFetch(hotels, hotels.length)
                });
            });
        } catch (err) {
          abortFetch() // manually stop the refresh or pagination if it encounters network error
        //   console.log(err)
        }
    }

    renderItem = (item) => {
        return (
            <HotelItemView
                item = {item}
                currencySign = {this.state.currencySign}
                locRate = {this.state.locRate}
                gotoHotelDetailsPage = {this.gotoHotelDetailsPage}
            />
        )
    }

    renderPaginationFetchingView = () => (
        <View style={{width, height:height - 90, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width:50, height:50}} source={require('../../../assets/loader.gif')}/>
        </View>
    )
    
    renderPaginationWaitingView = () => {
        return (
            <View style={
                {
                    flex: 0,
                    width,
                    height: 55,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }>
                <DotIndicator color='#d97b61' count={3} size={9} animationDuration={777}/>
            </View>
        )
    }

    renderPaginationAllLoadedView = () => {
        return (<View/>)
    }

    render() {
        const {
            search, searchedCity
        } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this.onCancel} />
                <View style={styles.containerHotels}>
                    <UltimateListView
                        ref = {ref => this.listView = ref}
                        key = {'list'} // this is important to distinguish different FlatList, default is numColumns
                        onFetch = {this.onFetch}
                        keyExtractor = {(item, index) => `${index} - ${item}`} // this is required when you are using FlatList
                        firstLoader = { false }
                        refreshable = { false }
                        item = {this.renderItem} // this takes three params (item, index, separator)
                        numColumns = {1} // to use grid layout, simply set gridColumn > 1
                        paginationFetchingView = {this.renderPaginationFetchingView}
                        paginationWaitingView = {this.renderPaginationWaitingView}
                        paginationAllLoadedView = {this.renderPaginationAllLoadedView}
                    />
                </View>
                <ProgressDialog
                    visible={this.state.isLoadingHotelDetails}
                    title="Please Wait"
                    message="Loading..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"/>
            </View>
        );
    }

    stompIos() {
        countIos = 0;
        clientRef = stomp.client('wss://beta.locktrip.com/socket');
        clientRef.connect({}, (frame) => {
            var headers = {'content-length': false};
            clientRef.subscribe(`search/${this.uuid}`, this.handleReceiveSingleHotel);
            clientRef.send("search",
                headers,
                JSON.stringify({uuid: this.uuid, query : mainUrl})
            )
        }, (error) => {
            clientRef.disconnect();
            this.setState({
                isLoading: false,
            });
        });
    }
    
    handleReceiveSingleHotel(message) {
        if (countIos === 0) {
            this.applyFilters(false);
        }
        countIos = 1;
        const response = JSON.parse(message.body);
        if (response.hasOwnProperty('allElements')) {
            if (response.allElements) {         
                if (clientRef) {
                    clientRef.disconnect();
                }
            }
        } else {
            this.setState(prevState => ({
                listingsMap: [...prevState.listingsMap, response]
            }));
        }
    }
}

export default withNavigation(Property);
