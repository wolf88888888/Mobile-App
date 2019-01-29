import React, { Component } from 'react';
import {
        Text,
        View,
      } from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import CardView from 'react-native-cardview';
import styles from './styles';


class LocationView extends Component {
    static propTypes = {
        detail: PropTypes.string.isRequired,
        transpotation: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    };

    static defaultProps = {
        detail: '',
        transpotation: '',
        location: '',
        description: '',
        lat: 0,
        lon: 0,
        radius: 200,
        name: '',
    };

    calloutClick(){
        window.alert('Under development');
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { titleStyle } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.descriptionView}>
                    <Text style={[styles.title, titleStyle]}>Location</Text>
                    {this.props.detail != '' && (<Text style={styles.detail}>{this.props.detail}</Text>)}
                    {this.props.transpotation != '' && (<Text style={styles.subtitle}>Transpotation</Text>)}
                    {this.props.transpotation != '' && (<Text style={styles.subdetail}>{this.props.transpotation}</Text>)}
                </View>
                
                <CardView style={styles.topView}
                    cardElevation={0.75}
                    cardMaxElevation={.75}
                    cornerRadius={0}>
                    <View style={{flexDirection:'column'}}>
                        <View style={styles.info}>
                            <View style={styles.infoContainer}>
                                {/* <Text style={styles.location}>{this.props.location}</Text> */}
                                <Text style={styles.location}>{this.props.name}</Text>
                                {/* <Text style={styles.description}>{this.props.description}</Text> */}
                            </View>
                        </View>
                        <MapView
                            zoomEnabled={false}
                            pitchEnabled={false}
                            scrollEnabled={false}
                            rotateEnabled={false}
                            style={styles.map}
                            region={{
                              latitude: this.props.lat,
                              longitude: this.props.lon,
                              latitudeDelta: 0.005,
                              longitudeDelta: 0.005,
                            }}
                            debug={false}>
                            <MapView.Marker
                                coordinate={{latitude: this.props.lat, longitude: this.props.lon}}
                                // title={this.props.name}
                                // description={this.props.hotelPrice}
                            >
                            </MapView.Marker>
                            <MapView.Circle
                                    center={{latitude: this.props.lat, longitude: this.props.lon}}
                                    radius = { this.props.radius }
                                    strokeWidth = { 1 }
                                    strokeColor = { 'rgba(162,197,191,0.5)' }
                                    fillColor = { 'rgba(162,197,191,0.5)' }
                            />
                        </MapView>
                    </View>
                </CardView>
            </View>
        );
    }
}

export default LocationView;
