import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter,ImageBackground } from 'react-native';
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

import styles from './styles';

const { width, height } = Dimensions.get('window')
const androidStomp = NativeModules.StompModule;
const stomp = require('stomp-websocket-js');

const clientRef = undefined;
let countIos;

class Property extends Component {
	hotels = [];

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
            this.state.locRate = params.locRate;
            this.state.filter = params.filter;
        }

        this.mainUrl = '?region='+this.state.regionId
                    +'&currency='+this.state.currency
                    +'&startDate='+this.state.checkInDateFormated
                    +'&endDate='+this.state.checkOutDateFormated
                    +'&rooms='+this.state.roomsDummyData; //eslint-disable-line
    }

    async componentWillMount() {
        this.uuid = await UUIDGenerator.getRandomUUID();

        if (Platform.OS === 'ios') {
            this.stompIos();
        } else if (Platform.OS === 'android') {
            this.stompAndroid();
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

        androidStomp.close();
        androidStomp.getData(message, destination);
    }

    handleAndroidSingleHotel(message) {
        console.log("handleAndroidSingleHotel ---------------", message);
        try {
            const jsonHotel = JSON.parse(message);
            if (jsonHotel.hasOwnProperty('allElements')) {
                if (jsonHotel.allElements) {
                    
                }
            } else {
                console.log("handleAndroidSingleHotel --------------1111-");
                this.hotels.push(jsonHotel);
                if (this.hotels.length <= 10) {
                    console.log("handleAndroidSingleHotel --------------2222-", this.hotels);
                    // if (this.state.isLoading) {
                    //     this.setState({
                    //         isLoading: false,
                    //     });
                    //     // this.state.isLoading = false;
                    // }
                    // this.setState(prevState => ({
                    //     listings: [...prevState.listings, jsonHotel]
                    // }));
                }
                
                // this.setState(prevState => ({
                //     listingsMap: [...prevState.listingsMap, object]
                // }));

            }
        } catch (e) {
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
          // This is required to determinate whether the first loading list is all loaded.
          let pageLimit = 20;
          const skip = (page - 1) * pageLimit;
    
          console.log("onFetch", pageLimit);
    
          // Generate dummy data
          let rowData = Array.from({ length: pageLimit }, (value, index) => `item -> ${index + skip}`)
    
          console.log("onFetch", rowData);
          // Simulate the end of the list if there is no more data returned from the server
          if (page === 5) {
            rowData = []
          }
    
          // Simulate the network loading in ES7 syntax (async/await)
          await this.sleep(1000)
          startFetch(rowData, pageLimit)
          console.log("onFetstartFetchch");
        } catch (err) {
          abortFetch() // manually stop the refresh or pagination if it encounters network error
          console.log(err)
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
        <View style={{width, height:height - 100, justifyContent: 'center', alignItems: 'center'}}>
        {/* <LoadingSpinner style={{flex:1, backgroundColor:'#f00'}} text="loading1..." /> */}
            <Image style={{flex:1, backgroundColor:'#f00'}} source={require('../../../../library/UltimateListView/loading.gif')}/>
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
                    ref={ref => this.listView = ref}
                    key={'list'} // this is important to distinguish different FlatList, default is numColumns
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) => `${index} - ${item}`} // this is required when you are using FlatList
                    refreshable = { false }
                    item={this.renderItem} // this takes three params (item, index, separator)
                    numColumns={1} // to use grid layout, simply set gridColumn > 1
                    paginationFetchingView={this.renderPaginationFetchingView}
                    paginationWaitingView={this.renderPaginationWaitingView}
                    paginationAllLoadedView={this.renderPaginationAllLoadedView}
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
