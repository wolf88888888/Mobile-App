import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter, ImageBackground, Dimensions, WebView, Modal } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';

import { imgHost } from '../../../../config';
import SearchBar from '../../../molecules/SearchBar';
import DateAndGuestPicker from '../../../organisms/DateAndGuestPicker';
import requester from '../../../../initDependencies';

import UUIDGenerator from 'react-native-uuid-generator';
import { UltimateListView } from '../../../../../library/UltimateListView';
import { DotIndicator } from 'react-native-indicators';
import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import _ from 'lodash';
import moment from 'moment';

import { TabView } from 'react-native-tab-view';

import ListModeHotelsSearch from '../ListModeHotelsSearch'
import MapModeHotelsSearch from '../MapModeHotelsSearch'

import styles from './styles';

const { width, height } = Dimensions.get('window')
const androidStomp = NativeModules.StompModule;
const stomp = require('stomp-websocket-js');

const clientRef = undefined;
let countIos;

class HotelsSearchScreen extends Component {
    hotelsInfoById = [];
    previousState = {};
    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        const startDate = moment()
            .add(1, 'day');
        const endDate = moment()
            .add(2, 'day');
        
        let roomsData = [{
            adults: 2,
            children: []
        }];

        this.state = {
            isFilterResult: false,
            search: '',
            cities: [],

            isHotel: true,
            regionId : '',

            hotelsInfo : [],
            allElements: false,
            isMAP : -1,
            initialLat: 42.698334,
            initialLon: 23.319941,
            
            checkInDateFormated: startDate.format('DD/MM/YYYY').toString(),
            checkOutDateFormated: endDate.format('DD/MM/YYYY').toString(),
            checkInDate: startDate.format('ddd, DD MMM').toString(),
            checkOutDate: endDate.format('ddd, DD MMM').toString(),

            guests: 2,
            adults: 2,
            children: 0,
            infants: 0,
            childrenBool: false,
            daysDifference: 1,
            roomsDummyData: encodeURI(JSON.stringify(roomsData)),
            //filters
            showUnAvailable: false,
            nameFilter: '',
            selectedRating: [false, false, false, false, false],
            orderBy: 'rank,desc',
            priceRange: [1, 5000],

            editable: false,

            isNewSearch: false,

            index: 0,
            routes: [
                { key: 'list', title: 'List Mode' },
                { key: 'map', title: 'Map Mode' },
            ],
        };
        const { params } = this.props.navigation.state;//eslint-disable-line

        if (params) {
            this.state.isHotel = params.isHotel;
            this.state.search = params.searchedCity;
            this.state.regionId = params.regionId;
            this.state.checkInDate = params.checkInDate;
            this.state.checkInDateFormated = params.checkInDateFormated;
            this.state.checkOutDate = params.checkOutDate;
            this.state.checkOutDateFormated = params.checkOutDateFormated;

            this.state.guests = params.guests;
            this.state.adults = params.adults;
            this.state.children = params.children;
            this.state.infants = params.infants;
            this.state.childrenBool = params.childrenBool;

            this.state.roomsDummyData = params.roomsDummyData;
            this.state.daysDifference = params.daysDifference;
        }

        this.saveState();
    }

    componentWillMount() {
        if(this.state.isHotel) {
            this.getHotels();
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getHotels() {
        if (this.listView != undefined && this.listView != null) {
            this.listView.initListView();
        }
        this.hotelsInfoById = [];
        this.setState({
            isMAP: -1, 
            hotelsInfo : [],
            allElements: false, 
            editable: false
        }, () => {
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
                     this.listView.onFirstLoad(hotels, false);
                    this.getHotelsInfoBySocket();
                });
            });
        });
    }

    async getHotelsInfoBySocket() {
        this.uuid = await UUIDGenerator.getRandomUUID();

        if (Platform.OS === 'ios') {
            this.stompIos();
        } else if (Platform.OS === 'android') {
            this.stompAndroid();
        }
    }

    unsubscribe = () => {
        if (Platform.OS === 'ios') {
        } 
        else if (Platform.OS === 'android') {
            DeviceEventEmitter.removeAllListeners("onStompConnect");
            DeviceEventEmitter.removeAllListeners("onStompError");
            DeviceEventEmitter.removeAllListeners("onStompMessage");

            androidStomp.close();
        }
    }

    stompAndroid() {
        console.log("stompAndroid -------------");
        // console.log("stompAndroid---------------", this.uuid, this.searchString);
        const message = "{\"uuid\":\"" + this.uuid + "\",\"query\":\"" + this.searchString + "\"}";
        const destination = "search/" + this.uuid;

        DeviceEventEmitter.removeAllListeners("onStompConnect");
        DeviceEventEmitter.addListener("onStompConnect", () => {
            console.log("onStompConnect -------------");
        });
        
        DeviceEventEmitter.removeAllListeners("onStompError");
        DeviceEventEmitter.addListener("onStompError", ({type, message}) => {
            console.log("onStompError -------------", type, message);
        });

        DeviceEventEmitter.removeAllListeners("onStompMessage");
        DeviceEventEmitter.addListener("onStompMessage", ({message}) => (
            this.handleAndroidSingleHotel(message)
        ));

        androidStomp.getData(message, destination);
    }

    handleAndroidSingleHotel(message) {
        if (this.state.isMAP == -1 && this.state.hotelsInfo.length > 0) {
            this.setState({
                isMAP: 0, 
                initialLat: parseFloat(this.state.hotelsInfo[0].lat), 
                initialLon: parseFloat(this.state.hotelsInfo[0].lon)
            });
        }
        try {
            console.log("jsonHotel ---", message);
            const jsonHotel = JSON.parse(message);
            if (jsonHotel.hasOwnProperty('allElements')) {
                if (jsonHotel.allElements) {
                    this.setState({ allElements: true, editable: true});
                    if (this.listView) {
                        this.listView.onDoneSocket();
                    }
                    androidStomp.close();
                }
            } else {
                this.hotelsInfoById[jsonHotel.id] = jsonHotel;
                this.state.hotelsInfo = [...this.state.hotelsInfo, jsonHotel];

                //if (this.listView != null && (this.state.hotelsInfo.length < this.listView.getRows().length || this.state.hotelsInfo.length % 20 === 0)) {
                    // this.setState(prevState => ({
                    //     hotelsInfo: [...prevState.hotelsInfo, jsonHotel]
                    // }));
                    //this.state.hotelsInfo = [...this.state.hotelsInfo, jsonHotel];
                    //this.setState({refresh: this.state.hotelsInfo.length})

                if (this.state.isMAP === 1 && this.mapView != null && this.state.hotelsInfo.length % 20 === 0) {
                    this.mapView.refresh(this.state.hotelsInfo);
                }
                else {
                    //this.state.hotelsInfo = [...this.state.hotelsInfo, jsonHotel];
                }

                if (this.listView != null) {
                    const index = this.listView.getIndex(jsonHotel.id);
                    if (index !== -1) {
                        this.listView.upgradePrice(index, this.hotelsInfoById[jsonHotel.id].price)
                    }
                }

            }
        } catch (e) {
            console.log("handleAndroidSingleHotel2222---", message, e);
            // Error
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    switchMode = () => {
        if (this.state.isMAP == 0) {
            this.setState({
                isMAP: 1,
                index: 1,
            });
        }
        else {
            this.setState({
                isMAP: 0,
                index: 0,
            });
        }
    }

    gotoHotelDetailsPageByList = (item) => {
        // console.log("gotoHotelDetailsPage", item, this.searchString.substring(1), this.searchString.substring(1).split('&'));
        
        if (item.price == null || item.price == undefined) {
            return;
        }

        this.setState({isLoadingHotelDetails: true});
        requester.getHotelById(item.id, this.searchString.split('&')).then((res) => {
            console.log("requester.getHotelById", res);
            // here you set the response in to json
            res.body.then((data) => {
                console.log("requester.getHotelById data", data);
                const hotelPhotos = [];
                for (let i = 0; i < data.hotelPhotos.length; i++) {
                    hotelPhotos.push({ uri: imgHost + data.hotelPhotos[i].url });
                }
                this.setState({
                    isLoadingHotelDetails: false
                });
                this.props.navigation.navigate('HotelDetails', {
                    guests: this.state.guests,
                    hotelDetail: item,
                    searchString: this.searchString,
                    hotelFullDetails: data,
                    dataSourcePreview: hotelPhotos,
                    daysDifference: this.state.daysDifference
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    gotoHotelDetailsPageByMap = (item) => {
        console.log("gotoHotelDetailsPageByMap", item);
        
        if (item.price == null || item.price == undefined) {
            return;
        }

        this.setState({isLoadingHotelDetails: true});
        requester.getHotelById(item.id, this.searchString.split('&')).then((res) => {
            // here you set the response in to json
            res.body.then((data) => {
                const hotelPhotos = [];
                for (let i = 0; i < data.hotelPhotos.length; i++) {
                    hotelPhotos.push({ uri: imgHost + data.hotelPhotos[i].url });
                }
                this.setState({
                    isLoadingHotelDetails: false
                });
                this.props.navigation.navigate('HotelDetails', {
                    guests: this.state.guests,
                    hotelDetail: item,
                    searchString: this.searchString,
                    hotelFullDetails: data,
                    dataSourcePreview: hotelPhotos,
                    daysDifference: this.state.daysDifference
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        console.log("onFetch", page);
        try {
            if (!this.state.isFilterResult) {
                requester.getStaticHotels(this.state.regionId, page - 1).then(res => {
                    res.body.then(data => {
                        const listings = data.content;
                        listings.forEach(l => {
                            if (this.hotelsInfoById[l.id]) {
                                l.price = this.hotelsInfoById[l.id].price;
                            }
                        });
                        const hotels = listings;
                        console.log("onFetch--=- res  ", hotels);
                
                        startFetch(hotels, hotels.length, false)
                    });
                });
            }
            else {
                const strSearch = this.getSearchString();
                const strFilters = this.getFilterString(this.listView.getPage());

                requester.getLastSearchHotelResultsByFilter(strSearch, strFilters).then((res) => {
                    if (res.success) {
                        res.body.then((data) => {
                            const hotels = data.content
                            // if (this.isCacheExpired) {
                            //     this.setState({
                            //         hotelsInfo: [...this.state.hotelsInfo, ...hotels]
                            //     });
                            // }
                            startFetch(hotels, hotels.length, true)
                        });
                    } 
                    else {
                        startFetch([], 0, true)
                      // console.log('Search expired');
                    }
                });
            }
            
        } catch (err) {
            console.log("onFetch--=- error  ", err);
            abortFetch() // manually stop the refresh or pagination if it encounters network error
        //   console.log(err)
        }
    }

    onSearchHandler = (value) => {
        this.setState({ search: value });
        if (value === '') {
            this.setState({ cities: [] });
        } else {
            requester.getRegionsBySearchParameter([`query=${value}`]).then(res => {
                res.body.then(data => {
                    if (this.state.search != '') {
                        this.setState({ cities: data });
                    }
                });
            });
        }
    }

    gotoGuests = () => {
        this.props.navigation.navigate('GuestsScreen', {
            guests: this.state.guests,
            adults: this.state.adults,
            children: this.state.children,
            infants: this.state.infants,
            updateData: this.updateData,
            childrenBool: this.state.childrenBool
        });
    }

    gotoSearch = () => {
        this.setState({isFilterResult: false, isMAP: 0, index: 0}, () => {
            this.saveState();

            this.getHotels();
        });
    }

    gotoCancel = () => {
        let baseInfo = {};
        baseInfo['adults'] = this.previousState.adults;
        baseInfo['children'] = [];
        for (let i = 0; i < this.previousState.children.children; i ++) {
            baseInfo['children'].push({"age": 0});
        }
        let roomsData = [baseInfo];
        let roomsDummyData = encodeURI(JSON.stringify(roomsData));

        this.setState({
            search: this.previousState.search,
            regionId: this.previousState.regionId,

            checkInDate: this.previousState.checkInDate,
            checkInDateFormated: this.previousState.checkInDateFormated,
            checkOutDate: this.previousState.checkOutDate,
            checkOutDateFormated: this.previousState.checkOutDateFormated,
            daysDifference: this.previousState.daysDifference,

            adults: this.previousState.adults,
            children: this.previousState.children,
            infants: this.previousState.infants,
            guests: this.previousState.guests,
            childrenBool: this.previousState.childrenBool,
            roomsDummyData: roomsDummyData,
            
            isNewSearch: false,
        });
    }

    handleAutocompleteSelect = (id, name) => {
        if (this.previousState.regionId != id) {
            this.setState({
                cities: [],
                search: name,
                regionId: id,
                isNewSearch: true
            });
        }
        else {
            this.setState({
                cities: [],
                search: name,
                regionId: id
            });
        }


    }

    
    onDatesSelect = ({ startDate, endDate, startMoment, endMoment }) => {
        const start = moment(startDate, 'ddd, DD MMM');
        const end = moment(endDate, 'ddd, DD MMM');
        this.setState({
            daysDifference: moment.duration(end.diff(start)).asDays(),
            checkInDate: startDate,
            checkOutDate: endDate,
            checkInDateFormated: startMoment.format('DD/MM/YYYY'),
            checkOutDateFormated: endMoment.format('DD/MM/YYYY'),
            isNewSearch: true
        });
    }

    updateData = (data) => {
        if (this.state.adults === data.adults
                && this.state.children === data.children
                && this.state.infants === data.infants
                && this.state.childrenBool === data.childrenBool) {
            return;
        }
        
        let baseInfo = {};
        baseInfo['adults'] = data.adults;
        baseInfo['children'] = [];
        for (let i = 0; i < data.children; i ++) {
            baseInfo['children'].push({"age": 0});
        }
        let roomsData = [baseInfo];
        let roomsDummyData = encodeURI(JSON.stringify(roomsData));

        this.setState({
            adults: data.adults,
            children: data.children,
            infants: data.infants,
            guests: data.adults + data.children + data.infants,
            childrenBool: data.childrenBool,
            roomsDummyData: roomsDummyData,
            isNewSearch: true
        });
    }

    saveState = () => {
        this.setState({
            //filters
            showUnAvailable: false,
            nameFilter: '',
            selectedRating: [false, false, false, false, false],
            orderBy: 'rank,desc',
            priceRange: [1, 5000],
            
            isNewSearch: false,
        });

        this.previousState.search = this.state.search;
        this.previousState.regionId = this.state.regionId;

        this.previousState.checkInDate = this.state.checkInDate;
        this.previousState.checkInDateFormated = this.state.checkInDateFormated;
        this.previousState.checkOutDate = this.state.checkOutDate;
        this.previousState.checkOutDateFormated = this.state.checkOutDateFormated;
        this.previousState.daysDifference = this.state.daysDifference;

        this.previousState.adults = this.state.adults;
        this.previousState.children = this.state.children;
        this.previousState.infants = this.state.infants;
        this.previousState.guests = this.state.guests;
        this.previousState.childrenBool = this.state.childrenBool;

        if (this.state.isHotel) {
            this.searchString = this.getSearchString();
                // '?region='+this.state.regionId
                // +'&currency='+this.state.currency
                // +'&startDate='+this.state.checkInDateFormated
                // +'&endDate='+this.state.checkOutDateFormated
                // +'&rooms='+this.state.roomsDummyData; //eslint-disable-line
        }
    }

    gotoSettings = () => {
        if (this.state.allElements) {
            if (this.state.isHotel) {
                this.props.navigation.navigate('HotelFilterScreen', {
                    isHotelSelected: true,
                    updateFilter: this.updateFilter,
                    selectedRating: this.state.selectedRating,
                    showUnAvailable: this.state.showUnAvailable,
                    hotelName: this.state.nameFilter
                });
            }
        }
    }

    getSearchString = () => {
        let search = `?region=${this.state.regionId}`;
        search += `&currency=${this.props.currency}`;
        search += `&startDate=${this.state.checkInDateFormated}`;
        search += `&endDate=${this.state.checkOutDateFormated}`;
        search += `&rooms=${this.state.roomsDummyData}`;
        return search;
    }

    mapStars(stars) {
        let hasStars = false;
        const mappedStars = [];
        stars.forEach((s) => {
            if (s) {
                hasStars = true;
            }
        });

        if (!hasStars) {
            for (let i = 0; i <= 5; i++) {
                mappedStars.push(i);
            }
        } else {
            mappedStars.push(0);
            stars.forEach((s, i) => {
                if (s) {
                    mappedStars.push(i + 1);
                }
            });
        }

        return mappedStars;
    }

    getFilterString = (page) => {
        const filtersObj = {
            showUnavailable: this.state.showUnAvailable,
            name: this.state.nameFilter,
            minPrice: this.state.priceRange[0],
            maxPrice: this.state.priceRange[1],
            stars: this.mapStars(this.state.selectedRating)
        };

        // const page = page;//this.listView.getPage();
        const sort = this.state.orderBy;
        const pagination = `&page=${page}&sort=${sort}`;
    
        let filters = `&filters=${encodeURI(JSON.stringify(filtersObj))}` + pagination; //eslint-disable-line
        
        return filters;
    }

    updateFilter = (data) => {
        console.log("updateFilter", data);
        
        if (this.listView != undefined && this.listView != null) {
            this.listView.initListView();
        }

        if (this.mapView != undefined && this.mapView != null) {
            this.mapView.initMapView();
        }
        
        this.setState({
            isFilterResult: true,
            showUnAvailable: data.showUnAvailable,
            nameFilter: data.hotelName,
            selectedRating: data.selectedRating,
            orderBy: data.priceSort,
            priceRange: data.sliderValue,
            hotelsInfo: []
        }, () => {
            // this.applyFilters();

            const search = this.getSearchString();
            const filters = this.getFilterString(0);
            console.log("search --- filters", search, filters);
            this.fetchFilteredResults(search, filters);
        });
    }

    fetchFilteredResults = (strSearch, strFilters) => {
        let searchMap = strSearch + strFilters;
        //searchMap = searchMap.replace(/%22/g, '"');
        console.log("fetchFilteredResults query", searchMap);
        //searchMap = '?region=15664&currency=USD&startDate=21/11/2018&endDate=22/11/2018&rooms=%5B%7B"adults":2,"children":%5B%5D%7D%5D&filters=%7B"showUnavailable":true,"name":"","minPrice":1,"maxPrice":5000,"stars":%5B0,1,2,3,4,5%5D%7D&page=0&sort=rank,desc';

        requester.getLastSearchHotelResultsByFilter(strSearch, strFilters).then((res) => {
            if (res.success) {
                res.body.then((data) => {
                    console.log("fetchFilteredResults", data);
                    this.listView.onFirstLoad(data.content, true);
                    requester.getMapInfo(searchMap).then(res => {
                        res.body.then(dataMap => {
                            console.log ("getMapInfo", dataMap);
                            const isCacheExpired = dataMap.isCacheExpired;
                            if (!isCacheExpired) {
                                this.setState({
                                    hotelsInfo: dataMap.content, 
                                    initialLat: parseFloat(dataMap.content[0].latitude), 
                                    initialLon: parseFloat(dataMap.content[0].longitude)
                                });
                            }
                            else {
                                this.setState({
                                    hotelsInfo: data.content, 
                                    initialLat: parseFloat(data.content[0].latitude), 
                                    initialLon: parseFloat(data.content[0].longitude)
                                });
                            }
                        });
                    });
                });
            } 
            else {
                // console.log('Search expired');
            }
        });
        

    }

    renderHotelTopView() {
        return (
            <View style={styles.SearchAndPickerwarp}>
                <View style={styles.searchAreaView}>
                    <SearchBar
                        autoCorrect={false}
                        value={this.state.search}
                        onChangeText={this.onSearchHandler}
                        placeholder="Discover your next experience"
                        placeholderTextColor="#bdbdbd"
                        leftIcon="arrow-back"
                        onLeftPress={this.onCancel}
                        editable={this.state.editable}
                    />
                </View>
            </View>
        );
    }

    renderAutocomplete() {
        const nCities = this.state.cities.length;
        if (nCities > 0) {
            return (
                <ScrollView
                    style={{
                        marginLeft: 15,
                        marginRight: 15,
                        minHeight: 100,
                        zIndex: 99,
                    }}
                >
                    {
                        this.state.cities.map((result, i) => { //eslint-disable-line
                            return (//eslint-disable-line
                                <TouchableOpacity
                                    key={result.id}
                                    style={i == nCities - 1 ? [styles.autocompleteTextWrapper, {borderBottomWidth: 1, elevation: 1}] : styles.autocompleteTextWrapper}
                                    onPress={() => this.handleAutocompleteSelect(result.id, result.query)}
                                >
                                    <Text style={styles.autocompleteText}>{result.query}</Text>
                                </TouchableOpacity>
                            );//eslint-disable-line
                        })
                    }
                </ScrollView>
            );
        } else {//eslint-disable-line
            return null;//eslint-disable-line
        }
    }

    renderFilterBar() {
        return (
            <View style={this.state.isNewSearch ?  {height:190, width:'100%'} : {height:70, width:'100%'}}>
                <DateAndGuestPicker
                    checkInDate={this.state.checkInDate}
                    checkOutDate={this.state.checkOutDate}
                    checkInDateFormated={this.state.checkInDateFormated}
                    checkOutDateFormated={this.state.checkOutDateFormated}
                    adults={this.state.adults}
                    children={this.state.children}
                    infants={this.state.infants}
                    guests={this.state.guests}
                    gotoGuests={this.gotoGuests}
                    gotoSearch={this.gotoSearch}
                    gotoCancel={this.gotoCancel}
                    onDatesSelect={this.onDatesSelect}
                    gotoSettings={this.gotoSettings}
                    disabled={!this.state.editable}
                    showSearchButton={this.state.isNewSearch}
                    showCancelButton={this.state.isNewSearch}
                    isFilterable={true}
                />
            </View>
        );
    }

    renderTabBar = () => {
        return (
          <View style={styles.tabBar}>
          </View>
        );
    };

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'list':
                return <ListModeHotelsSearch 
                            ref = {ref => this.listView = ref}
                            allElements = {this.state.allElements}
                            daysDifference = {this.state.daysDifference}
                            onFetch = {this.onFetch}
                            gotoHotelDetailsPage = {this.gotoHotelDetailsPageByList} />;
            case 'map':
                return <MapModeHotelsSearch
                            ref={(ref) => this.mapView = ref}
                            isFilterResult = {this.state.isFilterResult}
                            initialLat = {this.state.initialLat}
                            initialLon = {this.state.initialLon}
                            hotelsInfo = {this.state.hotelsInfo}
                            gotoHotelDetailsPage = {this.gotoHotelDetailsPageByMap} />;
            default:
                return null;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHotelTopView()}
                {this.renderAutocomplete()}
                <View style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, width:'100%'}}>
                    {this.renderFilterBar()}
                    <View style={styles.containerHotels}>
                        {/* {
                            this.state.isMAP == 1 && this.renderMap()
                        } */}
                        <TabView
                            navigationState={this.state}
                            renderTabBar={this.renderTabBar}
                            renderScene={this.renderScene}
                            onIndexChange={index => this.setState({ index })}
                            initialLayout={{ width: width }}
                            swipeEnabled={false}
                            animationEnabled={false}
                        />
                        {/* <UltimateListView
                            ref = {ref => this.listView = ref}
                            isDoneSocket = {this.state.allElements}
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
                        /> */}
                        {
                            this.state.isMAP != -1 &&
                                <TouchableOpacity onPress={this.switchMode} style={styles.switchButton}>
                                    <FontAwesome style={styles.icon}>{this.state.isMAP == 0? Icons.mapMarker : Icons.listUl}</FontAwesome>
                                </TouchableOpacity>
                        }
                    </View>
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
                JSON.stringify({uuid: this.uuid, query : searchString})
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

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
    };
}
export default connect(mapStateToProps, null)(HotelsSearchScreen);

// export default withNavigation(Property);
