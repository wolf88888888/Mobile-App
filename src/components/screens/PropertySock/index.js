import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import queryString from 'query-string';
import Image from 'react-native-remote-svg';
import { withNavigation } from 'react-navigation';
import { imgHost } from '../../../config';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import HotelItemView from '../../organisms/HotelItemView';
import styles from './styles';
import UUIDGenerator from 'react-native-uuid-generator';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import requester from '../../../initDependencies';

const androidStomp = NativeModules.StompModule;
const stomp = require('stomp-websocket-js');

const clientRef = undefined;
let uid = '';
var mainUrl = '';
let countIos;

class Property extends Component {
    static propTypes = {
        onAutocompleteSelect: PropTypes.func,
        autocomplete: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }))
    }

    static defaultProps = {
        autocomplete: [],
        onAutocompleteSelect: () => {}
    }

    constructor(props) {
        super(props);

        UUIDGenerator.getRandomUUID((uuid) => {
            uid = uuid;
        });
      
        console.disableYellowBox = true;
        this.handleReceiveSingleHotel = this.handleReceiveSingleHotel.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateData = this.updateData.bind(this);
        this.gotoGuests = this.gotoGuests.bind(this);
        this.gotoSettings = this.gotoSettings.bind(this);
        this.gotoSearch = this.gotoSearch.bind(this);
        this.renderAutocomplete = this.renderAutocomplete.bind(this);
        this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
        this.onDatesSelect = this.onDatesSelect.bind(this);
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
            adults: 2,
            children: 1,
            infants: 0,
            topHomes: [],
            listings: [],
            searchedCity: 'Discover your next experience',
            searchedCityId: 0,
            // these state are for paramerters in urlForService
            regionId: '',
            checkInDateFormated: '',
            checkOutDateFormated: '',
            roomsDummyData: [],
            urlForService:'',
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
            totalPages: 0
        };
        const { params } = this.props.navigation.state;
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

    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.stompIos();
        } else if (Platform.OS === 'android') {
            androidStomp.startSession(uid, mainUrl, () => {
                this.applyFilters(false);
            });
            // DeviceEventEmitter.addListener("SOCK_EVENT", ({message}) => (
            //     console.log(message)
            //     //this.handleAndroidSingleHotel(message)
            // ));
        }
    }

    componentDidMount() {
        
    }

    stompIos() {
        countIos = 0;
        clientRef = stomp.client('wss://alpha.locktrip.com/socket');
        clientRef.connect({}, (frame) => {
            var headers = {'content-length': false};
            clientRef.subscribe(`search/${uid}`, this.handleReceiveSingleHotel);
            clientRef.send("search",
                headers,
                JSON.stringify({uuid: uid, query : mainUrl})
            )
        }, (error) => {
            clientRef.disconnect();
            this.setState({
                isLoading: false,
            });
        });
    }

    alterMap() {
        this.setState({showResultsOnMap : !this.state.showResultsOnMap});
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    onDatesSelect({ startDate, endDate }) {
        // this.setState({
        //     search : '',
        //     checkInDate : startDate,
        //     checkOutDate : endDate,
        // });
    }

    onSearchHandler(value) {
        this.onSearchChange(value);
    }

    onSearchChange(value) {
        setSearchValue({ value });
        clearSelected();
    }

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

    updateData(data) {
        this.setState({ adults: data.adults, children: data.children, infants: data.infants});
    }

    loadMore = () => {
        if ( this.state.page < this.state.totalPages-1){
            this.setState(
                {
                    isLoading: true,
                    page: this.state.page + 1,
                },
                () =>{
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
                    if (loadMore){
                        //Add to existing data
                        this.setState(prevState => ({
                            isFilterLoaded: true,
                            isLoading: false,
                            listings: [...this.state.listings, ...mapInfo] 
                        }), () => {
                            if (this.state.listings.length <= 0) {
                                this.setState({ noResultsFound: true });
                            } else {
                                this.setState({ noResultsFound: false });
                            }
                        });
                    }
                    else{
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
        this.props.navigation.navigate('HotelFilterScreen', {isHotelSelected: true, updateFilter: this.updateFilter, selectedRating: this.state.selectedRating, showUnAvailable: this.state.showUnAvailable, hotelName: this.state.nameFilter});
    }

    gotoSearch() {
    //     if (clientRef) {
    //         clientRef.disconnect();
    //     }
    //   this.props.navigation.navigate('PropertyScreen');
    }

    handleAutocompleteSelect(id, name) {
        return () => {
            this.props.onAutocompleteSelect(id, name);
        };
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    gotoHotelDetailsPage(item) {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('HotelDetails', 
            {
                guests : this.state.guests, 
                hotelDetail: item, 
                urlForService: this.state.urlForService, 
                locRate: this.state.locRate,
                currency: this.state.currency,
                currencySign: this.state.currencySign
            });
    }

    calloutClick = (item) => {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('HotelDetails',
            {
                guests : this.state.guests, 
                hotelDetail: item, 
                urlForService: this.state.urlForService, 
                locRate: this.state.locRate,
                currency: this.state.currency,
                currencySign: this.state.currencySign
            });
    }

    renderAutocomplete() {
        return (
            <ScrollView
                style={{backgroundColor: 'green'}}
                contentContainerStyle={{ flex: 1 }}
            >
                {
                    this.props.autocomplete.map(result => (
                        <TouchableOpacity
                            key={result.id}
                            style={styles.autocompleteTextWrapper}
                            onPress={this.handleAutocompleteSelect(result.id, result.name)}
                        >
                            <Text style={styles.autocompleteText} >{result.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        );
    }

    renderLoader() {
        return(
            <View style={{ flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10}}>
                <Image style={{height:35, width: 35}} source={{uri: 'https://alpha.locktrip.com/images/loader.gif'}} /> 
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
                    width: '100%', height: 35, fontSize: 20, textAlign: 'center', 
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
                <Image style={{ height: 35, width: 35 }} source={{ uri: 'https://alpha.locktrip.com/images/loader.gif' }} />
            </View>
        );
    }
    renderFilter() {
        return (
            <View style={{ width: '100%', height: 90 }}>
                <DateAndGuestPicker
                    checkInDate={this.state.checkInDate}
                    checkOutDate={this.state.checkOutDate}
                    adults={this.state.guests}
                    children={0}
                    guests = {0}
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
        const {
            search, searchedCity
        } = this.state;
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => this.onBackPress()} style={styles.backButton}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/png/arrow-back.png')} />
                </TouchableOpacity>

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
                
                {/* {!this.props.autocomplete.length && this.renderAutocomplete()} */}

                {this.state.isFilterLoaded && this.renderFilter() }

                {this.state.showResultsOnMap && 
                <TouchableOpacity onPress={this.alterMap}>
                    <View style={styles.searchButtonView}>
                        <Text style={styles.searchButtonText}>See Results List</Text>
                    </View>
                </TouchableOpacity>}
                

                {this.state.noResultsFound && this.renderInfoTv()}

                <View style={styles.itemView}>

                    {
                        this.state.showResultsOnMap ?

                            <MapView
                                style={styles.map}
                                region={{
                                    latitude: this.state.listings.length >= 1 ? parseFloat(this.state.listings[0].lat) : this.state.initialLat,
                                    longitude: this.state.listings.length >= 1 ? parseFloat(this.state.listings[0].lon) : this.state.initialLon,
                                    latitudeDelta: 1,
                                    longitudeDelta: 1
                                }}
                                debug={false}>
                                {this.state.listings.map(marker => marker.lat != null && (
                                    <Marker
                                        coordinate={{latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lon)}}
                                        onCalloutPress={this.calloutClick.bind(this, marker)}
                                    >
                                        <MapView.Callout
                                            tooltip
                                        >
                                            <View style={
                                                {
                                                    paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',backgroundColor: '#fff' 
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
                                    <TouchableOpacity onPress={this.alterMap}>
                                        <View style={{
                                            marginLeft: 18, alignItems: 'center',backgroundColor: '#cc8068'
                                        }}>
                                            <Text style={styles.searchButtonText}>See Results on Map</Text>
                                        </View>
                                    </TouchableOpacity>
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
            </View>
        );
    }

    handleAndroidSingleHotel(message) {
        // this.applyFilters();
        try {
            const object = JSON.parse(message);
            if (object.hasOwnProperty('allElements')) {
                if (object.allElements) {
                    this.applyFilters();
                }
            } else {
                this.setState(prevState => ({
                    listings: [...prevState.listings, object]
                }));
            }
        } catch (e) {
            // Error
        }
    }

    handleReceiveSingleHotel(message) {
        if (countIos == 0){
            clientRef.disconnect();
            this.applyFilters(false);
        }
        countIos = 1;
        // const response = JSON.parse(message.body);
        // if (response.hasOwnProperty('allElements')) {
        //     if (response.allElements) {
        //         
        //         this.applyFilters();
        //     }
        // } else {
        //     this.setState(prevState => ({
        //         listings: [...prevState.listings, response]
        //     }));
        // }
    }
}

export default withNavigation(Property);
