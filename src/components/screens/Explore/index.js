import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import SplashScreen from 'react-native-smart-splash-screen';
import { ScrollView, Text, View, TouchableOpacity, Image, Picker, StyleSheet, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { domainPrefix } from '../../../config';
import { getUserInfo, getRegionsBySearchParameter, getCountriesWithListings, getTopHomes, getLocRate, getLocRateInUserSelectedCurrency } from '../../../utils/requester';
import Icon from 'react-native-fontawesome';

const shouldBeNative = true; //This line controls which screen should be show when clicked on search, it its true it will take to hardcoded hotel else will take to webview

//Bellow are details of hardcoded hotel
const dummyHotel = {
    "id": 6527,
    "externalId": 53209,
    "name": "Thistle City Barbican",
    "description": "<p><b>Property Location</b> <br />With a stay at Thistle Barbican Shoreditch in London (London City Centre), you'll be convenient to Barbican Arts Centre and St. Paul's Cathedral.  This spa hotel is close to London Bridge and Tower of London.</p><p><b>Rooms</b> <br />Stay in one of 463 guestrooms featuring flat-screen televisions. Complimentary wireless Internet access keeps you connected, and digital programming is available for your entertainment. Private bathrooms with bathtubs or showers feature complimentary toiletries and hair dryers. Conveniences include phones, as well as desks and coffee/tea makers.</p><p><b>Amenities</b> <br />Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an indoor pool, a spa tub, and a sauna. This hotel also features complimentary wireless Internet access, concierge services, and wedding services.</p><p><b>Dining</b> <br />Satisfy your appetite at the hotel's restaurant, which serves breakfast and dinner, or stay in and take advantage of 24-hour room service. Relax with a refreshing drink at one of the 2 bars/lounges.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include a business center, express check-out, and complimentary newspapers in the lobby. This hotel has 13 meeting rooms available for events. Self parking (subject to charges) is available onsite.</p> <br/> Pets not allowed  Check-in time starts at 2 PM  Check-out time is noon <br/> Satisfy your appetite at the hotel's restaurant, which serves breakfast and dinner, or stay in and take advantage of 24-hour room service. Relax with a refreshing drink at one of the 2 bars/lounges. <br/> Extra-person charges may apply and vary depending on property policy. <br />Government-issued photo identification and a credit card or cash deposit are required at check-in for incidental charges. <br />Special requests are subject to availability upon check-in and may incur additional charges. Special requests cannot be guaranteed. <br /> <br/> Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an indoor pool, a spa tub, and a sauna. This hotel also features complimentary wireless Internet access, concierge services, and wedding services. <br /> Stay in one of 463 guestrooms featuring flat-screen televisions. Complimentary wireless Internet access keeps you connected, and digital programming is available for your entertainment. Private bathrooms with bathtubs or showers feature complimentary toiletries and hair dryers. Conveniences include phones, as well as desks and coffee/tea makers.",
    "price": 124.12,
    "photos": [
      "hotels/images/img-2-2847137318373929-53209.png",
      "hotels/images/img-2-2847137496912373-53209.png",
      "hotels/images/img-2-2847137688789566-53209.png",
      "hotels/images/img-2-2847137853195047-53209.png",
      "hotels/images/img-2-2847138029413843-53209.png",
      "hotels/images/img-2-2847138185923117-53209.png",
      "hotels/images/img-2-2847138338790016-53209.png",
      "hotels/images/img-2-2847138561951781-53209.png",
      "hotels/images/img-2-2847138750326642-53209.png"
    ],
    "stars": 3,
    "lat": "51.527277",
    "lon": "-0.095969",
    "amenities": [],
    "rooms": [],
    "additionalInfo": null,
    "city": null,
    "region": null,
    "descriptions": []
  };
const roomsDummyData = [{ adults: 2, children: [] }]; //Hard coded adults and children
const urlForService = 'region=52612&currency=GBP&startDate=21/06/2018&endDate=23/06/2018&rooms='+encodeURI(JSON.stringify(roomsDummyData)); //Here we are creating a url with all these hard coded values which will work for 21-23june 2018

class Explore extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

    constructor(props) {
        super(props);

        const startDate = moment().add(1, 'day');
        const endDate = moment().add(2, 'day');

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.getCountryValues = this.getCountryValues.bind(this);
        this.gotoGuests = this.gotoGuests.bind(this);
        this.gotoSettings = this.gotoSettings.bind(this);
        this.gotoSearch = this.gotoSearch.bind(this);
        this.renderAutocomplete = this.renderAutocomplete.bind(this);
        this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
        this.onDatesSelect = this.onDatesSelect.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.state = {
            isHotelSelected: true,
            countryId: 0,
            countries: [],
            cities: [],
            search: '',
            regionId: '',
            currency: 'USD',
            checkInDate: startDate.format('ddd, DD MMM').toString(),
            checkInDateFormated: startDate.format('DD/MM/YYYY').toString(),
            checkOutDate: endDate.format('ddd, DD MMM').toString(),
            checkOutDateFormated: endDate.format('DD/MM/YYYY').toString(),
            guests: 2,
            adults: 2,
            children: 0,
            infants: 0,
            topHomes: [],
            roomsDummyData: [{ adults: 2, children: [] }],
            count: {
                beds: 2,
                bedrooms: 0,
                bathrooms: 0
            },
            childrenBool: false,
            locPrice : 0,
            language: "EUR",
            locRates: [],
            currencyIcon: Icons.euro,
            email: '',
            token: ''
        };
        this.getCountryValues();
    }

    async componentWillMount() {
        const token_value = await AsyncStorage.getItem(`${domainPrefix}.auth.lockchain`);
        const email_value = await AsyncStorage.getItem(`${domainPrefix}.auth.username`);
        
        this.setState({
            token: token_value,
            email : email_value,
        });
            
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 0,
            delay: 0
        });
    }

    componentDidMount() {
        console.disableYellowBox = true
        getTopHomes().then((topHomes) => {
            const truncated = topHomes.content.slice(0, 4);
            this.setState({ topHomes: truncated });
        });

        getLocRate()
        .then((json) => {
            this.setState({locRates: json[0], locPrice: json[0].price_eur});
            AsyncStorage.setItem('currentCurrency', "EUR");
            AsyncStorage.setItem('currencyLocPrice', json[0].price_eur);

            console.log("currencyLocPrice" + json[0].price_eur);
        }).catch(err => {
            console.log(err);
        });
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    onDatesSelect({ startDate, endDate }) {
        const year = (new Date()).getFullYear();
        this.setState({
            checkInDate: startDate,
            checkOutDate: endDate,
            checkInDateFormated: (moment(startDate, 'ddd, DD MMM').format('DD/MM/').toString()) + year,
            checkOutDateFormated: (moment(endDate, 'ddd, DD MMM').format('DD/MM/').toString()) + year
        });
    }

    onSearchHandler(value) {
        this.setState({ search: value });
        if (value === '') {
            this.setState({ cities: [] });
        } else {
            getRegionsBySearchParameter(value).then(res => res.response.json()).then((json) => {
                if (this.state.search != '') {
                    this.setState({cities : json });
                }
            });
        }
    }

    getCountryValues() {
        getCountriesWithListings().then(res => res.response.json()).then((json) => {
            countryArr = []
            json.content.map((item, i) => {
                countryArr.push({ 'label': item.name, 'value': item.id })
            })
            this.setState({
                countries: countryArr
            })
        })
    }

    onValueChange = (value) => {
        console.log(value);
        console.log(this.state.loc)
    }

    updateData(data) {
        this.setState({
            adults: data.adults,
            children: data.children,
            infants: data.infants,
            guests: data.adults + data.children + data.infants,
            childrenBool: data.childrenBool
        });
    }

    updateFilter(data){
        this.setState({
            isHotelSelected: data.isHotelSelected,
            count: data.count
        });
    }

    gotoGuests() {
        this.props.navigation.navigate('GuestsScreen', {
            guests: this.state.guests,
            adults: this.state.adults,
            children: this.state.children,
            infants: this.state.infants,
            updateData: this.updateData,
            childrenBool: this.state.childrenBool
        });
    }

    gotoSettings() {
        this.props.navigation.navigate('FilterScreen', {
            isHotelSelected: this.state.isHotelSelected,
            count: this.state.count,
            updateFilter: this.updateFilter,
            searchedCity: this.state.search,
            searchedCityId: 72,
            checkInDate: this.state.checkInDate,
            checkOutDate: this.state.checkOutDate,
            guests: this.state.guests,
            adults: this.state.adults,
            children: this.state.children,
            regionId: this.state.regionId,
            currency: this.state.language,
            checkOutDateFormated: this.state.checkOutDateFormated,
            checkInDateFormated: this.state.checkInDateFormated,
            roomsDummyData: encodeURI(JSON.stringify(this.state.roomsDummyData)),
        });
    }

    gotoSearch() {

        if(shouldBeNative){
            //Native hard coded
            //Here navigate to hard coded screen
            this.props.navigation.navigate('HotelDetails', {guests : 2, hotelDetail: dummyHotel, urlForService: urlForService, locRate: this.state.locRate, currencyIcon: this.state.currencyIcon});
        }
        else {
            //Webview
            //Here navigate to webview
            this.props.navigation.navigate('PropertyScreen', {
                searchedCity: this.state.search,
                searchedCityId: 72,
                checkInDate: this.state.checkInDate,
                checkOutDate: this.state.checkOutDate,
                guests: this.state.guests,
                children: this.state.children,
                countryId: this.state.countryId,
                regionId: this.state.regionId,
                isHotelSelected: this.state.isHotelSelected,
                currency: this.state.language,
                checkOutDateFormated: this.state.checkOutDateFormated,
                checkInDateFormated: this.state.checkInDateFormated,
                roomsDummyData: encodeURI(JSON.stringify(this.state.roomsDummyData)),
                locRate : this.state.locPrice,
                currencyIcon: this.state.currencyIcon,
                email: this.state.email,
                token: this.state.token
            });
        }

    }

    spinnerValueChange(value){
        this.setState({language: value});
        if(value == "EUR"){
            AsyncStorage.setItem('currentCurrency', "EUR");
            AsyncStorage.setItem('currencyLocPrice', this.state.locRates.price_eur);
            this.setState({locPrice: this.state.locRates.price_eur, currencyIcon: Icons.euro})
        }
        else if(value == "USD"){
            AsyncStorage.setItem('currentCurrency', "USD");
            AsyncStorage.setItem('currencyLocPrice', this.state.locRates.price_usd);
            this.setState({locPrice: this.state.locRates.price_usd, currencyIcon: Icons.usd})
        }
        else if(value == "GBP"){
            getLocRateInUserSelectedCurrency('GBP')
            .then((json) => {
                AsyncStorage.setItem('currentCurrency', "GBP");
                AsyncStorage.setItem('currencyLocPrice', json[0].price_gbp);
                this.setState({locPrice: json[0].price_gbp, currencyIcon: Icons.gbp});
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleAutocompleteSelect(id, name) {
        this.setState({
            cities: [], search: name, regionId: id
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

    renderAutocomplete() {
        if (this.state.cities.length > 0) {
            return (
                <ScrollView
                    style={{ marginLeft: 17, marginRight: 17, minHeight: 100 }}
                >
                    {
                        this.state.cities.map( result => { //eslint-disable-line
                            return(//eslint-disable-line
                                <TouchableOpacity
                                    key={result.id}
                                    style={styles.autocompleteTextWrapper}
                                    onPress={() => this.handleAutocompleteSelect(result.id, result.query)}
                                >
                                    <Text style={styles.autocompleteText} >{result.query}</Text>
                                </TouchableOpacity>
                            )//eslint-disable-line
                        })
                    }
                </ScrollView>
            );
        } else {//eslint-disable-line
            return null;//eslint-disable-line
        }
    }

    render() {
        const {
            adults, children, infants, search, checkInDate, checkOutDate, guests, topHomes, onDatesSelect, countries
        } = this.state;
        return (

            <View style={styles.container}>

                <View style={styles.SearchAndPickerwarp}>
                        {this.state.isHotelSelected &&
                            <View style={styles.searchAreaView}>
                                <SearchBar
                                    autoCorrect={false}
                                    value={this.state.search}
                                    onChangeText={this.onSearchHandler}
                                    placeholder="Discover your next experience"
                                    placeholderTextColor="#bdbdbd"
                                    leftIcon="search"
                                    onLeftPress={this.gotoSearch}
                                />

                            </View>
                        }
                        {!this.state.isHotelSelected && countries.length > 0 &&
                            <View style={styles.searchAreaView}>
                                <RNPickerSelect
                                    items={countries}
                                    placeholder={{
                                        label: 'Choose a location',
                                        value: 0,
                                    }}
                                    onValueChange={(value) => {
                                        this.setState({
                                            countryId: value,
                                        });
                                    }}
                                    value={this.state.countryId}
                                    style={{ ...pickerSelectStyles }}
                                />
                            </View>
                        }
                        <View style={styles.pickerWrap}>

                                <Picker style={styles.picker}
                                  selectedValue={this.state.language}
                                  onValueChange={(itemValue, itemIndex) => this.spinnerValueChange(itemValue)}>
                                  <Picker.Item label="EUR" value="EUR" />
                                  <Picker.Item label="USD" value="USD" />
                                  <Picker.Item label="GBP" value="GBP" />
                                </Picker>
                        </View>
                </View>
                <ScrollView>
                    <View style={styles.scrollViewContentMain}>
                        {this.renderAutocomplete()}  
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
                            showSearchButton= {true}
                        />
                    </View>
                    
                    <View style={styles.scrollViewContent}>
                        
                        <Text style={styles.scrollViewTitles}>Discover</Text>
                        
                        <View style={styles.viewDiscover}>
                            <Image style={styles.imageViewDiscoverLeft} resizeMode='contain'
                                source={require('../../../assets/home_images/hotels.png')}/>
                        
                            <Image style={styles.imageViewDiscoverRight} resizeMode='contain'
                                source={require('../../../assets/home_images/homes.png')}/>
                        </View>
               
                        <Text style={styles.scrollViewTitles}>Popular Destinations</Text>

                        <View style={styles.divider}/>
               
                        <View style={styles.viewPopularHotels}>
                   
                            <View style={styles.subViewPopularHotelsLeft}>
                                <Image style={styles.imageViewPopularHotels} resizeMode='stretch'
                                    source={require('../../../assets/home_images/london.png')}/>
                            </View>
                   
                            <View style={styles.subViewPopularHotelsRight}>
                                <Image style={styles.imageViewPopularHotels} resizeMode='stretch'
                                    source={require('../../../assets/home_images/Madrid.png')}/>
                            </View>
                        </View>
               
                        <View style={styles.viewPopularHotels}>
                            
                            <View style={styles.subViewPopularHotelsLeft}>
                                <Image style={styles.imageViewPopularHotels} resizeMode='stretch'
                                    source={require('../../../assets/home_images/paris.png')}/>
                            </View>
                            
                            <View style={styles.subViewPopularHotelsRight}>
                                <Image style={styles.imageViewPopularHotels} resizeMode='stretch'
                                    source={require('../../../assets/home_images/Sydney.png')}/>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <View style={styles.searchButtonView}>
                                <Text style={styles.searchButtonText}>Show All</Text>
                            </View>
                        </TouchableOpacity>

               
                        <View style={styles.bottomView}>
                            <Image style={styles.bottomViewText} resizeMode='stretch'
                                source={require('../../../assets/texthome.png')}/>
                            <TouchableOpacity style={styles.getStartedButtonView}>
                                <View>
                                    <Text style={styles.searchButtonText}>Get Started</Text>
                                </View>
                            </TouchableOpacity>
                            <Image style={styles.bottomViewBanner} resizeMode='stretch'
                                source={require('../../../../src/assets/vector.png')}/>
                        </View>
               
                    </View>
                </ScrollView>

                <View style={styles.fab}>
                    <Text style={styles.fabText}>LOC/{this.state.language} {parseFloat(this.state.locPrice).toFixed(2)}</Text>
                </View>
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
