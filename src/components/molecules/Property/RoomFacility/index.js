import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes
} from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import FacilityView from '../../../atoms/FacilityView'

import styles from './styles';

const RNPropTypes = PropTypes || React.PropTypes;
class RoomFacility extends Component {

  static propTypes = {
      facility0: RNPropTypes.number,
      facility1: RNPropTypes.number,
      facility2: RNPropTypes.number,
      facility3: RNPropTypes.number,
      facility4: RNPropTypes.number,
      more: PropTypes.number,
  };

  static defaultProps = {
      facility0: null,
      facility1: null,
      facility2: null,
      facility3: null,
      facility4: null,
      more: 0
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
        const { facility0, facility1, facility2, facility3, facility4, more } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Room Faility</Text>
                <View style={styles.facilities}>
                    <FacilityView image={facility0}/>
                    <FacilityView image={facility1}/>
                    <FacilityView image={facility2}/>
                    <FacilityView image={facility3}/>
                    <FacilityView image={facility4}/>
                    <FacilityView more={more} isMore={true} onPress={this.onFacilityMore}/>
                </View>
            </View>
        );
    }
}

export default RoomFacility;
