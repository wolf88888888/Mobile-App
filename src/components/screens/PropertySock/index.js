import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter, ImageBackground, Dimensions, WebView, Modal } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';

import { imgHost } from '../../../config';
import SearchBar from '../../molecules/SearchBar';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import HotelItemView from '../../organisms/HotelItemView';
import requester from '../../../initDependencies';

import UUIDGenerator from 'react-native-uuid-generator';
import { UltimateListView } from '../../../../library/UltimateListView';
import { DotIndicator } from 'react-native-indicators';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import _ from 'lodash';
import moment from 'moment';
import * as currencyActions from '../../../redux/action/Currency'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const { width, height } = Dimensions.get('window')
const androidStomp = NativeModules.StompModule;
const stomp = require('stomp-websocket-js');

const clientRef = undefined;
let countIos;

class Property extends Component {
    hotelsInfoById = [];
    isFilterResult = false;

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
            search: '',
            countryId: 0,
            countryName: '',
            home: '',

            countries: [],
            cities: [],

            isHotel: true,
            regionId : '',
            currency: props.currency,
            currencySign: props.currencySign,
            locRate: _.isString(props.locRate) ? parseFloat(props.locRate) : props.locRate,

            hotelsInfo : [],
            allElements: false,
            isMAP : -1,
            initialLat: 51.5074,
            initialLon: 0.1278,
            
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
            orderBy: 'priceForSort,asc',
            priceRange: [1, 5000],

            editable: false,

            isNewSearch: false,
        };
        const { params } = this.props.navigation.state;//eslint-disable-line

        if (params) {
            this.state.isHotel = params.isHotel;
            this.state.search = params.searchedCity;
            this.state.regionId = params.regionId;
            this.state.home = params.home;
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
            this.state.filter = params.filter;
            this.state.daysDifference = params.daysDifference;
        }

        this.saveState();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.currency != prevProps.currency || this.props.locRate != prevProps.locRate) {
            this.setState({currency: this.props.currency, currencySign:this.props.currencySign, locRate: this.props.locRate});
        }

        if (this.props.countries != prevProps.countries) {
            this.setCountriesInfo();
        }
    }

    setCountriesInfo() {
        console.log("setCountriesInfo");
        countryArr = [];
        this.props.countries.map((item, i) => {
            countryArr.push({
                'label': item.name,
                'value': item
            });
        });
        this.setState({
            countries: countryArr,
            countriesLoaded: true,
            countryId: countryArr[0].value.id,
            countryName: countryArr[0].label
        });
    }

    componentWillMount() {
        this.setCountriesInfo();
        if(this.state.isHotel) {
            this.getHotels();
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getHotels() {
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
                    this.listView.clearRows();
                    this.listView.clearPage();
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
        } else if (Platform.OS === 'android') {
            androidStomp.close();
        }
    }

    stompAndroid() {
        console.log("stompAndroid---------------", this.uuid, this.mainUrl);
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
        if (this.state.isMAP == -1) {
            this.setState({isMAP: 0});
        }
        try {
            console.log("jsonHotel ---", message);
            const jsonHotel = JSON.parse(message);
            if (jsonHotel.hasOwnProperty('allElements')) {
                if (jsonHotel.allElements) {
                    this.setState({ allElements: true, editable: true });
                    if (this.listView) {
                        this.listView.onDoneSocket();
                    }
                    androidStomp.close();


                }
            } else {
                this.hotelsInfoById[jsonHotel.id] = jsonHotel;

                if (this.state.hotelsInfo.length < this.listView.getRows.length || this.state.hotelsInfo.length % 10 === 0) {
                    this.setState(prevState => ({
                        hotelsInfo: [...prevState.hotelsInfo, jsonHotel]
                    }));
                }
                else {
                    this.state.hotelsInfo = [...this.state.hotelsInfo, jsonHotel];
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
            });
        }
        else {
            this.setState({
                isMAP: 0,
            });
        }
    }

    gotoHotelDetailsPage = (item) => {
        console.log("gotoHotelDetailsPage", item);
        
        this.setState({isLoadingHotelDetails: true});
        requester.getHotelById(item.id, this.mainUrl.split('&')).then((res) => {
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
                    urlForService: this.mainUrl,
                    locRate: this.state.locRate,
                    currency: this.state.currency,
                    currencySign: this.state.currencySign,
                    hotelFullDetails: data,
                    dataSourcePreview: hotelPhotos,
                    daysDifference: this.state.daysDifference
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    onClickHotelOnMap = (item) => {
        console.log("onClickHotelOnMap", item);

        this.setState({isLoadingHotelDetails: true});
        requester.getHotelById(item.id, this.mainUrl.split('&')).then((res) => {
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
                    urlForService: this.mainUrl,
                    locRate: this.state.locRate,
                    currency: this.state.currency,
                    currencySign: this.state.currencySign,
                    hotelFullDetails: data,
                    dataSourcePreview: hotelPhotos,
                    daysDifference: this.state.daysDifference
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    onFetch = async (page = 1, startFetch, abortFetch) => {
        console.log("onFetch", page);
        try {
            if (!this.isFilterResult) {
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

                console.log("getLastSearchHotelResultsByFilter PPP", strSearch, strFilters);
                requester.getLastSearchHotelResultsByFilter(strSearch, strFilters).then((res) => {
                    console.log("getLastSearchHotelResultsByFilter", res);
                    if (res.success) {
                        res.body.then((data) => {
                            console.log("getLastSearchHotelResultsByFilter------", data);
                            const hotels = data.content
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
        this.isFilterResult = false;
        this.saveState();

        if(this.state.isHotel) {
            this.getHotels();
        }
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
            home: this.previousState.home,
            countryId: this.previousState.countryId,

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

    onDatesSelect = ({ startDate, endDate }) => {
        if (this.state.checkInDate === startDate && this.state.checkOutDate === endDate) {
            return;
        }
        
        const year = (new Date()).getFullYear();
        this.setState({
            checkInDate: startDate,
            checkOutDate: endDate,
            checkInDateFormated: (moment(startDate, 'ddd, DD MMM')
                .format('DD/MM/')
                .toString()) + year,
            checkOutDateFormated: (moment(endDate, 'ddd, DD MMM')
                .format('DD/MM/')
                .toString()) + year,
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
            orderBy: 'priceForSort,asc',
            priceRange: [1, 5000],
            
            isNewSearch: false,
        });

        this.previousState.search = this.state.search;
        this.previousState.regionId = this.state.regionId;
        
        this.previousState.home = this.state.home;
        this.previousState.countryId = this.state.countryId; //home

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
            this.mainUrl = '?region='+this.state.regionId
                +'&currency='+this.state.currency
                +'&startDate='+this.state.checkInDateFormated
                +'&endDate='+this.state.checkOutDateFormated
                +'&rooms='+this.state.roomsDummyData; //eslint-disable-line
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
                    hotelName: this.state.nameFilter,
                    currencySign: this.state.currencySign
                });
            }
        }
    }

    getSearchString = () => {
    //     let search = `?region=${encodeURI(this.state.regionId)}`;
    //     search += `&currency=${encodeURI(this.state.currency)}`;
    //     search += `&startDate=${encodeURI(this.state.checkInDateFormated)}`;
    //     search += `&endDate=${encodeURI(this.state.checkOutDateFormated)}`;
    //     search += `&rooms=${encodeURI(this.state.roomsDummyData)}`;

        let search = `?region=${this.state.regionId}`;
        search += `&currency=${this.state.currency}`;
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
        const filters = `&filters=${encodeURI(JSON.stringify(filtersObj))}` + pagination; //eslint-disable-line
        return filters;
    }

    updateFilter = (data) => {
        console.log("updateFilter", data);
        this.setState({
            showUnAvailable: data.showUnAvailable,
            nameFilter: data.hotelName,
            selectedRating: data.selectedRating,
            orderBy: data.priceSort,
            priceRange: data.sliderValue,
        }, () => {
            // this.applyFilters();
            const search = this.getSearchString();
            const filters = this.getFilterString(0);
            this.fetchFilteredResults(search, filters);
        });
    }

    fetchFilteredResults = (strSearch, strFilters) => {
        console.log("fetchFilteredResults query", strSearch, strFilters)
        requester.getLastSearchHotelResultsByFilter(strSearch, strFilters).then((res) => {
            if (res.success) {
                res.body.then((data) => {
                    console.log("fetchFilteredResults", data);
                    this.isFilterResult = true;
                    this.listView.clearRows();
                    this.listView.clearPage();
                    this.listView.onFirstLoad(data.content, true);
                });
            } 
            else {
              // console.log('Search expired');
            }
        });
    }

    renderItem = (item) => {
        return (
            <HotelItemView
                item = {item}
                currencySign = {this.state.currencySign}
                locRate = {this.state.locRate}
                gotoHotelDetailsPage = {this.gotoHotelDetailsPage}
                daysDifference = {this.state.daysDifference}
            />
        )
    }

    renderPaginationFetchingView = () => (
        <View style={{width, height:height - 160, justifyContent: 'center', alignItems: 'center'}}>
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

    renderHomeTopView() {
        console.log("this.state.countries", this.state.countries);
        return (
            //Home
            <View style={styles.SearchAndPickerwarp}>
                <View style={styles.countriesSpinner}>
                    <TouchableOpacity onPress={this.onCancel}>
                        <View style={styles.leftIconView}>
                            <Text style={styles.leftIconText}>
                                <Icon name="arrow-back" size={22} color="#000" />
                                {/* <FontAwesome>{Icons[leftIcon]}</FontAwesome> */}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.pickerWrapHomes}>
                        <RNPickerSelect
                            disabled={!this.state.editable}
                            items={this.state.countries}
                            placeholder={{
                                label: 'Choose a location',
                                value: 0
                            }}
                            onValueChange={(value) => {
                                this.setState({
                                    countryId: value.id,
                                    countryName: value.name,
                                    home: value
                                });
                            }}
                            value={this.state.home}
                            style={{ ...pickerSelectStyles }}
                        >
                        </RNPickerSelect>
                    </View>
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

    renderImageInCallout(hotel) {
        if(Platform.OS === 'ios') {
          return(
            <Image
                style={{ width: 120, height: 90}}
                source={{uri: imgHost + hotel.thumbnail.url }}
            />
          )
        } else {
          return(
            <WebView
                style={{ width: 120, height: 90, marginLeft:-3.5, backgroundColor:'#fff'}}
                source={{html: "<img src=" + imgHost + hotel.thumbnail.url + " width='120'/>" }}
                javaScriptEnabledAndroid={true}
            />
          )
        }
    }

    renderCallout(hotel) {
        return (
            <MapView.Callout tooltip={true}>
                <View style={ styles.map_item }>
                    <View style={{ width: 120, height: 90, backgroundColor:'#fff' }}>
                        { 
                            hotel.thumbnail !== null && this.renderImageInCallout(hotel)
                        }
                    </View>
                    <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                        {hotel.name}
                    </Text>
                    <Text style={styles.description}>
                        LOC {hotel.price.toFixed(2)} / Night
                    </Text>
                    <Text style={styles.ratingsMap}>
                        {
                            Array(hotel.stars !== null && hotel.stars).fill().map(i => <FontAwesome>{Icons.starO}</FontAwesome>)
                        }
                    </Text>
                </View>
            </MapView.Callout>
        );
    }

    renderMap = () => {
        return (                            
            <MapView
                initialRegion={{
                    latitude: this.state.hotelsInfo.length >= 1 ?
                                    parseFloat(this.state.hotelsInfo[0].lat) : this.state.initialLat,
                    longitude: this.state.hotelsInfo.length >= 1 ?
                        parseFloat(this.state.hotelsInfo[0].lon) : this.state.initialLon,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5
                }}
                style={styles.map}
            >
            {/* Marker */}
            {this.state.hotelsInfo.map(marker => marker.lat != null && (
                <Marker
                    coordinate={{
                        latitude: parseFloat(marker.lat),
                        longitude: parseFloat(marker.lon)
                    }}
                    onCalloutPress={() => {this.onClickHotelOnMap(marker)}} //eslint-disable-line
                >
                    {this.renderCallout(marker)}
                    
                </Marker>
            ))}
            </MapView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isHotel ? this.renderHotelTopView() : this.renderHomeTopView()}
                {this.renderAutocomplete()}
                <View style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, width:'100%'}}>
                    {this.renderFilterBar()}
                    <View style={styles.containerHotels}>
                        {
                            this.state.isMAP == 1 && this.renderMap()
                        }
                        <UltimateListView
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
                        />
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

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        locRate: state.currency.locRate,
        countries: state.country.countries
    };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(currencyActions, dispatch)
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        backgroundColor: 'white',
        color: 'black'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);

// export default withNavigation(Property);
