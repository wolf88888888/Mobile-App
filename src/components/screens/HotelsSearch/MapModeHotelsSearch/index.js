import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity, View, Platform, NativeModules, DeviceEventEmitter, ImageBackground, Dimensions, WebView, Modal, Image } from 'react-native';
import MapView, { Marker, Overlay } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import _ from 'lodash';
import styles from './styles';
import { imgHost } from '../../../../config';
import red_marker from '../../../../assets/red_marker.png';
import blue_marker from '../../../../assets/blue_marker.png';
import FastImage from 'react-native-fast-image'
const { width, height } = Dimensions.get('window')

class MapModeHotelsSearch extends Component {
    _markers = [];
    constructor(props) {
        super(props);
        this.state = {
            currency: this.props.currency, 
            currencySign: props.currencySign,
            locRate: props.locRate,
            isFilterResult: props.isFilterResult, 
            initialLat: props.initialLat,
            initialLon: props.initialLon,
            hotelsInfo: [],
            selectedMarkerIndex: -1
        }
    }
    
	// shouldComponentUpdate(nextProps) {
	// 	return false;
	// }

    componentDidUpdate(prevProps) {
        // if (this.props.currency != prevProps.currency || this.props.locRate != prevProps.locRate) {
        let newState  = {};
        let isChanged = false;

        if (this.props.currency !== prevProps.currency) {
            newState = {...newState, currency: this.props.currency, currencySign: this.props.currencySign};
            isChanged = true;
        }

        if (this.props.locRate !== prevProps.locRate) {
            newState = {...newState, locRate: this.props.locRate};
            isChanged = true;
        }

        if (this.props.isFilterResult !== prevProps.isFilterResult) {
            newState = {...newState, isFilterResult: this.props.isFilterResult};
            isChanged = true;
        }

        if (this.props.initialLat !== prevProps.initialLat || this.props.initialLon !== prevProps.initialLon) {
            //newState = {...newState, initialLat: this.props.initialLat, initialLon: this.props.initialLon};
            //console.log("123123123 change")
            this.state.initialLat = this.props.initialLat;
            this.state.initialLon = this.props.initialLon;
            if (this._map != null) {
                this._map.animateToRegion({
                    latitude: this.state.initialLat,
                    longitude: this.state.initialLon,
                    latitudeDelta: 0.25,
                    longitudeDelta: 0.25
                }, 0);
            }
            //isChanged = true;
        }

        if (this.props.hotelsInfo !== prevProps.hotelsInfo) {
            newState = {...newState, hotelsInfo: this.props.hotelsInfo};
            isChanged = true;
        }

        if (isChanged) {
            console.log("--------------------", newState);
            this.setState(newState);
        }
    }

    initMapView = () => {
        this.state.selectedMarkerIndex = -1;
    }

    refresh = (hotelsInfo) => {
        console.log("refresh--------------------");
        this.setState({hotelsInfo: hotelsInfo});
    }
    
    renderImageInCallout = (hotel) => {
        const that = this;
        let thumbnailURL;
        console.log("renderImageInCallout", hotel);
        if (hotel.lat === null || hotel.lat === undefined) {
            thumbnailURL = imgHost + hotel.hotelPhoto;
        }
        else {
            thumbnailURL = imgHost + hotel.thumbnail.url;
        }
        console.log("----------------- renderImageInCallout", thumbnailURL);

        return(
            <FastImage
                style={{ width: 120, height: 90}}
                source={{
                    uri: thumbnailURL,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
                // onLoad={e => console.log(e.nativeEvent.width, e.nativeEvent.height)}
                // onError={e => console.log("errr", e)}
                onLoadEnd={e => {console.log("onLoadEnd"); that.selected_mark.redraw();}}
            />
        );
        // if(Platform.OS === 'ios') {
        //     return(
        //         // <FastImage
        //         //     style={{ width: 120, height: 90}}
        //         //     source={{
        //         //         uri: thumbnailURL,
        //         //         priority: FastImage.priority.high,
        //         //     }}
        //         //     resizeMode={FastImage.resizeMode.cover}
        //         // />
        //         <Image
        //             style={{ width: 120, height: 90}}
        //             source={{uri: thumbnailURL}}
        //             resizeMode={"cover"}
        //         />
        //     )
        // } else {
        //   return(
        //     <WebView
        //         style={{ width: 120, height: 90, marginLeft:-3.5, backgroundColor:'#fff'}}
        //         source={{html: "<img src=" + thumbnailURL + " width='120'/>" }}
        //         javaScriptEnabledAndroid={true}
        //     />
        //   )
        // }
    }

    // renderCallout = (hotel) => {
    //     console.log("----------------- renderCallout", hotel);
    //     return (
    //         <MapView.Callout tooltip={false}>
    //             <View style={ styles.map_item }>
    //                 <View style={{ width: 120, height: 90, backgroundColor:'#fff' }}>
    //                     { 
    //                         hotel.thumbnail !== null && this.renderImageInCallout(hotel)
    //                     }
    //                 </View>
    //                 <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
    //                     {hotel.name}
    //                 </Text>
    //                 {
    //                     hotel.price == null || hotel.price == undefined ?
    //                         <Text style={styles.description}>
    //                             Unavailable
    //                         </Text>
    //                     : 
    //                         <Text style={styles.description}>
    //                              {this.state.currencySign}{hotel.price.toFixed(2)}(LOC{parseFloat(hotel.price/this.state.locRate).toFixed(2)}) / Night
    //                         </Text>
    //                 }
    //                 <Text style={styles.ratingsMap}>
    //                     {
    //                         Array(hotel.stars !== null && hotel.stars).fill().map(i => <FontAwesome>{Icons.starO}</FontAwesome>)
    //                     }
    //                 </Text>
    //             </View>
    //         </MapView.Callout>
    //     );
    // }

    onPressMarker = (e, index) => {
        console.log("onPressMarker", index);
        if (this.state.selectedMarkerIndex === index) {
            return;
        }
        this.setState({selectedMarkerIndex: index});
    }

    onPressMap = (hotel) => {
        console.log("1123123123123", hotel);
        // this.setState({selectedMarkerIndex: -1});
    }

    render() {
        console.log("map view", this.state);
        let hotel = null;
        if (this.state.selectedMarkerIndex != -1 && this.state.selectedMarkerIndex < this.state.hotelsInfo.length) {
            hotel = this.state.hotelsInfo[this.state.selectedMarkerIndex];
        }

        return (
            <View style={styles.container}>
                <MapView
                    ref={(ref) => this._map = ref}
                    initialRegion={{
                        latitude: this.state.initialLat,
                        longitude: this.state.initialLon,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2
                    }}
                    style={styles.map}
                >
                {
                    this.state.hotelsInfo.map((marker, i) => (marker.lat != null || marker.latitude != null) && (
                        <Marker
                            image={this.state.selectedMarkerIndex === i ? blue_marker : red_marker}
                            style={this.state.selectedMarkerIndex === i ? {zIndex: 1} : null}
                            // image={red_marker}
                            key={i}
                            ref={(ref) => this._markers[i] = ref}
                            coordinate={{
                                latitude: marker.lat === null || marker.lat === undefined? parseFloat(marker.latitude) : parseFloat(marker.lat),
                                longitude: marker.lon === null || marker.lon === undefined? parseFloat(marker.longitude) : parseFloat(marker.lon)
                            }}
                            onPress={(e) => this.onPressMarker(e, i)}
                            // onCalloutPress={() => {this.props.onClickHotelOnMap(marker)}} //eslint-disable-line
                        >
                            {/* {this.state.selectedMarkerIndex === i && this.renderCallout(marker)} */}
                        </Marker>
                    ))
                }
                {
                    hotel !== null && 
                        (<Marker
                            // image={blue_marker}
                            style={{zIndex: 1}}
                            key={"selected_mark"}
                            ref={(ref) => this.selected_mark = ref}
                            coordinate={{
                                latitude: hotel.lat === null || hotel.lat === undefined? parseFloat(hotel.latitude) : parseFloat(hotel.lat),
                                longitude: hotel.lon === null || hotel.lon === undefined? parseFloat(hotel.longitude) : parseFloat(hotel.lon)
                            }}
                            tracksViewChanges = {true}
                            onPress={(e) => this.props.gotoHotelDetailsPage(hotel)}
                            // onPress={(e) => this.onPressMap(hotel)}
                        >   
                            <View 
                                style={ styles.map_item }>
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
                    </Marker>)
                }
                    
                </MapView>
            </View>
        );
    }
}

export default MapModeHotelsSearch;