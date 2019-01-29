import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
} from 'react-native'

import styles from './styles';

class RoomInfoBox extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { property_type, guests, size, bathroom, bedrooms } = this.props;

        return (
            <View style={styles.container}>
            {
                property_type != null && (
                    <View style={styles.propertyContainer}>
                        <Image
                            style={styles.property}
                            source={require('../../../assets/room/home.png')}
                        />
                        <Text style={styles.info} numberOfLines={1} ellipsizeMode ={'tail'}>{property_type}</Text>
                    </View>
                )
            }
            {
                guests != null && guests != 0 &&(
                    <View style={styles.propertyContainer}>
                        <Image
                            style={styles.property}
                            source={require('../../../assets/room/guests.png')}
                        />
                        <Text style={styles.info} numberOfLines={1} ellipsizeMode ={'tail'}>Guests x{guests}</Text>
                    </View>
                )
            }
            {
                size != null && size != 0 && (
                    <View style={styles.propertyContainer}>
                        <Image
                            style={styles.property}
                            source={require('../../../assets/room/size.png')}
                        />
                        <Text style={styles.info} numberOfLines={1} ellipsizeMode ={'tail'}>{size} m²</Text>
                    </View>
                )
            }
            {
                bathroom != null && bathroom != 0 && (
                    <View style={styles.propertyContainer}>
                        <Image
                            style={styles.property}
                            source={require('../../../assets/room/bathroom.png')}
                        />
                        <Text style={styles.info} numberOfLines={1} ellipsizeMode ={'tail'}>{bathroom} {bathroom === 1 ? 'Bathroom' : 'Bathrooms'}</Text>
                    </View>
                )
            }
            {
                bedrooms != null && bedrooms != 0 && (
                    <View style={styles.propertyContainer}>
                        <Image
                            style={styles.property}
                            source={require('../../../assets/room/bedroom.png')}
                        />
                        <Text style={styles.info} numberOfLines={1} ellipsizeMode ={'tail'}>{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</Text>
                    </View>
                )
            }
            </View>
        );
    }
}

export default RoomInfoBox;
