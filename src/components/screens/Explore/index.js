import { withNavigation } from 'react-navigation';
import React, { Component } from 'react';
import moment from 'moment';
import SplashScreen from 'react-native-smart-splash-screen';
import { ScrollView, Text, View, TouchableOpacity, Image, Picker } from 'react-native';
import PropTypes from 'prop-types';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import SearchBar from '../../molecules/SearchBar';
import SmallPropertyTile from '../../molecules/SmallPropertyTile';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { getRegionsBySearchParameter, getTopHomes, getLocRate, getLocRateInUserSelectedCurrency } from '../../../utils/requester';
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
        this.gotoGuests = this.gotoGuests.bind(this);
        this.gotoSettings = this.gotoSettings.bind(this);
        this.gotoSearch = this.gotoSearch.bind(this);
        this.renderAutocomplete = this.renderAutocomplete.bind(this);
        this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
        this.onDatesSelect = this.onDatesSelect.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.state = {
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
            childrenBool: false,
            locPrice : 0,
            language: "EUR",
            locRates: [],
            currencyIcon: Icons.euro 
        };
    }

    componentWillMount() {
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
            regionId: this.state.regionId,
            currency: this.state.language,
            checkOutDateFormated: this.state.checkOutDateFormated,
            checkInDateFormated: this.state.checkInDateFormated,
            roomsDummyData: encodeURI(JSON.stringify(this.state.roomsDummyData)),
            locRate : this.state.locPrice,
            currencyIcon: this.state.currencyIcon
        });
    }

    spinnerValueChange(value){
        this.setState({language: value});
        if(value == "EUR"){
            this.setState({locPrice: this.state.locRates.price_eur, currencyIcon: Icons.euro})
        }
        else if(value == "USD"){
            this.setState({locPrice: this.state.locRates.price_usd, currencyIcon: Icons.usd})
        }
        else if(value == "GBP"){
            getLocRateInUserSelectedCurrency('GBP')
            .then((json) => {
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
            adults, children, infants, search, checkInDate, checkOutDate, guests, topHomes, onDatesSelect 
        } = this.state;
        return (
            <View style={styles.container}>

                <View style={styles.SearchAndPickerwarp}>

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
                    {/* <MapView
                        style={styles.map}
                        region={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.005,
                          longitudeDelta: 0.005,
                    }}>
                    <MapView.Circle
                        center={{latitude: 37.78825, longitude: -122.4324}}
                        radius = { 5000 }
                        strokeWidth = { 1 }
                        strokeColor = { 'rgba(162,197,191,0.5)' }
                        fillColor = { 'rgba(162,197,191,0.5)' }
                        />
                    </MapView> */}
                    <DateAndGuestPicker
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        adults={guests}
                        children={0}//eslint-disable-line
                        guests={0}
                        infants={0}
                        gotoGuests={this.gotoGuests}
                        gotoSearch={this.gotoSearch}
                        onDatesSelect={this.onDatesSelect}
                        gotoSettings={this.gotoSettings}
                        showSearchButton={true}//eslint-disable-line
                    />
                    <TouchableOpacity onPress={this.gotoSearch} style={styles.fab}>
                        <Text style={styles.fabText}>LOC/{this.state.language} {parseFloat(this.state.locPrice).toFixed(2)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default withNavigation(Explore);
