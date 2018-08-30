import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import styles from './styles';

class MapFullScreen extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => { }
        }
    }

    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }

    componentWillMount() {
    }

    onClose() {
        this.props.navigation.goBack();
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 0.1, flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 18, paddingBottom: 10
                }}
                >
                    <TouchableOpacity onPress={() => this.onClose()}>
                        <Image style={styles.btn_backImage} source={require('../../../../src/assets/icons/icon-back-black.png')} />
                    </TouchableOpacity>
                    <View style={{
                        marginLeft: 12, height: 28, flexDirection: 'row', alignItems: 'center'
                    }}
                    >
                        <Text style={{ fontFamily: 'FuturaStd-Medium', fontSize: 14 }}>Location</Text>
                    </View>
                </View>
                <View style={{ flex: 0.75 }}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: params.lat,
                            longitude: params.lng,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005
                        }}
                        debug={false}
                    >
                        <MapView.Marker
                            coordinate={{ latitude: params.lat, longitude: params.lng }}
                            title={this.props.hotelName}
                            description={this.props.hotelPrice}
                        >
                        </MapView.Marker>
                        <MapView.Circle
                            center={{ latitude: params.lat, longitude: params.lng }}
                            radius={100}
                            strokeWidth={1}
                            strokeColor={'rgba(162,197,191,0.5)'}
                            fillColor={'rgba(162,197,191,0.5)'}
                        />
                    </MapView>
                </View>
                <View style={{
                    flex: 0.15, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 18, paddingBottom: 10
                }}
                >
                    <Text style={{ fontFamily: 'FuturaStd-Medium', fontSize: 16 }}>{params.name}</Text>
                    <Text style={{ fontFamily: 'FuturaStd-Light', fontSize: 14 }}>{params.address}</Text>
                </View>
            </View>
        );
    }
}

export default MapFullScreen;
