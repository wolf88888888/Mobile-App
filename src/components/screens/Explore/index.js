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


class Explore extends Component {
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
        propertyType: PropTypes.oneOf('hotels', 'homes')
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
        onSearchChange: () => {}
    }

    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        let startDate = moment().add(1, 'day');
        let endDate = moment().add(2, 'day');

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
            checkInDate: startDate.format('ddd, DD MMM').toString(),
            checkOutDate:  endDate.format('ddd, DD MMM').toString(),
            guests: 2,
            adults: 2,
            children: 1,
            infants: 0,
            topHomes: [],
            listings : [],
        };
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
        this.setState({
            search : value,
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
      this.props.navigation.navigate('PropertyScreen', {searchedCity: this.state.search, searchedCityId: 72, checkInDate : this.state.checkInDate, checkOutDate : this.state.checkOutDate, guests: this.state.guests});
    }

    handleAutocompleteSelect(id, name) {
        return () => {
            this.props.onAutocompleteSelect(id, name);
        };
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

  
    render() {
        const {
            adults, children, infants, search, checkInDate, checkOutDate, guests, topHomes, onDatesSelect
        } = this.state;

        var data = 'region=52612&currency=USD&startDate=27/05/2018&endDate=28/05/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D';

        return (
            <View style={styles.container}>

                <View style={styles.searchAreaView}>
                    <SearchBar
                        autoCorrect={false}
                        onChangeText={this.onSearchHandler}
                        placeholder="Discover your next experience"
                        placeholderTextColor="#bdbdbd"
                        leftIcon="search"
                    />
                </View>
                {!this.props.autocomplete.length && this.renderAutocomplete()}
                <DateAndGuestPicker
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        adults={adults}
                        children={children}
                        {/*eslint-disable-line*/}
                        guests = {guests + children}
                        infants={infants}
                        gotoGuests={this.gotoGuests}
                        gotoSearch={this.gotoSearch}
                        onDatesSelect={this.onDatesSelect}
                        gotoSettings={this.gotoSettings}
                        showSearchButton= {true}
                    />
                <TouchableOpacity onPress={this.gotoSearch} style={styles.fab}>
                    <Text style={styles.fabText}>LOC/EUR 0.56</Text>
                </TouchableOpacity>
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
            console.log(response);
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


export default withNavigation(Explore);
