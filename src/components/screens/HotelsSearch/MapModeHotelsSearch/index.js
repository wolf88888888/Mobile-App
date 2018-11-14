import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter, ImageBackground, Dimensions, WebView, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import _ from 'lodash';
import styles from './styles';

const { width, height } = Dimensions.get('window')

class MapModeHotelsSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currency: this.props.currency, 
            currencySign: props.currencySign,
            locRate: props.locRate,
            isFilterResult: props.isFilterResult, 
            initialLat: props.latitude,
            initialLon: props.longitude,
            hotelsInfo: []
        }
    }

    componentDidUpdate(prevProps) {
        // if (this.props.currency != prevProps.currency || this.props.locRate != prevProps.locRate) {
        let newState  = {};
        let isChanged = false;

        if (this.props.currency != prevProps.currency) {
            newState = {...newState, currency: this.props.currency, currencySign: this.props.currencySign};
            isChanged = true;
        }

        if (this.props.locRate != prevProps.locRate) {
            newState = {...newState, locRate: this.props.locRate};
            isChanged = true;
        }

        if (this.props.isFilterResult != prevProps.isFilterResult) {
            newState = {...newState, isFilterResult: this.props.isFilterResult};
            isChanged = true;
        }

        if (this.props.initialLat != prevProps.initialLat || this.props.initialLon != prevProps.initialLon) {
            newState = {...newState, initialLat: this.props.initialLat, initialLon: this.props.initialLon};
            isChanged = true;
        }

        if (this.props.hotelsInfo != prevProps.hotelsInfo) {
            newState = {...newState, hotelsInfo: this.props.hotelsInfo};
            isChanged = true;
        }

        if (isChanged) {
            this.setState(newState);
        }
    }
    
    renderImageInCallout = (hotel) => {
        let thumbnailURL;
        if (!this.state.isFilterResult) {
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

    renderCallout = (hotel) => {
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
                                 {this.state.currencySign}{hotel.price.toFixed(2)}(LOC{parseFloat(hotel.price/this.state.locRate).toFixed(2)}) / Night
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


    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={{
                        latitude: this.state.initialLat,
                        longitude: this.state.initialLon,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}
                    style={styles.map}
                >
                {
                    this.state.hotelsInfo.map(marker => (marker.lat != null || marker.latitude != null) && (
                        <Marker
                            coordinate={{
                                latitude: this.state.isFilterResult? parseFloat(marker.latitude) : parseFloat(marker.lat),
                                longitude: this.state.isFilterResult? parseFloat(marker.longitude) : parseFloat(marker.lon)
                            }}
                            onCalloutPress={() => {this.props.onClickHotelOnMap(marker)}} //eslint-disable-line
                        >
                            {this.renderCallout(marker)}
                            
                        </Marker>
                    ))
                }
                </MapView>
            </View>
        );
    }
}

export default MapModeHotelsSearch;