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

    spinnerValueChange(value){
        this.setState({language: value});
        if(value == "EUR"){
            AsyncStorage.setItem('currentCurrency', "EUR");
            AsyncStorage.setItem('currencyLocPrice', this.state.locRates.price_eur);
            this.setState({locPrice: this.state.locRates.price_eur})
        }
        else if(value == "USD"){
            AsyncStorage.setItem('currentCurrency', "USD");
            AsyncStorage.setItem('currencyLocPrice', this.state.locRates.price_usd);
            this.setState({locPrice: this.state.locRates.price_usd})
        }
        else if(value == "GBP"){
            getLocRateInUserSelectedCurrency('GBP')
            .then((json) => {
                AsyncStorage.setItem('currentCurrency', "GBP");
                AsyncStorage.setItem('currencyLocPrice', json[0].price_gbp);
                this.setState({locPrice: json[0].price_gbp});
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
                {this.renderAutocomplete()}
                <View style={styles.itemView}>
                <ScrollView>
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

                <View>

                    <View style={styles.homeCat}>
                         <View>
                                <Text style={styles.catTitle}>Discover</Text>
                        </View>

                        <View style={styles.catWrapper}>
                                <View style={styles.placeholderImageView}>
                                    <Image
                                        style={styles.placeholderImage}
                                        source={require('../../../assets/home_images/hotels.png')}
                                    />
                                </View>

                                <View style={styles.placeholderImageView}>
                                    <Image
                                        style={styles.placeholderImage}
                                        source={require('../../../assets/home_images/homes.png')}
                                    />
                                </View>


                        </View>
                    </View>

                    <View style={styles.homeCat}>
                         <View>
                                <Text style={styles.catTitle}>Popular Hotels</Text>
                        </View>

                        <View style={styles.catWrapper}>

                                <View style={styles.placeholderImageViewCard}>
                                    <Image source={require('../../../../src/assets/svg/heart.svg')} style={styles.arrowSvg}/>

                                    <Image
                                        style={styles.placeholderImage}
                                        source={require('../../../assets/home_images/london.png')}
                                    />

                                    <View>
                                        <Text style={styles.hotelLoc}>LONDOND .<Text  style={styles.hotelLoc}> ENGLAND </Text></Text>
                                    </View>
                                    <View>
                                       <Text style={styles.hotelName}>Green Life Beach Resort</Text>
                                    </View>
                                    <View>
                                       <Text style={styles.hotelRating}>Exellent 4.1/5 review </Text>
                                    </View>
                                    <View>
                                       <Text style={styles.hotelPrice}>$350 (LOC 1.2) per night</Text>
                                    </View>

                                </View>

                                <View style={styles.placeholderImageViewCard}>
                                    <Image
                                        style={styles.placeholderImage}
                                        source={require('../../../assets/home_images/italy.png')}
                                    />

                                    <View>
                                        <Text style={styles.hotelLoc}>FLORENCE .<Text  style={styles.hotelLoc}> ITALY </Text></Text>                                           
                                    </View>
                                    <View>
                                       <Text style={styles.hotelName}>Apolonia Resort</Text>                                           
                                    </View> 
                                    <View>
                                       <Text style={styles.hotelRating}>Exellent 4.1/5 review </Text>
                                    </View>
                                    <View>
                                       <Text style={styles.hotelPrice}>$350 (LOC 1.2) per night</Text>
                                    </View>

                                </View>
                        </View>
                        <View style={styles.catWrapper}>

                                <View style={styles.placeholderImageViewCard}>

                                    <Image source={require('../../../../src/assets/svg/heart.svg')} style={styles.arrowSvg}/>

                                    <Image
                                        style={styles.placeholderImage}
                                        source={require('../../../assets/home_images/rome.png')}
                                    />

                                     <View>
                                        <Text style={styles.hotelLoc}>ROME .<Text  style={styles.hotelLoc}> ITALY </Text></Text>                                           
                                    </View>
                                    <View>
                                       <Text style={styles.hotelName}>Paradise HOTEL</Text>                                           
                                    </View> 
                                    <View>
                                       <Text style={styles.hotelRating}>Exellent 4.1/5 review </Text>
                                    </View>
                                    <View>
                                       <Text style={styles.hotelPrice}>$350 (LOC 1.2) per night</Text>
                                    </View>

                                </View>

                                <View style={styles.placeholderImageViewCard}>
                                    <Image
                                        style={styles.placeholderImage}
                                        source={require('../../../assets/home_images/paris.png')}
                                    />

                                     <View>
                                        <Text style={styles.hotelLoc}>PARIS .<Text  style={styles.hotelLoc}> FRANCE </Text></Text>                                           
                                    </View>
                                    <View>
                                       <Text style={styles.hotelName}>Green Garden Aparthotel</Text>                                           
                                    </View> 
                                    <View>
                                       <Text style={styles.hotelRating}>Exellent 4.1/5 review </Text>
                                    </View>
                                    <View>
                                       <Text style={styles.hotelPrice}>$350 (LOC 1.2) per night</Text>
                                    </View>

                                </View>
                        </View>
                    </View>

                <TouchableOpacity>
                    <View style={styles.searchButtonView}>
                        <Text style={styles.searchButtonText}>Show All</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.homeCat}>
                         <View>
                                <Text style={styles.catTitle}>Top Destinations</Text>
                        </View>

                        <View style={styles.catWrapper}>
                                <View style={styles.placeholderImageView}>
                                    <Image
                                        style={{marginTop: 10, alignSelf: 'flex-start', flex: 1, width:'100%'}}
                                        source={require('../../../assets/home_images/top.png')}
                                    />
                                </View>
                        </View>


                        <View style= {styles.bottomWrapper}>
                           <Text style={styles.subtitle}>Host on Lockchain </Text>
                           <Text style={styles.title}>Easily list your home or hotel on
                            Lockchain and start earning money</Text>



                        </View>
                        <View style= {styles.bottomWrapper}>
                                <TouchableOpacity>
                                <View style={styles.getStartedButton}>
                                    <Text style={styles.searchButtonText}>Get Started</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>




                    <View style={styles.footerImageWrap}>
                                    {/*<Image
                                        style={styles.footerImage}
                                        source={require('../../../assets/vector.svg')}
                                    />*/}
                                    <Image source={require('../../../../src/assets/vector.png')} style={styles.footerImage}/>
                    </View>

                    <View style={styles.blank}></View>

                    </View>


                    </ScrollView>
                    </View>
                        <TouchableOpacity style={styles.fab} onPress={this.gotoSearch}>
                            <Text style={styles.fabText}>LOC/{this.state.language} {parseFloat(this.state.locPrice).toFixed(2)}</Text>
                        </TouchableOpacity>

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
