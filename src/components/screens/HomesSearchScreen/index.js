import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter, ImageBackground, Dimensions, WebView, Modal } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';

import { imgHost } from '../../../config';
import SearchBar from '../../molecules/SearchBar';
import DateAndGuestPicker from '../../organisms/DateAndGuestPicker';
import HotelItemView from '../../organisms/HotelItemView';
import requester from '../../../initDependencies';

import UUIDGenerator from 'react-native-uuid-generator';
import { UltimateListView } from '../../../../library/UltimateListView';
import { DotIndicator } from 'react-native-indicators';
import ProgressDialog from '../../atoms/SimpleDialogs/ProgressDialog';
import _ from 'lodash';
import moment from 'moment';
import * as currencyActions from '../../../redux/action/Currency'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
            countriesLoaded: false,
            countries: [],
            countryId: 0,
            countryName: '',
            home: '',

            currency: props.currency,
            currencySign: props.currencySign,
            locRate: _.isString(props.locRate) ? parseFloat(props.locRate) : props.locRate,

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
            propertyTypes: [],

            editable: false,
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
        if (this.props.currency != prevProps.currency || this.props.locRate != prevProps.locRate) {
            this.setState({currency: this.props.currency, currencySign:this.props.currencySign, locRate: this.props.locRate});
        }

        if (this.props.countries != prevProps.countries) {
            this.setCountriesInfo();
        }
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
            countriesLoaded: true,
            countryId: countryArr[0].value.id,
            countryName: countryArr[0].label
        });
    }

    componentWillMount() {
        this.setCountriesInfo();

        let searchTerms = [];
        searchTerms.push(`countryId=${this.state.countryId}`);
        searchTerms.push(`startDate=${this.state.checkInDateFormated}`);
        searchTerms.push(`endDate=${this.state.checkOutDateFormated}`);
        searchTerms.push(`guests=${this.state.guests}`);
        searchTerms.push(`priceMin=${this.state.priceRange[0]}`);
        searchTerms.push(`priceMax=${this.state.priceRange[1]}`);
        
        // searchTerms['countryId'] = this.state.countryId;
        // searchTerms['startDate'] = this.state.checkInDateFormated;
        // searchTerms['endDate'] = this.state.checkOutDateFormated;
        // searchTerms['guests'] = this.state.guests;
        // searchTerms['priceMin'] = this.state.priceRange[0];
        // searchTerms['priceMax'] = this.state.priceRange[1];
        console.log("getListingsByFilter --- data", searchTerms);

        requester.getListingsByFilter(searchTerms).then(res => {
            console.log("getListingsByFilter --- res", res);
            res.body.then(data => {
                console.log("getListingsByFilter --- data", data);
                // this.setState({
                //     listings: data.filteredListings.content,
                //     totalItems: data.filteredListings.totalElements,
                //     loading: false,
                //     cities: data.cities,
                //     propertyTypes: data.types
                // });
            });
        });
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    switchMode = () => {
        if (this.state.isMAP == 0) {
            this.setState({
                isMAP: 1,
            });
        }
        else {
            this.setState({
                isMAP: 0,
            });
        }
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

    onDatesSelect = ({ startDate, endDate }) => {
        if (this.state.checkInDate === startDate && this.state.checkOutDate === endDate) {
            return;
        }
        
        const year = (new Date()).getFullYear();
        this.setState({
            checkInDate: startDate,
            checkOutDate: endDate,
            checkInDateFormated: (moment(startDate, 'ddd, DD MMM')
                .format('DD/MM/')
                .toString()) + year,
            checkOutDateFormated: (moment(endDate, 'ddd, DD MMM')
                .format('DD/MM/')
                .toString()) + year,
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
        
    }

    renderItem = (item) => {
        return (
            <HotelItemView
                item = {item}
                currencySign = {this.state.currencySign}
                locRate = {this.state.locRate}
                gotoHotelDetailsPage = {this.gotoHotelDetailsPage}
                daysDifference = {this.state.daysDifference}
                isDoneSocket = {this.state.allElements}
            />
        )
    }

    renderPaginationFetchingView = () => (
        <View style={{width, height:height - 160, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width:50, height:50}} source={require('../../../assets/loader.gif')}/>
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
        console.log("this.state.countries", this.state.countries);
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
                            disabled={!this.state.editable}
                            items={this.state.countries}
                            placeholder={{
                                label: 'Choose a location',
                                value: 0
                            }}
                            onValueChange={(value) => {
                                this.setState({
                                    countryId: value.id,
                                    countryName: value.name,
                                    home: value
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
                    adults={this.state.adults}
                    children={this.state.children}
                    infants={this.state.infants}
                    guests={this.state.guests}
                    gotoGuests={this.gotoGuests}
                    gotoSearch={this.gotoSearch}
                    gotoCancel={this.gotoCancel}
                    onDatesSelect={this.onDatesSelect}
                    gotoSettings={this.gotoSettings}
                    disabled={!this.state.editable}
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

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        locRate: state.currency.locRate,
        countries: state.country.countries
    };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(currencyActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomesSearchScreen);

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