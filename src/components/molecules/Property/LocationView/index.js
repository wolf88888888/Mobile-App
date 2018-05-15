import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View
      } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';
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
        this.onFacilityMore = this.onFacilityMore.bind(this);
    }

    componentDidMount() {
    }


    onFacilityMore() {
        this.props.onFacilityMore();
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
                <Image source={require('../../../../assets/temple/location.jpg')} style={styles.map} />
            </View>
        );
    }
}

export default LocationView;
