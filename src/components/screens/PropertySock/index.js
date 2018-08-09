import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter } from 'react-native';
import Image from 'react-native-remote-svg';
import { withNavigation } from 'react-navigation';
import { imgHost } from '../../../config';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import styles from './styles';
import UUIDGenerator from 'react-native-uuid-generator';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

var androidStomp = NativeModules.StompModule;
var stomp = require('stomp-websocket-js');


var clientRef = undefined;
let uid = '';
const mainUrl = '';

class Property extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }),
        search: PropTypes.string,
        checkInDate: PropTypes.string,
        checkOutDate: PropTypes.string,
        topHomes: PropTypes.array, // eslint-disable-line
        onDatesSelect: PropTypes.func,
        onSearchChange: PropTypes.func,
        onAutocompleteSelect: PropTypes.func,
        autocomplete: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })),
        load: PropTypes.func,
        propertyType: PropTypes.oneOf('hotels', 'homes'),
        searchedCity: PropTypes.string,
        searchedCityId: PropTypes.number,
        guests : PropTypes.number
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        },
        load: () => {},
        search: '',
        checkInDate: '',
        checkOutDate: '',
        autocomplete: [],
        onAutocompleteSelect: () => {},
        topHomes: [],
        propertyType: 'homes',
        onDatesSelect: () => {},
        onSearchChange: () => {},
        searchedCity: 'Discover your next experience',
        searchedCityId: 0,
        guests : 0
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
        this.state = {
            search: '',
            checkInDate: '',
            checkOutDate: '',
            guests: 0,
            adults: 2,
            childrenBool: false,
            children: 1,
            infants: 0,
            topHomes: [],
            listings : [],
            listings2 : [],
            searchedCity: 'Discover your next experience',
            searchedCityId: 0,
            //these state are for paramerters in urlForService
            regionId: '',
            currency: '',
            checkInDateFormated: '',
            checkOutDateFormated: '',
            roomsDummyData: [],
            urlForService:'',
            isLoading: true,
            noResultsFound: false,
            locRate: 0,
            currencyIcon : '',
            showResultsOnMap: false,
            initialLat : 0.40,
            initialLon: 34,
            filter: undefined
        };
        const { params } = this.props.navigation.state;
        this.state.searchedCity = params ? params.searchedCity : '';
        this.state.searchedCityId = params ? params.searchedCityId : 0;
        this.state.checkInDate = params ? params.checkInDate : '';
        this.state.checkOutDate = params ? params.checkOutDate : '';
        this.state.guests = params ? params.guests : 0;
        this.state.children = params ? params.children : 0;

        this.state.regionId = params ? params.regionId : [];
        this.state.currency = params ? params.currency : [];
        this.state.checkInDateFormated = params ? params.checkInDateFormated  : '';
        this.state.checkOutDateFormated = params ? params.checkOutDateFormated  : '';
        this.state.roomsDummyData = params ? params.roomsDummyData : [];
        this.state.locRate = params ? params.locRate : 0;
        this.state.currencyIcon = params ? params.currencyIcon: Icons.euro;
        this.state.filter = params?params.filter:[];

        
        mainUrl = '?region='+this.state.regionId+'&currency='+this.state.currency+'&startDate='+this.state.checkInDateFormated+'&endDate='+this.state.checkOutDateFormated+'&rooms='+this.state.roomsDummyData+'&filters='+this.state.filter+'&page=0&sort=priceForSort,asc';
        this.state.urlForService = mainUrl;
    }

    componentWillMount(){
        if (Platform.OS === 'ios'){
            this.stompIos();
        }
        else if (Platform.OS === 'android'){
            androidStomp.startSession(uid, mainUrl);
            DeviceEventEmitter.addListener("SOCK_EVENT", ({message}) => (
                console.log(message),
                this.handleAndroidSingleHotel(message)
            ));
        }
    }

    componentDidMount() {

    }

    stompIos(){
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

    alterMap(){
        this.setState({showResultsOnMap : !this.state.showResultsOnMap});
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    onDatesSelect({ startDate, endDate }){
        this.setState({
            search : '',
            checkInDate : startDate,
            checkOutDate : endDate,
        });
    }

    onSearchHandler(value) {
        this.onSearchChange(value);
    }

    onSearchChange(value){
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

    gotoGuests() {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('GuestsScreen', {adults: this.state.adults, children: this.state.children, infants: this.state.infants, updateData:this.updateData, childrenBool: this.state.childrenBool});
    }

    gotoSettings() {
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('FilterScreen');
    }

    gotoSearch() {
        if (clientRef) {
            clientRef.disconnect();
        }
      this.props.navigation.navigate('PropertyScreen');
    }

    handleAutocompleteSelect(id, name) {
        return () => {
            this.props.onAutocompleteSelect(id, name);
        };
    }

    onBackPress(){
        this.props.navigation.goBack();
    }
    
    gotoHotelDetailsPage = (item) =>{
        console.log(item);
        if (clientRef) {
            clientRef.disconnect();
        }
        this.props.navigation.navigate('HotelDetails', {guests : this.state.guests, hotelDetail: item, urlForService: this.state.urlForService, locRate: this.state.locRate, currencyIcon: this.state.currencyIcon});
    }

    calloutClick(){
        window.alert('Under development');
    }

    renderAutocomplete() {
        return (
            <ScrollView
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

    renderLoader(){
        return(
            <View style={{ flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10}}>
                <Image style={{height:35, width: 35}} source={{uri: 'https://alpha.locktrip.com/images/loader.gif'}} /> 
            </View>
        );
    }

    renderInfoTv(){
        return(
            <View style={{ flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10}}>
                <Text style={{width: '100%', height: 35, fontSize: 20, textAlign: 'center'}}>No Results Found</Text>
            </View>
        );
    }

    renderLog(){
        return(
            <View style={{ flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10}}>   
            </View>
        );
    }

    render() {
        const {
            adults, children, infants, search, checkInDate, checkOutDate, guests, topHomes, onDatesSelect, searchedCity, checkInDateFormated, checkOutDateFormated, roomsDummyData
        } = this.state;
        const { params } = this.props.navigation.state;
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
                {!this.props.autocomplete.length && this.renderAutocomplete()}

                <TouchableOpacity onPress={this.alterMap}>
                    <View style={styles.searchButtonView}>
                        <Text style={styles.searchButtonText}>{this.state.showResultsOnMap ? "See Results List" : "See Results on Map"}</Text>
                    </View>
                </TouchableOpacity>

                {this.state.isLoading && this.renderLoader()}
                {this.state.noResultsFound && this.renderInfoTv()}

                <View style={styles.itemView}>
                    <DateAndGuestPicker
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            adults={guests}
                            children={0}
                            guests = {0}
                            infants={0}
                            gotoGuests={this.gotoGuests}
                            gotoSearch={this.gotoSearch}
                            onDatesSelect={this.onDatesSelect}
                            gotoSettings={this.gotoSettings}
                            showSearchButton= {false}
                        />
                    {
                        this.state.showResultsOnMap ? 

                        <MapView
                            style={styles.map}
                            region={{
                              latitude: this.state.listings[0].lat != null ? this.state.listings[0].lat : this.state.initialLat ,
                              longitude:  this.state.listings[0].lon != null ? this.state.listings[0].lon : this.state.initialLon,
                              latitudeDelta: 1,
                              longitudeDelta: 1,
                            }}
                            debug={false}>
                            {this.state.listings.map(marker => marker.lat != null && (
                            <Marker
                                coordinate={{latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lon)}}
                                onCalloutPress={()=> this.calloutClick()}
                                >
                                <MapView.Callout
                                    tooltip={true}>
                                    <View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' ,backgroundColor: '#fff'}}>
                                        <Image
                                            style={{width: 100, height: 60}}
                                            source={ marker.thumbnail !== null && {uri : imgHost + marker.thumbnail.url} } 
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
                            style={styles.flatList}
                            data={this.state.listings}
                            renderItem={
                                ({item}) =>

                                <TouchableOpacity onPress={this.gotoHotelDetailsPage.bind(this, item)}>
                            
                                <View style={styles.card}>
                                
                                
                                <Image 
                                source={ item.thumbnail !== null && {uri : imgHost + item.thumbnail.url} } 
                                style={styles.popularHotelsImage}/>

                                <TouchableOpacity style={styles.favoritesButton}>
                                    <Image source={require('../../../assets/png/heart.png')} style={styles.favoriteIcon}/>
                                </TouchableOpacity>
                                        <View style={styles.cardContent}>
                                            <Text style={styles.placeName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                            <View style={styles.aboutPlaceView}>
                                                <Text style={styles.placeReviewText}>Excellent</Text>
                                                <Text style={styles.placeReviewNumber}>{item.stars}/5 </Text>
                                                <View style={styles.ratingIconsWrapper}>
                                                    <Image source={require('../../../assets/png/empty-star.png')} style={styles.star}/>
                                                    <Image source={require('../../../assets/png/empty-star.png')} style={styles.star}/>
                                                    <Image source={require('../../../assets/png/empty-star.png')} style={styles.star}/>
                                                    <Image source={require('../../../assets/png/empty-star.png')} style={styles.star}/>
                                                    <Image source={require('../../../assets/png/empty-star.png')} style={styles.star}/>
                                                </View>
                                                <Text style={styles.totalReviews}>73 Reviews</Text>
                                            </View>
                                            <View style={styles.costView}>
                                                <Text style={styles.cost} numberOfLines={1} ellipsizeMode="tail"><FontAwesome>{params ? params.currencyIcon: Icons.euro}</FontAwesome> {item.price} LOC {parseFloat(item.price/this.state.locRate).toFixed(2)} </Text>
                                                <Text style={styles.perNight}>per night</Text>
                                            </View>
                                        </View>
                                </View>
                                </TouchableOpacity>
                            }
                        />
                    }

                    

                    
                </View>
            </View>
        );
    }

    handleAndroidSingleHotel(message){
        try {
            var object = JSON.parse(message);
            if (object.hasOwnProperty('allElements')) {
                if (object.allElements){
                    this.setState({
                        isLoading: false,
                    });
                }
                if (this.state.listings.length <= 0){
                    this.setState({noResultsFound: true,})
                }
            } else {
                this.setState(prevState => ({
                    listings: [...prevState.listings, object]
                  }));
            }
        } catch(e) {
            console.log(e);
        }
    }

    handleReceiveSingleHotel(message) {
        var response = JSON.parse(message.body);
        if (response.hasOwnProperty('allElements')) {
            if (response.allElements){
                clientRef.disconnect();
                this.setState({
                    isLoading: false,
                });
            }
            if (this.state.listings.length <= 0){
                this.setState({noResultsFound: true,})
            }
        } else {
            this.setState(prevState => ({
                listings: [...prevState.listings, response]
              }));
        }
      }
}


export default withNavigation(Property);
