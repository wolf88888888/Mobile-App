import React, { Component } from 'react';
import {
        TouchableOpacity,
        View,
      } from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import DetailView from '../../../atoms/DetailView';

import styles from './styles';

class PropertyDetailsView extends Component {

    static propTypes = {
        guests: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        bathroom: PropTypes.number.isRequired,
        bedroom: PropTypes.number.isRequired,
    }

    static defaultProps = {
        guests: 0,
        size: 0,
        bathroom: 0,
        bedroom: 0,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const ratingHeight = 12;
        const ratingSize = 8;
        return (
            <View style={styles.container}>
                <DetailView image={require('../../../../assets/home.svg')} detail={'Entire Home'}/>
                <DetailView image={require('../../../../assets/guests.svg')} detail={'Guest ×' + this.props.guests}/>
                <DetailView image={require('../../../../assets/size.svg')} detail={this.props.size + ' m'} supText={'2'}/>
                <DetailView image={require('../../../../assets/bathroom.svg')} detail={this.props.bathroom + ' Bathroom'}/>
                <DetailView image={require('../../../../assets/bedroom.svg')} detail={this.props.bedroom + ' Bedroom'}/>
            </View>
        );
    }
}

export default PropertyDetailsView;
