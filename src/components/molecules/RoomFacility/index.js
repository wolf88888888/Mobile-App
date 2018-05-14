import React, { Component } from 'react';
import {
        Text,
        TouchableOpacity,
        View
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import FacilityView from '../../atoms/FacilityView'

import styles from './styles';

class RoomFacility extends Component {

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
                <Text style={styles.title}>Room Faility</Text>
                <View style={styles.facilities}>
                    <FacilityView image={require('../../../assets/Facilities/Homes/TV.svg')}/>
                    <FacilityView image={require('../../../assets/Facilities/Homes/Fireplace.svg')}/>
                    <FacilityView image={require('../../../assets/Facilities/Homes/Air_Conditioning.svg')}/>
                    <FacilityView image={require('../../../assets/Facilities/Homes/Pool.svg')}/>
                    <FacilityView image={require('../../../assets/Facilities/Homes/BathTub.svg')}/>
                    <FacilityView more='23' onPress={this.onFacilityMore}/>
                </View>
            </View>
        );
    }
}

export default RoomFacility;
