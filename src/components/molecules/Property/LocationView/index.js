import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View
      } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
import MapView from 'react-native-maps';
import styles from './styles';

class LocationView extends Component {

    static get propTypes() {
        return {
          // title: PropTypes.string.isRequired,
          // subtitle: PropTypes.string.isRequired,
          // type: PropTypes.string.isRequired,
          // count: PropTypes.number.isRequired
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { title, subtitle, count } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.descriptionView}>
                    <Text style={styles.title}>Location</Text>
                    <Text style={styles.detail}>Jesse s home is located in Oia,South Aegean,Greece.The views from the terrace, the sun, being calm</Text>

                    <Text style={styles.subtitle}>Transpotation</Text>
                    <Text style={styles.subdetail}>Geting around the island is possible either by bus transport, taxi or by rending a car or on ATV.</Text>
                </View>
                <View style={{flexDirection:'column'}}>
                    <View style={styles.info}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.location}>Florence, Italy</Text>
                            <Text style={styles.description}>The exact location will be provided after booking.</Text>
                        </View>
                    </View>
                    <MapView
                        style={styles.map}
                        region={{
                          latitude: 43.769562,
                          longitude: 11.255814,
                          latitudeDelta: 0.005,
                          longitudeDelta: 0.005,
                        }}>
                        <MapView.Circle
                                center={{latitude: 43.769562, longitude: 11.255814}}
                                radius = { 200 }
                                strokeWidth = { 1 }
                                strokeColor = { 'rgba(162,197,191,0.5)' }
                                fillColor = { 'rgba(162,197,191,0.5)' }
                        />
                    </MapView>
                </View>
            </View>
        );
    }
}

export default LocationView;
