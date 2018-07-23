import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import SplashScreen from 'react-native-smart-splash-screen';
import { ScrollView, Text, View, TouchableOpacity, Image, Picker, StyleSheet, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import { Icons } from 'react-native-fontawesome';
import { domainPrefix } from '../../../config';
import {
    getUserInfo,
    getRegionsBySearchParameter,
    getCountriesWithListings,
    getTopHomes,
    getLocRate,
    getLocRateInUserSelectedCurrency
} from '../../../utils/requester';
import Toast from 'react-native-easy-toast';

const shouldBeNative = true; //This line controls which screen should be shown when clicked on search, it its true it will take to hardcoded hotel else will take to webview

class Explore extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    };

    static defaultProps = {
        navigation: {
            navigate: () => {
            }
        }
    };

    constructor(props) {
        super(props);

        const startDate = moment()
            .add(1, 'day');
        const endDate = moment()
            .add(2, 'day');

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.getCountryValues = this.getCountryValues.bind(this);
        this.gotoGuests = this.gotoGuests.bind(this);
        this.gotoSettings = this.gotoSettings.bind(this);
        this.gotoSearch = this.gotoSearch.bind(this);
        this.renderAutocomplete = this.renderAutocomplete.bind(this);
        this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
        this.handlePopularCities = this.handlePopularCities.bind(this);
        this.onDatesSelect = this.onDatesSelect.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.spinnerValueChange = this.spinnerValueChange.bind(this);
        this.showToast = this.showToast.bind(this);
        this.state = {
            searchHotel: true,
            isHotelSelected: true,
            countryId: 0,
            countryName: '',
            value: '',
            countries: [],
            cities: [],
            search: '',
            regionId: '',
            currency: 'EUR',
            checkInDate: startDate.format('ddd, DD MMM')
                .toString(),
            checkInDateFormated: startDate.format('DD/MM/YYYY')
                .toString(),
            checkOutDate: endDate.format('ddd, DD MMM')
                .toString(),
            checkOutDateFormated: endDate.format('DD/MM/YYYY')
                .toString(),
            guests: 2,
            adults: 2,
            children: 0,
            infants: 0,
            topHomes: [],
            roomsDummyData: [{
                adults: 2,
                children: []
            }],
            count: {
                beds: 2,
                bedrooms: 0,
                bathrooms: 0
            },
            childrenBool: false,
            locPrice: 0,
            language: 'EUR',
            locRates: [],
            currencyIcon: Icons.euro,
            email: '',
            token: '',
            countriesLoaded: false,
            items: [
                {
                    label: 'EUR',
                    value: 'EUR'
                },
                {
                    label: 'USD',
                    value: 'USD'
                },
                {
                    label: 'GBP',
                    value: 'GBP'
                }
            ]
        };
        this.getCountryValues();
    }

    async componentWillMount() {
        const token_value = await AsyncStorage.getItem(`${domainPrefix}.auth.lockchain`);
        const email_value = await AsyncStorage.getItem(`${domainPrefix}.auth.username`);
        this.setState({
            token: token_value,
            email: email_value,
        });

        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 0,
            delay: 0
        });
    }

     async componentDidMount() {
        console.disableYellowBox = true;
        getTopHomes()
            .then((topHomes) => {
                const truncated = topHomes.content.slice(0, 4);
                this.setState({ topHomes: truncated });
            });
        this.spinnerValueChange(this.state.language);
    }

    showToast() {
        this.refs.toast.show('This feature is not enabled yet in the current alpha version.', 1500);
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
            checkInDateFormated: (moment(startDate, 'ddd, DD MMM')
                .format('DD/MM/')
                .toString()) + year,
            checkOutDateFormated: (moment(endDate, 'ddd, DD MMM')
                .format('DD/MM/')
                .toString()) + year
        });
    }

    onSearchHandler(value) {
        this.setState({ search: value });
        if (value === '') {
            this.setState({ cities: [] });
        } else {
            getRegionsBySearchParameter(value)
                .then(res => res.response.json())
                .then((json) => {
                    if (this.state.search != '') {
                        this.setState({ cities: json });
                    }
                });
        }
    }

    getCountryValues() {
        getCountriesWithListings()
            .then(res => res.response.json())
            .then((json) => {
                countryArr = [];
                json.content.map((item, i) => {
                    countryArr.push({
                        'label': item.name,
                        'value': item
                    });
                });
                console.log(countryArr[0].value.id);
                this.setState({
                    countries: countryArr,
                    countriesLoaded: true,
                    countryId: countryArr[0].value.id,
                    countryName: countryArr[0].label
                });
            });
    }

    onValueChange = (value) => {
        console.log(value);
        console.log(this.state.loc);
    };

    updateData(data) {
        this.setState({
            adults: data.adults,
            children: data.children,
            infants: data.infants,
            guests: data.adults + data.children + data.infants,
            childrenBool: data.childrenBool
        });
    }

    updateFilter(data) {
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
            roomsDummyData: encodeURI(JSON.stringify(this.state.roomsDummyData))
        });
    }

    gotoSearch() {
        if (shouldBeNative) {
            if (!this.state.searchHotel) {
                //user searched for home
                this.props.navigation.navigate('PropertyList', {
                    language: this.state.language,
                    currencyIcon: this.state.currencyIcon,
                    locRate: this.state.locPrice,
                    countryId: this.state.countryId,
                    countryName: this.state.countryName,
                    startDate: this.state.checkInDateFormated,
                    endDate: this.state.checkOutDateFormated,
                    guests: 2
                });
            }
            else {
                this.props.navigation.navigate('Debug', {
                    regionId: this.state.regionId,
                    language: this.state.language,
                    currencyIcon: this.state.currencyIcon,
                    locRate: this.state.locPrice,
                    startDate: this.state.checkInDateFormated,
                    endDate: this.state.checkOutDateFormated,
                    startDate: this.state.checkInDateFormated,
                    endDate: this.state.checkOutDateFormated
                });
                // this.props.navigation.navigate('Debug', {
                //     searchedCity: this.state.search,
                //     searchedCityId: 72,
                //     checkInDate: this.state.checkInDate,
                //     checkOutDate: this.state.checkOutDate,
                //     guests: this.state.guests,
                //     children: this.state.children,
                //     regionId: this.state.regionId,
                //     currency: this.state.language,
                //     checkOutDateFormated: this.state.checkOutDateFormated,
                //     checkInDateFormated: this.state.checkInDateFormated,
                //     roomsDummyData: encodeURI(JSON.stringify(this.state.roomsDummyData)),
                //     locRate : this.state.locPrice,
                //     currencyIcon: this.state.currencyIcon
                // });
            }
        }
        else {
            if (!this.state.searchHotel) {
                this.props.navigation.navigate('PropertyList', {
                    language: this.state.language,
                    currencyIcon: this.state.currencyIcon,
                    locRate: this.state.locPrice,
                    countryId: this.state.countryId,
                    countryName: this.state.countryName,
                    startDate: this.state.checkInDateFormated,
                    endDate: this.state.checkOutDateFormated,
                    guests: 2
                });
            }
            else {
                if (this.state.regionId == '') {
                    //Empty location
                    this.refs.toast.show('Location field cannot be empty.', 1500);
                    this.setState({ search: '' });
                }
                else {
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
                        locRate: this.state.locPrice,
                        currencyIcon: this.state.currencyIcon,
                        email: this.state.email,
                        token: this.state.token
                    });
                }
            }
        }
    }

    spinnerValueChange(value) {
        this.setState({ language: value });
        getLocRateInUserSelectedCurrency(value)
            .then((json) => {
                console.log('spinnerValueJson----', json[0], value);
                if (value == 'EUR') {
                    // AsyncStorage.setItem('currentCurrency', 'EUR');
                    // AsyncStorage.setItem('currencyLocPrice', json[0].price_eur);
                    this.setState({
                        locPrice: json[0].price_eur,
                        currencyIcon: Icons.euro
                    });
                }
                else if (value == 'USD') {
                    // AsyncStorage.setItem('currentCurrency', 'USD');
                    // AsyncStorage.setItem('currencyLocPrice', json[0].price_usd);
                    this.setState({
                        locPrice: json[0].price_usd,
                        currencyIcon: Icons.usd
                    });
                }
                else if (value == 'GBP') {
                    // AsyncStorage.setItem('currentCurrency', 'GBP');
                    // AsyncStorage.setItem('currencyLocPrice', json[0].price_gbp);
                    this.setState({
                        locPrice: json[0].price_gbp,
                        currencyIcon: Icons.gbp
                    });
                }
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleAutocompleteSelect(id, name) {
        this.setState({
            cities: [],
            search: name,
            regionId: id
        });
    }

    handlePopularCities(id, name) {
        this.setState({
            cities: [],
            search: name,
            regionId: id,
            searchHotel: true
        });
    }

    renderHomes() {
        return (
            <View style={styles.sectionView}>
                <View style={styles.subtitleView}>
                    <Text style={styles.subtitleText}>Popular Homes</Text>
                </View>

                <View style={styles.tilesView}>
                    {this.state.topHomes.map(listing => <SmallPropertyTile listingsType="homes" listing={listing}
                                                                           key={listing.id}/>)}
                </View>
            </View>
        );
    }

    renderAutocomplete() {
        if (this.state.cities.length > 0) {
            return (
                <ScrollView
                    style={{
                        marginLeft: 17,
                        marginRight: 17,
                        minHeight: 100
                    }}
                >
                    {
                        this.state.cities.map(result => { //eslint-disable-line
                            return (//eslint-disable-line
                                <TouchableOpacity
                                    key={result.id}
                                    style={styles.autocompleteTextWrapper}
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
                        leftIcon="search"
                        onLeftPress={this.gotoSearch}
                    />

                </View>
                <View style={styles.pickerWrap}>
                    <RNPickerSelect
                        items={this.state.items}
                        onValueChange={(value) => {
                            console.log(value);
                            this.spinnerValueChange(value);
                        }}
                        value={this.state.language}
                        style={{ ...pickerSelectStyles }}
                    >
                    </RNPickerSelect>
                </View>
            </View>
        );
    }

    renderHomeTopView() {
        return (
            //Home
            <View style={styles.SearchAndPickerwarp}>
                <View style={styles.countriesSpinner}>
                    <View style={styles.pickerWrapHomes}>
                        <RNPickerSelect
                            items={this.state.countries}
                            placeholder={{
                                label: 'Choose a location',
                                value: 0
                            }}
                            onValueChange={(value) => {
                                this.setState({
                                    countryId: value.id,
                                    countryName: value.name,
                                    value: value
                                });
                            }}
                            value={this.state.value}
                            style={{ ...pickerSelectStyles }}
                        >
                        </RNPickerSelect>
                    </View>
                </View>
                <View style={styles.pickerWrap}>
                    <RNPickerSelect
                        items={this.state.items}
                        onValueChange={(value) => {
                            console.log(value);
                            this.spinnerValueChange(value);
                        }}
                        value={this.state.language}
                        style={{ ...pickerSelectStyles }}
                    >
                    </RNPickerSelect>
                    {/* <Picker style={{width: '100%', height: 50}} itemStyle={{height: 50}}
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) => this.spinnerValueChange(itemValue)}>
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="GBP" value="GBP" />
                    </Picker> */}
                </View>
            </View>
        );
    }

    renderHotelSelected(){
        return(
            <View
                style={{width: '100%',height: '100%', position: 'absolute'}}>
                <Image
                    style= {{flex: 1,
                        margin: 20,
                        width: null,
                        height: null,
                        resizeMode: 'contain'}}
                    source={require('../../../assets/home_images/hotels_selected.png')}
                />
            </View>
        )
    }

    renderHotelDeSelected(){
        return(
            <View
                style={{width: '100%',height: '100%', position: 'absolute'}}>
                <Image
                    style= {{flex: 1,
                        margin: 20,
                        width: null,
                        height: null,
                        resizeMode: 'contain'}}
                    source={require('../../../assets/home_images/hotels_not_selected.png')}
                />
            </View>
        )
    }

    renderHomeSelected(){
        return(
            <View
                style={{width: '100%',height: '100%', position: 'absolute'}}>
                <Image
                    style= {{flex: 1,
                        margin: 20,
                        width: null,
                        height: null,
                        resizeMode: 'contain'}}
                    source={require('../../../assets/home_images/homes_selected.png')}
                />
            </View>
        )
    }

    renderHomeDeSelected(){
        return(
            <View
                style={{width: '100%',height: '100%', position: 'absolute'}}>
                <Image
                    style= {{flex: 1,
                        margin: 20,
                        width: null,
                        height: null,
                        resizeMode: 'contain'}}
                    source={require('../../../assets/home_images/homes__not_selected.png')}
                />
            </View>
        )
    }

    render() {
        const {
            adults, children, infants, search, checkInDate, checkOutDate, guests, topHomes, onDatesSelect, countries
        } = this.state;
        return (

            <View style={styles.container}>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'#DA7B61'}}
                    position='bottom'
                    positionValue={150}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={1.0}
                    textStyle={{color:'white', fontFamily: 'FuturaStd-Light'}}
                />
                {this.state.searchHotel ? this.renderHotelTopView() : this.renderHomeTopView()}
                <ScrollView>
                    <View style={styles.scrollViewContentMain}>
                        {this.renderAutocomplete()}
                        <DateAndGuestPicker
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            adults={guests}
                            children={0}
                            guests={0}
                            infants={0}
                            gotoGuests={this.gotoGuests}
                            gotoSearch={this.gotoSearch}
                            onDatesSelect={this.onDatesSelect}
                            gotoSettings={this.gotoSettings}
                            showSearchButton={true}
                        />
                    </View>

                    <View style={styles.scrollViewContent}>

                        <Text style={styles.scrollViewTitles}>Discover</Text>

                        <View style={styles.viewDiscover}>

                            <TouchableOpacity onPress={() => this.setState({ searchHotel: true })}
                                              style={styles.imageViewDiscoverLeft}>
                                <Image style={{
                                    height: '100%',
                                    width: '100%'
                                }} resizeMode='stretch'
                                       source={require('../../../assets/home_images/hotels.png')}/>
                                {this.state.searchHotel ? this.renderHotelSelected() : this.renderHotelDeSelected()}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({
                                searchHotel: false,
                                cities: [],
                                search: '',
                                regionId: 0
                            })}
                                              style={styles.imageViewDiscoverLeft}>
                                <Image style={{
                                    height: '100%',
                                    width: '100%'
                                }} resizeMode='stretch'
                                       source={require('../../../assets/home_images/homes.png')}/>
                                {!this.state.searchHotel ? this.renderHomeSelected() : this.renderHomeDeSelected()}
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.scrollViewTitles}>Popular Destinations</Text>

                        <View style={styles.divider}/>

                        <View style={styles.viewPopularHotels}>

                            <TouchableOpacity onPress={() => this.handlePopularCities(52612, 'London , United Kingdom')}
                                              style={styles.subViewPopularHotelsLeft}>
                                <Image style={styles.imageViewPopularHotels} resizeMode='stretch'
                                       source={require('../../../assets/home_images/london.png')}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.handlePopularCities(18417, 'Madrid , Spain')}
                                              style={styles.subViewPopularHotelsRight}>
                                <Image style={styles.imageViewPopularHotels} resizeMode='stretch'
                                       source={require('../../../assets/home_images/Madrid.png')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewPopularHotels}>

                            <TouchableOpacity onPress={() => this.handlePopularCities(16471, 'Paris , France')}
                                              style={styles.subViewPopularHotelsLeft}>
                                <Image style={styles.imageViewPopularHotels} resizeMode='stretch'
                                       source={require('../../../assets/home_images/paris.png')}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.handlePopularCities(15375, 'Sydney , Australia')}
                                              style={styles.subViewPopularHotelsRight}>
                                <Image style={styles.imageViewPopularHotels} resizeMode='stretch'
                                       source={require('../../../assets/home_images/Sydney.png')}/>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={this.showToast}>
                            <View style={styles.searchButtonView}>
                                <Text style={styles.searchButtonText}>Show All</Text>
                            </View>
                        </TouchableOpacity>


                        <View style={styles.bottomView}>
                            <Image style={styles.bottomViewText} resizeMode='stretch'
                                   source={require('../../../assets/texthome.png')}/>
                            <TouchableOpacity onPress={this.showToast} style={styles.getStartedButtonView}>
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
                    <Text style={styles.fabText}>LOC/{this.state.language} {parseFloat(this.state.locPrice)
                        .toFixed(2)}</Text>
                </View>
            </View>
        );
    }
}

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

export default withNavigation(Explore);
