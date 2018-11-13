import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter, ImageBackground, Dimensions, WebView, Modal } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Image from 'react-native-remote-svg';

import { imgHost } from '../../../../config';
import SearchBar from '../../../molecules/SearchBar';
import DateAndGuestPicker from '../../../organisms/DateAndGuestPicker';
import HotelItemView from '../../../organisms/HotelItemView';

import { DotIndicator } from 'react-native-indicators';
import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import _ from 'lodash';
import styles from './styles';

const { width, height } = Dimensions.get('window')

class MapModeHotelsSearch extends Component {

    constructor(props) {
        super(props);
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
                        leftIcon="arrow-back"
                        onLeftPress={this.onCancel}
                        editable={this.state.editable}
                    />
                </View>
            </View>
        );
    }

    renderAutocomplete() {
        const nCities = this.state.cities.length;
        if (nCities > 0) {
            return (
                <ScrollView
                    style={{
                        marginLeft: 15,
                        marginRight: 15,
                        minHeight: 100,
                        zIndex: 99,
                    }}
                >
                    {
                        this.state.cities.map((result, i) => { //eslint-disable-line
                            return (//eslint-disable-line
                                <TouchableOpacity
                                    key={result.id}
                                    style={i == nCities - 1 ? [styles.autocompleteTextWrapper, {borderBottomWidth: 1, elevation: 1}] : styles.autocompleteTextWrapper}
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
                    disabled={!this.state.editable}
                    showSearchButton={this.state.isNewSearch}
                    showCancelButton={this.state.isNewSearch}
                    isFilterable={true}
                />
            </View>
        );
    }

    renderImageInCallout(hotel) {
        let thumbnailURL;
        if (!this.isFilterResult) {
            thumbnailURL = imgHost + hotel.thumbnail.url;
        }
        else {
            thumbnailURL = imgHost + hotel.hotelPhoto;
        }
        if(Platform.OS === 'ios') {
          return(
            <Image
                style={{ width: 120, height: 90}}
                source={{uri: thumbnailURL }}
            />
          )
        } else {
          return(
            <WebView
                style={{ width: 120, height: 90, marginLeft:-3.5, backgroundColor:'#fff'}}
                source={{html: "<img src=" + thumbnailURL + " width='120'/>" }}
                javaScriptEnabledAndroid={true}
            />
          )
        }
    }

    renderCallout(hotel) {
        const {
            currencySign, locRate
        } = this.props;
        return (
            <MapView.Callout tooltip={true}>
                <View style={ styles.map_item }>
                    <View style={{ width: 120, height: 90, backgroundColor:'#fff' }}>
                        { 
                            hotel.thumbnail !== null && this.renderImageInCallout(hotel)
                        }
                    </View>
                    <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                        {hotel.name}
                    </Text>
                    {
                        hotel.price == null || hotel.price == undefined ?
                            <Text style={styles.description}>
                                Unavailable
                            </Text>
                        : 
                            <Text style={styles.description}>
                                 {currencySign}{hotel.price.toFixed(2)}(LOC{parseFloat(hotel.price/locRate).toFixed(2)}) / Night
                            </Text>
                    }
                    <Text style={styles.ratingsMap}>
                        {
                            Array(hotel.stars !== null && hotel.stars).fill().map(i => <FontAwesome>{Icons.starO}</FontAwesome>)
                        }
                    </Text>
                </View>
            </MapView.Callout>
        );
    }

    renderMap = () => {
        console.log("renderMap", this.state.hotelsInfo);
        let baseLat = this.state.initialLat;
        let baseLon = this.state.initialLon;
        if (this.state.hotelsInfo.length >= 1) {
            if (this.isFilterResult) {
                baseLat = parseFloat(this.state.hotelsInfo[0].latitude);
                baseLon = parseFloat(this.state.hotelsInfo[0].longitude);
            }
            else {
                baseLat = parseFloat(this.state.hotelsInfo[0].lat);
                baseLon = parseFloat(this.state.hotelsInfo[0].lon);
            }
        }
        return (                            
            <MapView
                initialRegion={{
                    latitude: baseLat,
                    longitude: baseLon,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5
                }}
                style={styles.map}
            >
            {/* Marker */}
            {this.state.hotelsInfo.map(marker => (marker.lat != null || marker.latitude != null) && (
                <Marker
                    coordinate={{
                        latitude: this.isFilterResult? parseFloat(marker.latitude) : parseFloat(marker.lat),
                        longitude: this.isFilterResult? parseFloat(marker.longitude) : parseFloat(marker.lon)
                    }}
                    onCalloutPress={() => {this.onClickHotelOnMap(marker)}} //eslint-disable-line
                >
                    {this.renderCallout(marker)}
                    
                </Marker>
            ))}
            </MapView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {/* {this.renderHotelTopView()}
                {this.renderAutocomplete()}
                <View style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, width:'100%'}}>
                    {this.renderFilterBar()}
                    <View style={styles.containerHotels}>
                        {
                            this.state.isMAP == 1 && this.renderMap()
                        }
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
                        {
                            this.state.isMAP != -1 &&
                                <TouchableOpacity onPress={this.switchMode} style={styles.switchButton}>
                                    <FontAwesome style={styles.icon}>{this.state.isMAP == 0? Icons.mapMarker : Icons.listUl}</FontAwesome>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <ProgressDialog
                    visible={this.state.isLoadingHotelDetails}
                    title="Please Wait"
                    message="Loading..."
                    animationType="slide"
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"/> */}
            </View>
        );
    }
}

export default MapModeHotelsSearch;