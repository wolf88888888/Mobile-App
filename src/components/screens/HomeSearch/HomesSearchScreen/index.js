import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text,  TouchableOpacity, View, Dimensions } from 'react-native';

import Image from 'react-native-remote-svg';
import { DotIndicator } from 'react-native-indicators';
import _ from 'lodash';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast';

import DateAndGuestPicker from '../../../organisms/DateAndGuestPicker';
import HomeItemView from '../../../organisms/HomeItemView';
import requester from '../../../../initDependencies';
import { UltimateListView } from '../../../../../library/UltimateListView';
import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import { imgHost } from '../../../../config';

import styles from './styles';

const { width, height } = Dimensions.get('window')

class HomesSearchScreen extends Component {
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
            isLoadingDetails: false,

            countriesLoaded: false,
            countries: [],
            countryId: 0,
            countryName: '',
            home: '',
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
            priceRange: [1, 5000],
            cities: [], 
            citiesToggled: '',
            propertyTypes: [],
            propertyTypesToggled: '',

            totalPages: 0,

            isNewSearch: false,
        };
        const { params } = this.props.navigation.state;//eslint-disable-line

        if (params) {
            this.state.home = params.home;
            this.state.countryId = params.countryId;
            
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
            this.state.daysDifference = params.daysDifference;
        }

        this.saveState();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.countries != prevProps.countries) {
            this.setCountriesInfo();
        }
    }

    componentWillMount() {
        this.setCountriesInfo();
        this.getHomes();
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
            countriesLoaded: true
        });
    }

    getHomes() {
        if (this.listView != undefined && this.listView != null) {
            this.listView.initListView();
        }
        let searchTerms = [];
        searchTerms.push(`countryId=${this.state.countryId}`);
        searchTerms.push(`startDate=${this.state.checkInDateFormated}`);
        searchTerms.push(`endDate=${this.state.checkOutDateFormated}`);
        searchTerms.push(`guests=${this.state.guests}`);
        searchTerms.push(`priceMin=${this.state.priceRange[0]}`);
        searchTerms.push(`priceMax=${this.state.priceRange[1]}`);

        if (this.state.citiesToggled != '') {
            searchTerms.push(`cities=${this.state.citiesToggled}`);
        }
        if (this.state.propertyTypesToggled != '') {
            searchTerms.push(`propertyTypes=${this.state.propertyTypesToggled}`);
        }
        searchTerms.push(`page=0`);
        console.log("searchTerms", searchTerms);

        requester.getListingsByFilter(searchTerms).then(res => {
            res.body.then(data => {
                console.log("requester.getListingsByFilter", data);

                if (this.isFilterResult) {
                    this.setState({
                        // listings: data.filteredListings.content,
                        totalPages: data.filteredListings.totalPages
                    }, () => {
                        this.listView.onFirstLoad(data.filteredListings.content, false);
                    });
                }
                else {
                    this.setState({
                        // listings: data.filteredListings.content,
                        totalPages: data.filteredListings.totalPages,
                        cities: data.cities,
                        propertyTypes: data.types
                    }, () => {
                        this.listView.onFirstLoad(data.filteredListings.content, false);
                    });
                }
            });
        });
    }
    
    onFetch = async (page = 1, startFetch, abortFetch) => {
        console.log("onFetch", page);
        try {
            if (page < this.state.totalPages) {
                let searchTerms = [];
                searchTerms.push(`countryId=${this.state.countryId}`);
                searchTerms.push(`startDate=${this.state.checkInDateFormated}`);
                searchTerms.push(`endDate=${this.state.checkOutDateFormated}`);
                searchTerms.push(`guests=${this.state.guests}`);
                searchTerms.push(`priceMin=${this.state.priceRange[0]}`);
                searchTerms.push(`priceMax=${this.state.priceRange[1]}`);
                if (citiesToggled != '') {
                    searchTerms.push(`cities=${this.state.citiesToggled}`);
                }
                if (propertyTypesToggled != '') {
                    searchTerms.push(`propertyTypes=${this.state.propertyTypesToggled}`);
                }
                searchTerms.push(`page=${page - 1}`);
                console.log("onFetch - searchTerms", searchTerms);

                requester.getListingsByFilter(searchTerms).then(res => {
                    console.log("onFetch - requester.getListingsByFilter", res);
                    res.body.then(data => {
                        startFetch(data.filteredListings.content, data.filteredListings.content.length, false);
                    });
                })
            }
            else {
                startFetch([], 0, false);
                abortFetch();
            } 
        } catch (err) {
            startFetch([], 0, false);
            abortFetch(); 
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    saveState = () => {
        this.setState({
            isNewSearch: false,
        });

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
        this.getHomes();
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
    
    
    onDatesSelect = ({ startDate, endDate, startMoment, endMoment }) => {
        const start = moment(startDate, 'ddd, DD MMM');
        const end = moment(endDate, 'ddd, DD MMM');
        this.setState({
            daysDifference: moment.duration(end.diff(start)).asDays(),
            checkInDate: startDate,
            checkOutDate: endDate,
            checkInDateFormated: startMoment.format('DD/MM/YYYY'),
            checkOutDateFormated: endMoment.format('DD/MM/YYYY'),
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

    gotoSettings = () => {
        if (this.state.cities == null || this.state.cities.length == 0) {
            return;
        }
        this.props.navigation.navigate("HomeFilterScreen", {
            cities: this.state.cities,
            properties: this.state.propertyTypes,
            priceRange: this.state.priceRange,
            updateFilter: this.updateFilter,
        });
    }

    updateFilter = (data) => {
        console.log("updateFilter", data);
        
        this.isFilterResult = true;
        
        if (this.listView != undefined && this.listView != null) {
            this.listView.initListView();
        }
        
        this.setState({
            cities: data.cities,
            properties: data.properties,
            priceRange: data.sliderValue,
        }, () => {
            // this.applyFilters();
            this.state.citiesToggled = '';
            for (var i = 0; i < data.cities.length; i ++) {
                if (data.cities[i].isChecked) {
                    if (i != 0) {
                        this.state.citiesToggled += ',';
                    }
                    this.state.citiesToggled += data.cities[i].text;
                }
            }
            this.state.propertyTypesToggled = '';
            for (var i = 0; i < data.properties.length; i ++) {
                if (data.properties[i].isChecked) {
                    if (i != 0) {
                        this.state.propertyTypesToggled += ',';
                    }
                    this.state.propertyTypesToggled += data.properties[i].text;
                }
            }
            this.getHomes();
        });
    }

    calculateCheckInOuts(listing) {
        let checkInStart = listing.checkinStart && Number(listing.checkinStart.substring(0, 2));
        let checkInEnd = listing.checkinEnd && Number(listing.checkinEnd.substring(0, 2));
        checkInEnd = checkInEnd && checkInStart < checkInEnd ? checkInEnd : 24;
      
        let checkOutStart = listing.checkoutStart && Number(listing.checkoutStart.substring(0, 2));
        let checkOutEnd = listing.checkoutEnd && Number(listing.checkoutEnd.substring(0, 2));
        checkOutStart = checkOutStart && checkOutStart < checkOutEnd ? checkOutStart : 0;
      
        let checks = {
          checkInStart,
          checkInEnd,
          checkOutStart,
          checkOutEnd
        };
      
        return checks;
    }

    gotoHomeDetailPage = async (home) => {
        console.log (" home ---", home);
        this.setState({isLoadingDetails: true});
        try {
            const resListing = await requester.getListing(home.id);
            console.log("requester.getListing",resListing);
            if (resListing.success === false) {
                this.setState({isLoadingDetails: false}, () => {
                    this.refs.toast.show('Sorry, Cannot get home details.', 1500);
                });
                return;
            }
            const data = await resListing.body;
            const checks = this.calculateCheckInOuts(data);
        
            console.log("resListing", data, checks);

            const DAY_INTERVAL = 365;

            const searchTermMap = [
                `listing=${home.id}`,
                `startDate=${this.state.checkInDateFormated}`,
                `endDate=${this.state.checkOutDateFormated}`,
                `page=${0}`,
                `toCode=${this.props.currency}`,
                `size=${DAY_INTERVAL}`];
        
            console.log("searchTermMap", searchTermMap);

            const resCalendar =  await requester.getCalendarByListingIdAndDateRange(searchTermMap);
            console.log("resCalendar", resCalendar);
            const dataCalendar = await resCalendar.body;
            console.log("dataCalendar", dataCalendar);
            let calendar = dataCalendar.content;
            const resRoomDetails = await requester.getHomeBookingDetails(home.id);
            const roomDetails = await resRoomDetails.body;

            let nights = this.state.daysDifference;
            
            console.log("123123", data, checks, calendar, roomDetails, nights);

            const homePhotos = [];
            for (let i = 0; i < data.pictures.length; i++) {
                homePhotos.push({ uri: imgHost + data.pictures[i].original });
            }

            // const defaultPrice = home.defaultDailyPrice
            // const price = home.prices && this.props.currency === home.currency_code ? parseFloat(item.defaultDailyPrice, 10).toFixed() : parseFloat(home.prices[this.props.currency], 10).toFixed(2);

            this.setState({isLoadingDetails: false});
            
            this.props.navigation.navigate('HomeDetailsScreen', {
                homeData: data,
                homePhotos: homePhotos,
                checks: checks,
                calendar: calendar,
                roomDetails: roomDetails,
                startDate: this.state.checkInDateFormated,
                endDate: this.state.checkOutDateFormated,
                checkInDate: this.state.checkInDate,
                checkOutDate: this.state.checkOutDate,
                nights: nights,
                guests:this.state.guests,
                // rateExchange: rateExchange,
                currencyCode: home.currency_code
            });
        } catch (e) {
            this.setState({isLoadingDetails: false}, () => {
                this.refs.toast.show('Sorry, Cannot get home details.', 1500);
            });
        }
    }

    renderItem = (item) => {
        return (
            <HomeItemView
                item = {item}
                gotoHomeDetailPage = {this.gotoHomeDetailPage}
                daysDifference = {this.state.daysDifference}
            />
        )
    }

    renderPaginationFetchingView = () => (
        <View style={{width, height:height - 160, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width:50, height:50}} source={require('../../../../assets/loader.gif')}/>
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

    renderHomeTopView() {
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
                            items={this.state.countries}
                            placeholder={{
                                label: 'Choose a location',
                                value: 0
                            }}
                            onValueChange={(value) => {
                                if (this.state.countryId === value.id) {
                                    return;
                                }
                                this.setState({
                                    countryId: value.id,
                                    countryName: value.name,
                                    home: value,
                                    isNewSearch: true,
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

    renderFilterBar() {
        return (
            <View style={this.state.isNewSearch ?  {height:190, width:'100%'} : {height:70, width:'100%'}}>
                <DateAndGuestPicker
                    checkInDate={this.state.checkInDate}
                    checkOutDate={this.state.checkOutDate}
                    checkInDateFormated={this.state.checkInDateFormated}
                    checkOutDateFormated={this.state.checkOutDateFormated}
                    adults={this.state.adults}
                    children={this.state.children}
                    infants={this.state.infants}
                    guests={this.state.guests}
                    gotoGuests={this.gotoGuests}
                    gotoSearch={this.gotoSearch}
                    gotoCancel={this.gotoCancel}
                    onDatesSelect={this.onDatesSelect}
                    gotoSettings={this.gotoSettings}
                    showSearchButton={this.state.isNewSearch}
                    showCancelButton={this.state.isNewSearch}
                    isFilterable={true}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                { this.renderHomeTopView() }
                <View style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, width:'100%'}}>
                    {this.renderFilterBar()}
                    <View style={styles.containerHotels}>
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
                    </View>
                </View>
                <ProgressDialog
                    visible={this.state.isLoadingDetails}
                    title="Please Wait"
                    message="Loading..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"/>
                    
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#DA7B61' }}
                    position='bottom'
                    positionValue={150}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={1.0}
                    textStyle={{ color: 'white', fontFamily: 'FuturaStd-Light' }}
                />
            </View>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        countries: state.country.countries
    };
}

export default connect(mapStateToProps, null)(HomesSearchScreen);

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