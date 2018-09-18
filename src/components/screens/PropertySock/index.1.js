import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter,ImageBackground } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import UUIDGenerator from 'react-native-uuid-generator';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import queryString from 'query-string';
import Image from 'react-native-remote-svg';
import { withNavigation } from 'react-navigation';

import { imgHost, socketHost } from '../../../config';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import HotelItemView from '../../organisms/HotelItemView';
import styles from './styles';
import requester from '../../../initDependencies';

const androidStomp = NativeModules.StompModule;
const stomp = require('stomp-websocket-js');
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';

const clientRef = undefined;
var mainUrl = '';
let countIos;

class Property extends Component {
	hotels = [];

    constructor(props) {
        super(props);

        // UUIDGenerator.getRandomUUID((uuid) => {
        //     uid = uuid;
        // });
        console.disableYellowBox = true;
        
        this.handleReceiveSingleHotel = this.handleReceiveSingleHotel.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.gotoGuests = this.gotoGuests.bind(this);
        this.gotoSettings = this.gotoSettings.bind(this);
        this.gotoSearch = this.gotoSearch.bind(this);
        //this.onDatesSelect = this.onDatesSelect.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.alterMap = this.alterMap.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.gotoHotelDetailsPage = this.gotoHotelDetailsPage.bind(this);
        this.state = {
            search: '',
            checkInDate: '',
            checkOutDate: '',
            guests: 0,
            children: 1,
            topHomes: [],
            listings: [],
            listingsMap: [],
            searchedCity: 'Discover your next experience',
            searchedCityId: 0,
            // these state are for paramerters in urlForService
            regionId: '',
            checkInDateFormated: '',
            checkOutDateFormated: '',
            roomsDummyData: [],
            urlForService: '',
            isLoading: true,
            isFilterLoaded: false,
            noResultsFound: false,
            locRate: 0,
            currency: 'EUR',
            currencySign: '€',
            showResultsOnMap: false,
            initialLat: 51.5074,
            initialLon: 0.1278,
            filter: undefined,
            nameFilter: '',
            showUnAvailable: false,
            selectedRating: [false, false, false, false, false],
            orderBy: 'priceForSort,asc',
            sliderValue: [1, 5000],
            page: 0,
            totalPages: 0,
            isLoadingHotelDetails: false
        };
        const { params } = this.props.navigation.state;//eslint-disable-line
        this.state.searchedCity = params ? params.searchedCity : '';
        this.state.searchedCityId = params ? params.searchedCityId : 0;
        this.state.checkInDate = params ? params.checkInDate : '';
        this.state.checkOutDate = params ? params.checkOutDate : '';
        this.state.guests = params ? params.guests : 0;
        this.state.children = params ? params.children : 0;

        this.state.regionId = params ? params.regionId : [];
        this.state.checkInDateFormated = params ? params.checkInDateFormated : '';
        this.state.checkOutDateFormated = params ? params.checkOutDateFormated : '';
        this.state.roomsDummyData = params ? params.roomsDummyData : [];
        this.state.currency = params ? params.currency : [];
        this.state.currencySign = params ? params.currencySign : '€';
        this.state.locRate = params ? params.locRate : 0;
        this.state.filter = params ? params.filter : [];

        mainUrl = '?region='+this.state.regionId+'&currency='+this.state.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated+'&rooms='+this.state.roomsDummyData; //eslint-disable-line
        this.state.urlForService = mainUrl;
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
        console.log("uid---------------", this.uuid, mainUrl);
        const message = "{\"uuid\":\"" + this.uuid + "\",\"query\":\"" + mainUrl + "\"}";
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

        // androidStomp.startSession(this.uuid, mainUrl, () => {
        //     this.applyFilters(false);
        // });
        // DeviceEventEmitter.addListener("SOCK_EVENT", ({message}) => (
        //     this.handleAndroidSingleHotel(message)
        // ));
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

    handleAndroidSingleHotel(message) {
        console.log("handleAndroidSingleHotel ---------------", message);
        // this.applyFilters();
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
                    // this.setState({listingsMap:this.hotels});
                    if (this.state.isLoading) {
                        this.setState({
                            isLoading: false,
                        });
                        // this.state.isLoading = false;
                    }
                    this.setState(prevState => ({
                        listings: [...prevState.listings, jsonHotel]
                    }));
                }
                
                // this.setState(prevState => ({
                //     listingsMap: [...prevState.listingsMap, object]
                // }));
            }
        } catch (e) {
            // Error
        }
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

    alterMap() {
        this.setState({ showResultsOnMap: !this.state.showResultsOnMap });
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    // onDatesSelect({ startDate, endDate }) {
    //     this.setState({
    //         search : '',
    //         checkInDate : startDate,
    //         checkOutDate : endDate,
    //     });
    // }

    onSearchHandler(value) {
        this.onSearchChange(value);
    }

    // onSearchChange(value) {
    //     setSearchValue({ value });
    //     clearSelected();
    // }

    renderHomes() {
        return (
            <View style={styles.sectionView}>
                <View style={styles.subtitleView}>
                    <Text style={styles.subtitleText}>Popular Homes</Text>
                </View>

                <View style={styles.tilesView}>
                    { this.state.topHomes.map(listing => <SmallPropertyTile listingsType="homes" listing={listing} key={listing.id} />) }
                </View>
            </View>
        );
    }

    loadMore = () => {
        if (this.state.page < this.state.totalPages - 1) {
            this.setState(
                {
                    isLoading: true,
                    page: this.state.page + 1
                },
                () => {
                    this.applyFilters(true);
                }
            );
        }
    }

    updateFilter(data) {
        this.setState({
            listings: [],
            showUnAvailable: data.showUnAvailable,
            nameFilter: data.hotelName,
            selectedRating: data.selectedRating,
            isLoading: true,
            orderBy: data.priceSort,
            sliderValue: data.sliderValue,
            page: 0
        }, () => {
            this.applyFilters(false);
        });
    }

    applyFilters(loadMore) {
        const search = this.getSearchString();
        const filters = this.getFilterString();
        // const page = this.state.page ? this.state.page : 0;
        requester.getStaticHotelsByFilter(search, filters).then((res) => {
            if (res.success) {
                res.body.then((data) => {
                    let mapInfo = [];
                    mapInfo = data.content.map((hotel) => {
                        return {
                            id: hotel.id,
                            lat: hotel.latitude,
                            lon: hotel.longitude,
                            name: hotel.name,
                            price: hotel.price,
                            stars: hotel.star,
                            thumbnail: { url: hotel.hotelPhoto }
                        };
                    });
                    if (loadMore) {
                        // Add to existing data
                        this.setState({
                            isFilterLoaded: true,
                            isLoading: false,
                            listings: [...this.state.listings, ...mapInfo] 
                        }, () => {
                            if (this.state.listings.length <= 0) {
                                this.setState({ noResultsFound: true });
                            } else {
                                this.setState({ noResultsFound: false });
                            }
                        });
                    } else {
                        this.setState({
                            isFilterLoaded: true,
                            isLoading: false,
                            listings: mapInfo,
                            totalPages: data.totalPages
                        }, () => {
                            if (this.state.listings.length <= 0) {
                                this.setState({ noResultsFound: true });
                            } else {
                                this.setState({ noResultsFound: false });
                            }
                        });
                    }
                });
            } else {
                // error
            }
        });
    }

    getSearchString() {
        const queryParams = queryString.parse(mainUrl);
        let search = `?region=${encodeURI(queryParams.region)}`;
        search += `&currency=${encodeURI(queryParams.currency)}`;
        search += `&startDate=${encodeURI(queryParams.startDate)}`;
        search += `&endDate=${encodeURI(queryParams.endDate)}`;
        search += `&rooms=${encodeURI(queryParams.rooms)}`;
        return search;
    }

    getFilterString() {
        const filtersObj = {
            showUnavailable: this.state.showUnAvailable,
            name: this.state.nameFilter,
            minPrice: this.state.sliderValue[0],
            maxPrice: this.state.sliderValue[1],
            stars: this.mapStars(this.state.selectedRating)
        };

        const page = this.state.page;
        const sort = this.state.orderBy;
        const pagination = `&page=${page}&sort=${sort}`;
        const filters = `&filters=${encodeURI(JSON.stringify(filtersObj))}` + pagination; //eslint-disable-line
        return filters;
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

    gotoGuests() {
        // if (clientRef) {
        //     clientRef.disconnect();
        // }
        // this.props.navigation.navigate('GuestsScreen', {adults: this.state.adults, children: this.state.children, infants: this.state.infants, updateData:this.updateData, childrenBool: this.state.childrenBool});
    }

    gotoSettings() {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('HotelFilterScreen', {
            isHotelSelected: true,
            updateFilter: this.updateFilter,
            selectedRating: this.state.selectedRating,
            showUnAvailable: this.state.showUnAvailable,
            hotelName: this.state.nameFilter
        });
    }

    gotoSearch() {
    //     if (clientRef) {
    //         clientRef.disconnect();
    //     }
    //   this.props.navigation.navigate('PropertyScreen');
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    gotoHotelDetailsPage(item) {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.setState({isLoadingHotelDetails: true});
        requester.getHotelById(item.id, this.state.urlForService.split('&')).then((res) => {
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
                    urlForService: this.state.urlForService,
                    locRate: this.state.locRate,
                    currency: this.state.currency,
                    currencySign: this.state.currencySign,
                    hotelFullDetails: data,
                    dataSourcePreview: hotelPhotos,
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    calloutClick = (item) => {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.setState({isLoadingHotelDetails: true});
        requester.getHotelById(item.id, this.state.urlForService.split('&')).then((res) => {
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
                    urlForService: this.state.urlForService,
                    locRate: this.state.locRate,
                    currency: this.state.currency,
                    currencySign: this.state.currencySign,
                    hotelFullDetails: data,
                    dataSourcePreview: hotelPhotos,
                });
            }).catch((err) => {
                console.log(err);
            });
        });
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
                        uri: 'https://beta.locktrip.com/images/loader.gif'
                    }}
                />
            </View>
        );
    }

    renderInfoTv() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10
            }}
            >
                <Text style={{
                    width: '100%', height: 35, fontSize: 20, textAlign: 'center'
                }}
                >
                No Results Found
                </Text>
            </View>
        );
    }

    renderLog() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10
            }}
            />
        );
    }

    renderFilterText() {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ marginTop: 18, width: '100%', textAlign: 'center' }}>Search in progress, filtering will be possible after it is completed</Text>
                <Image style={{ height: 35, width: 35 }} source={{ uri: 'https://beta.locktrip.com/images/loader.gif' }} />
            </View>
        );
    }
    renderFilter() {
        return (
            <View style={{ width: '100%', height: 80 }}>
                <DateAndGuestPicker
                    checkInDate={this.state.checkInDate}
                    checkOutDate={this.state.checkOutDate}
                    adults={this.state.guests}
                    children={0} //eslint-disable-line
                    guests={0}
                    infants={0}
                    gotoGuests={this.gotoGuests}
                    gotoSearch={this.gotoSearch}
                    onDatesSelect={this.onDatesSelect}
                    gotoSettings={this.gotoSettings}
                    showSearchButton={false}
                />
            </View>
        );
    }

    render() {
        console.log("hotels---------", this.state.listings);
        const {
            search, searchedCity
        } = this.state;
        return (
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => this.onBackPress()} style={styles.backButton}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/png/arrow-back.png')} />
                </TouchableOpacity>
                {/* Search Text Field */}
                <View style={styles.searchAreaView}>
                    <SearchBar
                        autoCorrect={false}
                        value={search}
                        onChangeText={this.onSearchHandler}
                        placeholder={searchedCity}
                        placeholderTextColor="#bdbdbd"
                        leftIcon="search"
                    />
                </View>
                {/* Filter Box */}
                {this.state.isFilterLoaded && this.renderFilter() }
                {/* Show map button */}
                
                {this.state.showResultsOnMap &&
                    <TouchableOpacity onPress={this.alterMap}>
                        <View style={{
                            marginLeft: 18, marginTop: 20, marginRight: 18,alignItems: 'center', backgroundColor: '#fff', minHeight: 120, maxHeight: 120, padding: 7
                        }}
                        >
                            <ImageBackground source={require('../../../assets/map_button.jpg')} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.searchButtonText}>See Results List</Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>}
                {/* No Results Text */}
                {this.state.noResultsFound && this.renderInfoTv()}
                {/* View for map and list */}
                <View style={styles.itemView}>
                    {this.state.showResultsOnMap ?
                        // MapView
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: this.state.listingsMap.length >= 1 ?
                                    parseFloat(this.state.listingsMap[0].lat) : this.state.initialLat,
                                longitude: this.state.listingsMap.length >= 1 ?
                                    parseFloat(this.state.listingsMap[0].lon) : this.state.initialLon,
                                latitudeDelta: 1,
                                longitudeDelta: 1
                            }}
                        >
                            {/* Marker */}
                            {this.state.listingsMap.map(marker => marker.lat != null && (
                                <Marker
                                    coordinate={{
                                        latitude: parseFloat(marker.lat),
                                        longitude: parseFloat(marker.lon)
                                    }}
                                    onCalloutPress={this.calloutClick.bind(this, marker)} //eslint-disable-line
                                >
                                    {/* Marker click */}
                                    <MapView.Callout
                                        tooltip
                                    >
                                        <View style={
                                            {
                                                paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
                                            }
                                        }
                                        >
                                            <Image
                                                style={{ width: 100, height: 60 }}
                                                source={marker.thumbnail !== null && { uri: imgHost + marker.thumbnail.url }}
                                            />
                                            <Text style={styles.location}>
                                                {marker.name}
                                            </Text>
                                            <Text style={styles.description}>
                                        LOC {marker.price} / Night
                                            </Text>
                                            <Text style={styles.ratingsMap}>
                                                {
                                                    Array(marker.stars !== null && marker.stars).fill().map(i => <FontAwesome>{Icons.starO}</FontAwesome>)
                                                }
                                            </Text>
                                        </View>
                                    </MapView.Callout>
                                </Marker>
                            ))}
                        </MapView>
                        :
                        // FlatList
                        <FlatList
                            bounces={false}
                            style={styles.flatList}
                            data={this.state.listings}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if (!this.onEndReachedCalledDuringMomentum) {
                                    this.loadMore();
                                    this.onEndReachedCalledDuringMomentum = true;
                                }
                            }
                            }
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            refreshing={false}
                            ListHeaderComponent={
                                !this.state.isLoading ? 
                                <TouchableOpacity onPress={this.alterMap}>
                                    <View style={{
                                        marginLeft: 18, alignItems: 'center', backgroundColor: '#fff', minHeight: 120, maxHeight: 120, padding: 7
                                    }}
                                    >
                                        <ImageBackground source={require('../../../assets/map_button.jpg')} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={styles.searchButtonText}>See Results on Map</Text>
                                        </ImageBackground>
                                    </View>
                                </TouchableOpacity>
                                :
                                <View></View>
                            }
                            ListFooterComponent={
                                this.state.isLoading && this.renderLoader()
                            }
                            renderItem={
                                ({ item }) =>
                                    (<HotelItemView
                                        item={item}
                                        currencySign={this.state.currencySign}
                                        locRate={this.state.locRate}
                                        gotoHotelDetailsPage={this.gotoHotelDetailsPage}
                                    />)
                            }
                        />
                    }
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
}

export default withNavigation(Property);
