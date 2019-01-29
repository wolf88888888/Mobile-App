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

    static propTypes = {
        detail: PropTypes.string.isRequired,
        transpotation: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
    };

    static defaultProps = {
        detail: '',
        transpotation: '',
        location: '',
        description: '',
        lat: 0,
        lon: 0,
        radius: 200,
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
                    <Text style={styles.detail}>{this.props.detail}</Text>

                    <Text style={styles.subtitle}>Transpotation</Text>
                    <Text style={styles.subdetail}>{this.props.transpotation}</Text>
                </View>
                <View style={{flexDirection:'column'}}>
                    <View style={styles.info}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.location}>{this.props.location}</Text>
                            <Text style={styles.description}>{this.props.description}</Text>
                        </View>
                    </View>
                    <MapView
                        style={styles.map}
                        region={{
                          latitude: this.props.lat,
                          longitude: this.props.lon,
                          latitudeDelta: 0.005,
                          longitudeDelta: 0.005,
                        }}>
                        <MapView.Circle
                                center={{latitude: this.props.lat, longitude: this.props.lon}}
                                radius = { this.props.radius }
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
