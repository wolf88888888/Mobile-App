import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes
} from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import FacilityView from '../../atoms/FacilityView'

import styles from './styles';

const RNViewPropTypes = ViewPropTypes || View.propTypes;
const RNPropTypes = PropTypes || React.PropTypes;
class FacilitiesView extends Component {

    static propTypes = {

    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.onFacilityMore = this.onFacilityMore.bind(this);
        this.state = {
            more: 23
        };
    }


    onFacilityMore() {
        this.props.onFacilityMore();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Room Facility</Text>
                <View style={styles.facilities}>
                    <FacilityView image={require('../../../assets/Facilities/Homes/BathTub.png')}/>
                    <FacilityView image={require('../../../assets/Facilities/Homes/TV.png')}/>
                    <FacilityView image={require('../../../assets/Facilities/Homes/Fireplace.png')}/>
                    <FacilityView image={require('../../../assets/Facilities/Homes/Pool.png')}/>
                    <FacilityView image={require('../../../assets/Facilities/Homes/Air_Conditioning.png')}/>
                    <FacilityView more={this.state.more} isMore={true} onPress={this.onFacilityMore}/>
                </View>
            </View>
        );
    }
}

export default FacilitiesView;