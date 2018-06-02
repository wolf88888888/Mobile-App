import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { getTopHomes } from '../../../utils/requester';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import { withNavigation } from 'react-navigation';

import SplashScreen from 'react-native-smart-splash-screen';
import Image from 'react-native-remote-svg';
import styles from './styles';
import SockJsClient from 'react-stomp';
import { apiHost, domainPrefix, imgHost } from '../../../config';
import moment from 'moment';
import Calendar from '../../templates/Calendar'


import { getRegionsBySearchParameter, getCountriesWithListings } from '../../../utils/requester';

var clientRef = '';
var utf8 = require('utf8');
var binaryToBase64 = require('binaryToBase64');


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
        this.state = {
            search: '',
            checkInDate: '',
            checkOutDate: '',
            guests: 0,
            adults: 2,
            children: 1,
            infants: 0,
            topHomes: [],
            listings : [],
            searchedCity: 'Discover your next experience',
            searchedCityId: 0,
        };
        const { params } = this.props.navigation.state;
        this.state.searchedCity = params ? params.searchedCity : 'Amad';
        this.state.searchedCityId = params ? params.searchedCityId : 0;
        this.state.checkInDate = params ? params.checkInDate : '';
        this.state.checkOutDate = params ? params.checkOutDate : '';
        this.state.guests = params ? params.guests : 2;
    }

    componentWillMount(){
        //Remove Splash
        console.disableYellowBox = true;
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 0,
            delay: 0,
        })
    }

    componentDidMount() {
        getTopHomes().then((topHomes) => {
            const truncated = topHomes.content.slice(0, 4);
            this.setState({ topHomes: truncated });
        });
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    onDatesSelect({ startDate, endDate }){
        this.setState({
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
        getRegionsBySearchParameter(value).then((res) => {
             setSearchRegions(res);
             setAutocomplete(value);
        });
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
        this.props.navigation.navigate('GuestsScreen', {adults: this.state.adults, children: this.state.children, infants: this.state.infants, updateData:this.updateData});
    }

    gotoSettings() {
        this.props.navigation.navigate('FilterScreen');
    }

    gotoSearch() {
      this.props.navigation.navigate('PropertyScreen');
    }

    handleAutocompleteSelect(id, name) {
        return () => {
            this.props.onAutocompleteSelect(id, name);
        };
    }

    onBackPress = () => {
        this.props.navigation.goBack();
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

    // TODO: a renderHotels method does not exist yet because backend does not yet have an endpoint to request popular hotels

    render() {
        const {
            adults, children, infants, search, checkInDate, checkOutDate, guests, topHomes, onDatesSelect, searchedCity
        } = this.state;

        var data = 'region=52612&currency=USD&startDate=30/05/2018&endDate=01/06/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D';

        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={this.onBackPress} style={styles.backButton}>
                    <Image style={styles.btn_backImage} source={require('../../../../src/assets/svg/arrow-back.svg')} />
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
                {!!this.props.autocomplete.length && this.renderAutocomplete()}

                <DateAndGuestPicker
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        adults={adults}
                        children={children} // eslint-disable-line
                        guests = {guests + children}
                        infants={infants}
                        gotoGuests={this.gotoGuests}
                        gotoSearch={this.gotoSearch}
                        onDatesSelect={this.onDatesSelect}
                        gotoSettings={this.gotoSettings}
                        showSearchButton= {false}
                    />


                <FlatList style={styles.flatList}
                        data={this.state.listings}
                        renderItem={
                            ({item}) => 
                            <View style={styles.card}>
                               <Image 
                               source={{uri : imgHost + item.photos[0]}} 
                               style={styles.popularHotelsImage}/>
                               <TouchableOpacity style={styles.favoritesButton}>
                                   <Image source={require('../../../assets/svg/heart.svg')} style={styles.favoriteIcon}/>
                               </TouchableOpacity>
                               <View style={styles.cardContent}>
                                   {/* <View style={styles.locationContainer}>
                                       <Text style={styles.locationText}>LONDON</Text>
                                       <SeparatorDot height={13} width={15}/>
                                       <Text style={styles.locationText}>ENGLAND</Text>
                                   </View> */}
                                   <Text style={styles.placeName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                   <View style={styles.aboutPlaceView}>
                                       <Text style={styles.placeReviewText}>Excellent </Text>
                                       <Text style={styles.placeReviewNumber}>{item.stars}/5 </Text>
                                       <View style={styles.ratingIconsWrapper}>
                                           <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                                           <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                                           <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                                           <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                                           <Image source={require('../../../assets/empty-star.svg')} style={styles.star}/>
                                       </View>
                                       <Text style={styles.totalReviews}> 73 Reviews</Text>
                                   </View>
                                   <View style={styles.costView}>
                                       <Text style={styles.cost} numberOfLines={1} ellipsizeMode="tail">${item.price}(LOC 1.2) </Text>
                                       <Text style={styles.perNight}>per night</Text>
                                   </View>
                               </View>
                            </View>
                        }
                    />

                <SockJsClient url={apiHost + 'handler'} topics={[`/topic/all/6f2dffa5-1aaa-4df9-a8b6-d64d111df60f${binaryToBase64(utf8.encode(data))}`]}
                    onMessage={this.handleReceiveSingleHotel} ref={(client) => { clientRef = client }}
                    onConnect={this.sendInitialWebsocketRequest}
                    getRetryInterval={() => { return 3000; }}
                    debug={true} />
            </View>
        );
    }

    //Search logic
    handleReceiveSingleHotel(response) {
        if (response.hasOwnProperty('allElements')) {
            clientRef.disconnect();
        } else {
            this.setState(prevState => ({
                listings: [...prevState.listings, response]
              }));
        }
      }

      sendInitialWebsocketRequest() {
         let query = 'region=52612&currency=USD&startDate=30/05/2018&endDate=01/06/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D';
    
        const msg = {
          query: query,
          uuid: '6f2dffa5-1aaa-4df9-a8b6-d64d111df60f'
        };
    
        if (clientRef) {
            clientRef.sendMessage(`/app/all/6f2dffa5-1aaa-4df9-a8b6-d64d111df60f${binaryToBase64(utf8.encode(query))}`, JSON.stringify(msg));
        }
        else{
             //client ref is empty
        }
      }
}

function SeparatorDot(props) {
    return (
        <View style={{height: props.height, width: props.width, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 3, width: 3, backgroundColor: '#000', borderRadius: 1.5}}></View>
        </View>
    )
}


export default withNavigation(Property);
